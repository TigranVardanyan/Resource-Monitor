let alerts = []
const alert_body = document.getElementById('alert_body')
const export_csv = document.getElementById('export_csv')
const warningThreshold = document.getElementById('warningThreshold');
const redThreshold = document.getElementById('redThreshold');



setInterval(async () => {
  await chrome.storage.sync.get(['alerts'], function ( result ) {
    alerts = result['alerts']
  });
  let table_body = '';

  if(alerts.length != 0) {
    alerts.forEach(( value, index ) => {
      table_body +=
        `<tr>
        <th scope="row">${index + 1}</th>
        <td>${value.usedCapacityPresent.toFixed(2)}%</td>
        <td>${value.date}</td>
      </tr>`
    })
    alert_body.innerHTML = table_body
  }
}, 1000)
export_csv.addEventListener('click', () => {
  filteredData = filterStoredData(alerts);
  const csv = generateCSV(filteredData);
  download_file(csv)
})

function generateCSV( objArray ) {
  if ( objArray.length != 0 ) {
    const array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
    let str = `${Object.keys(array[0]).map(value => `"${value}"`).join(",")}` + '\r\n';
    return array.reduce(( str, next ) => {
      str += `${Object.values(next).map(value => `"${value}"`).join(",")}` + '\r\n';
      return str;
    }, str);
  }
  else {
    return '';
  }
}

function download_file( content ) {
  let b = new Blob([content], { type: 'text/csv' })
  var url = URL.createObjectURL(b);
  chrome.downloads.download({
    url: url // The object URL can be used as download URL
  });
}

//todo refactor
document.getElementById('threshold_form').addEventListener('submit', (e) => {

console.log('submit');
e.preventDefault()
  if(+warningThreshold.value > 100 || +warningThreshold.value < 0) {
    warningThreshold.value = 30
  }
  if(redThreshold.value > 100 || redThreshold.value < 0) {
    redThreshold.value = 65
  }
  if(+warningThreshold.value >= +redThreshold.value) {
    if ( +redThreshold.value != 100 ) {
      redThreshold.value = +warningThreshold.value + 1
    } else {
      warningThreshold.value = +redThreshold.value - 1
    }
  }

  const optionsObj = {
    'options': {
      'warning': +warningThreshold.value,
      'red': +redThreshold.value
    }
  }

  chrome.storage.sync.set(optionsObj, () => {
    let node = `
    <div id="success_message" class="alert alert-success" role="alert" style="position: fixed;bottom: 50px;right: 50px; width: 300px; text-align: center;">
      Threshold successfully updated
    </div>`;
    document.getElementById('alert-section').innerHTML += node
    setTimeout(() => {
      document.getElementById('success_message').remove()
    },2000)
  });

})
const doughnutChart = new Chart(
  document.getElementById('doughnutChart'),
  doughnutConfig
);
updateDoughnutChart(doughnutChart)
const lineChart = new Chart(
  document.getElementById('lineChart'),
  configLine
);
updateLineChart(lineChart)