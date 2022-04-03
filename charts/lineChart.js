let emptyLabelsArray = Array(50).fill('', 0, 49)
let emptyDataArray = Array(50).fill(5000000000, 0, 49)
const lineInitialData = {
  labels: emptyLabelsArray,
  datasets: [{
    label: 'Used memory',
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
        max: 1,
      }
    }
  }
};
const prepareDataForLineChart = ( data ) => {
  let dataForLineChart;
  if ( data.length != 0 ) {
    dataForLineChart = data.map(( val, key ) => {
      return val['availableCapacity'];
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
      return val['availableCapacity'];
    });
  }
  return dataForLineChart;
}

function updateLineChart( lineChart ) {
  setInterval(async () => {
    chrome.runtime.sendMessage({ type: "getData" }, ( result ) => {
      //console.log('updateLineChart');
      const data = result['result']
      const preparedData = prepareDataForLineChart(data)
      //console.log('preparedData', preparedData);
      lineChart.data.datasets.forEach(( dataset ) => {
        dataset.data = preparedData;
      });
      lineChart.options.scales.y = {
        min: 0,
        max: data[0]['capacity'],
      }
      lineChart.update();
    })
  }, 3000)
}