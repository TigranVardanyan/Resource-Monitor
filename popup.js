let data = [];
let alarm_log = [];
let warningThreshold = document.getElementById('warningThreshold').value;
let redThreshold = document.getElementById('redThreshold').value;

setInterval(async () => {
  a = await chrome.system.memory.getInfo();
  let newData = [a.capacity - a.availableCapacity, a.availableCapacity];
  data.push(newData);
  color = 'blue';
  const usedCapacityPresent = (a.capacity - a.availableCapacity) / a.capacity * 100
  if ( +usedCapacityPresent <= +warningThreshold ) {
    color = 'blue'
  } else if (+usedCapacityPresent > +warningThreshold && +usedCapacityPresent < +redThreshold) {
    color = 'green'
  } else {
    const alarm = {
      description: usedCapacityPresent + '%',
      date: (new Date()).toLocaleTimeString()
    }
    alarm_log
    color = 'red'
  }

  updateDoughnutChart(doughnutChart, data[data.length - 1], color)
  dataForLineChart = prepareDataForLineChart(data);
  updateLineChart(lineChart, dataForLineChart)
}, 1000)

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



document.getElementById('thresholdSetup').addEventListener('click', () => {
  warningThresholdNode = document.getElementById('warningThreshold');
  redThresholdNode = document.getElementById('redThreshold');
  if(warningThresholdNode.value > 100 || warningThresholdNode.value < 0) {
    warningThresholdNode.value = 30
  }
  if(redThresholdNode.value > 100 || redThresholdNode.value < 0) {
    redThresholdNode.value = 65
  }
  if(+warningThresholdNode.value >= +redThresholdNode.value) {
    if ( redThresholdNode.value != 100 ) {
      redThresholdNode.value = +warningThresholdNode.value + 1
      redThreshold = redThresholdNode.value
      warningThreshold = warningThresholdNode.value
    } else {
      warningThresholdNode.value = +redThresholdNode.value - 1
      warningThreshold = warningThresholdNode.value
      redThreshold = redThresholdNode.value
    }
  } else {
    redThreshold = redThresholdNode.value
    warningThreshold = warningThresholdNode.value
  }
})

document.getElementById('extendedVersion').addEventListener('click', () => {
  chrome.tabs.create({ url: "chrome-extension://" + chrome.runtime.id + "/index.html" });
})


//setInterval(() => {
//  console.log('popup - ' + Math.random());
//}, 2500)
