let data = [];



setInterval(async () => {
  a = await chrome.system.memory.getInfo();
  let newData = [a.capacity - a.availableCapacity, a.availableCapacity];
  data.push(newData);
  //updateSystemInfo('ram', newData)

  color = 'blue';
  console.log(a.availableCapacity / a.capacity);
  const usedCapacityPresent = (a.capacity - a.availableCapacity) / a.capacity
  if ( usedCapacityPresent <= 0.3 ) {
    color = 'blue'
  } else if (usedCapacityPresent > 0.3 && usedCapacityPresent < 0.65) {
    color = 'green'
  } else {
    color = 'red'
  }



  updateDoughnutChart(doughnutChart, data[data.length - 1], color)

  dataForLineChart = prepareDataForLineChart(data);
  //console.log('dataForLineChart');
  //console.log(dataForLineChart);
  updateLineChart(lineChart, dataForLineChart)
}, 300)

const labels = [
  'Used Memory',
  'Free Memory'
];

const doughnutInitialData = {
  labels: labels,
  datasets: [{
    label: 'RAM capacity',
    backgroundColor: [
      'transparent',
      'transparent',
    ],
    borderColor: 'black',
    data: [0, 1],
  }]
};

const lineInitialData = {
  labels: ['','','','','','','','','',''],
  datasets: [{
    label: 'Used memory',
    data: [65, 59, 80, 81, 56, 55, 40],
    fill: true,
    borderColor: 'rgb(75, 192, 192)',
    tension: 0.1
  }]
};

const doughnutConfig = {
  type: 'doughnut',
  data: doughnutInitialData,
  options: {
  }
};

const configLine = {
  type: 'line',
  data: lineInitialData,
  options:{
    scales: {
      y: {
        min: 0,
        max: 16000000000,
      }
    }
  }
};

const doughnutChart = new Chart(
  document.getElementById('doughnutChart'),
  doughnutConfig
);

const lineChart = new Chart(
  document.getElementById('lineChart'),
  configLine
);

function updateDoughnutChart(doughnutChart, data, color) {
  doughnutChart.data.datasets.forEach((dataset) => {
    dataset.data = data;
    dataset.backgroundColor = [color, 'transparent']
  });
  doughnutChart.update();
}

function updateLineChart(lineChart, data) {
  lineChart.data.datasets.forEach((dataset) => {
    dataset.data = data;
  });
  lineChart.update();
}


const prepareDataForLineChart = (data) => {
  if ( data.length == 0 ) {
    while ( dataForLineChart.length < 10) {
      dataForLineChart.push(0)
    }
  } else if (data.length > 0 && data.length < 10) {
    dataForLineChart = data.map((val, key) => {
      return val[0];
    });
    while ( dataForLineChart.length < 10) {
      dataForLineChart.unshift(dataForLineChart[0])
    }
  } else {
    dataForLineChart = data.slice(data.length - 10, data.length)
    dataForLineChart = dataForLineChart.map((val, key) => {
      return val[0];
    });
  }


  return dataForLineChart;
}