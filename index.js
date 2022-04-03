let storedData = []
const alert_body = document.getElementById('alert_body')
const export_csv = document.getElementById('export_csv')
const warningThreshold = document.getElementById('warningThreshold');
const redThreshold = document.getElementById('redThreshold');



setInterval(async () => {
  await chrome.storage.sync.get(['ram'], function ( result ) {
    storedData = result['ram']
  });
  for ( const data of storedData ) {
    let table_body =
      `<tr>
        <th scope="row">3</th>
        <td>80%</td>
        <td>22:11</td>
      </tr>`
  }
  let table_body = '';
  const filteredStoredData = filterStoredData(storedData)
  filteredStoredData.forEach(( value, index ) => {
    table_body +=
      `<tr>
        <th scope="row">${index + 1}</th>
        <td>${value.usedCapacityPresent.toFixed(2)}%</td>
        <td>${value.date}</td>
      </tr>`
  })
  alert_body.innerHTML = table_body
}, 1000)
export_csv.addEventListener('click', () => {
  filteredData = filterStoredData(storedData);
  const csv = generateCSV(filteredData);
  download_file(csv)
})

function filterStoredData( data ) {
  filteredData = data.filter(( value ) => {
    return value.alertLevel >= 1
  })
  return filteredData
}

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
//document.getElementById('thresholdSetup').addEventListener('click', () => {
//  warningThresholdNode = document.getElementById('warningThreshold');
//  redThresholdNode = document.getElementById('redThreshold');
//  if(warningThresholdNode.value > 100 || warningThresholdNode.value < 0) {
//    warningThresholdNode.value = 30
//  }
//  if(redThresholdNode.value > 100 || redThresholdNode.value < 0) {
//    redThresholdNode.value = 65
//  }
//  if(+warningThresholdNode.value >= +redThresholdNode.value) {
//    if ( redThresholdNode.value != 100 ) {
//      redThresholdNode.value = +warningThresholdNode.value + 1
//      redThreshold = redThresholdNode.value
//      warningThreshold = warningThresholdNode.value
//    } else {
//      warningThresholdNode.value = +redThresholdNode.value - 1
//      warningThreshold = warningThresholdNode.value
//      redThreshold = redThresholdNode.value
//    }
//  } else {
//    redThreshold = redThresholdNode.value
//    warningThreshold = warningThresholdNode.value
//  }
//})
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