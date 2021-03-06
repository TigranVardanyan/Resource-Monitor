let alerts = []
const alert_body = document.getElementById('alert_body')
const export_csv = document.getElementById('export_csv')
const warningThreshold = document.getElementById('warningThreshold');
const redThreshold = document.getElementById('redThreshold');
const doughnutChartBox = document.getElementById('doughnutChartBox');
const lineChartBox = document.getElementById('lineChartBox');
const radioButtons = document.querySelectorAll('input[name="chart_toggle_group"]');

chrome.runtime.onMessage.addListener(async function ( message, sender, sendResponse ) {
  if ( message === 'alerts_updated' ) {
    await chrome.storage.sync.get(['alerts'], function ( result ) {
      alerts = result['alerts']
      let table_body = '';
      if ( alerts && alerts.length != 0 ) {

        alerts.reverse().forEach(( value, index ) => {
          table_body += `
            <tr>
              <th scope="row">${alerts.length - index}</th>
              <td>${value.usedCapacityPresent.toFixed(2)}%</td>
              <td>${value.date}</td>
            </tr>`
        })
        alert_body.innerHTML = table_body
      }
    });
    sendResponse({status: 'ok'});
  }
});

//handle Export CSV file button click
export_csv.addEventListener('click', () => {
  const csv = generateCSV(alerts);
  download_file(csv)
})

function generateCSV( objArray ) {
  if ( objArray.length != 0 ) {
    // csv logic
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
  }, () => {
    let node = `
    <div id="success_message" class="alert alert-primary" role="alert" style="position: fixed;bottom: 50px;right: 50px; width: 300px; text-align: center;">
      CSV file successfully created
    </div>`;
    document.getElementById('alert-section').innerHTML += node
    setTimeout(() => {
      document.getElementById('success_message').remove()
    }, 2000)
  });
}

document.getElementById('threshold_form').addEventListener('submit', ( e ) => {
  e.preventDefault()
  if ( +warningThreshold.value > 100 || +warningThreshold.value < 0 ) {
    warningThreshold.value = 30
  }
  if ( redThreshold.value > 100 || redThreshold.value < 0 ) {
    redThreshold.value = 65
  }
  if ( +warningThreshold.value >= +redThreshold.value ) {
    if ( +redThreshold.value != 100 ) {
      redThreshold.value = +warningThreshold.value + 1
    }
    else {
      warningThreshold.value = +redThreshold.value - 1
    }
  }

  const optionsObj = {
    'options': {
      'warning': +warningThreshold.value,
      'red': +redThreshold.value
    }
  }

  //on options success update show message
  chrome.storage.sync.set(optionsObj, () => {
    let node = `
    <div id="success_message" class="alert alert-success" role="alert" style="position: fixed;bottom: 50px;right: 50px; width: 300px; text-align: center;">
      Threshold successfully updated
    </div>`;
    document.getElementById('alert-section').innerHTML += node
    setTimeout(() => {
      document.getElementById('success_message').remove()
    }, 2000)
  });
})



function handleRadioClick() {
  if (document.getElementById('chart_toggle_doughnut').checked) {
    doughnutChartBox.style.display = 'flex';
    lineChartBox.style.display = 'none';
  } else {
    doughnutChartBox.style.display = 'none';
    lineChartBox.style.display = 'flex';
  }
}

handleRadioClick()

radioButtons.forEach(radio => {
  radio.addEventListener('click', handleRadioClick);
});

const doughnutChart = new Chart(
  document.getElementById('doughnutChart'),
  doughnutConfig
);
const lineChart = new Chart(
  document.getElementById('lineChart'),
  configLine
);