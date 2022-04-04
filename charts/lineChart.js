let emptyLabelsArray = Array(50).fill('', 0, 49)
let emptyDataArray = Array(50).fill(5000000000, 0, 49)
const lineInitialData = {
  labels: emptyLabelsArray,
  datasets: [{
    label: 'Used memory(%)',
    data: emptyDataArray,
    fill: true,
    borderColor: 'rgb(75, 192, 192)',
    tension: 0.1
  }]
};
const configLine = {
  type: 'line',
  data: lineInitialData,
  options: {
    scales: {
      y: {
        min: 0,
        max: 100,
      }
    }
  }
};
const prepareDataForLineChart = ( data ) => {
  let dataForLineChart;
  if ( data.length != 0 ) {
    dataForLineChart = data.map(( val, key ) => {
      return (val['usedCapacityPresent']).toFixed(2);
    });
  }
  if ( data.length == 0 ) {
    while ( dataForLineChart.length < 50 ) {
      dataForLineChart.push(0)
    }
  }
  else if ( data.length > 0 && data.length < 50 ) {
    while ( dataForLineChart.length < 50 ) {
      dataForLineChart.unshift(dataForLineChart[0])
    }
  }
  else {
    dataForLineChart = data.slice(data.length - 50, data.length)
    dataForLineChart = dataForLineChart.map(( val, key ) => {
      return (val['usedCapacityPresent']).toFixed(2);
    });
  }
  return dataForLineChart;
}

chrome.runtime.onMessage.addListener(async function ( message, sender, sendResponse ) {
  if ( message === 'data_updated' ) {
    await chrome.storage.sync.get(['ram'], function ( result ) {
      const data = result['ram']
      const preparedData = prepareDataForLineChart(data)
      if ( lineChart ) {
        lineChart.data.datasets.forEach(( dataset ) => {
          dataset.data = preparedData;
        });
        lineChart.update();
      }
    })
    sendResponse({status: 'ok'});
  }
});