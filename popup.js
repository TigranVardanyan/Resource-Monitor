let data = [];



setInterval(async () => {
  a = await chrome.system.memory.getInfo();
  let newData = [a.availableCapacity, a.capacity - a.availableCapacity];
  data.push(newData);
  updateSystemInfo('ram', newData)
  updateDoughnutChart(myChart, data[data.length - 1])
}, 5000)

const labels = [
  'Used Capacity',
  'Free Capacity'
];

const data = {
  labels: labels,
  datasets: [{
    label: 'RAM capacity',
    backgroundColor: [
      'rgb(255,0,0)',
      'rgb(0,255,0)',
    ],
    borderColor: 'transparent',
    data: [16, 7],
  }]
};

const doughnutConfig = {
  type: 'doughnut',
  data: data,
  options: {}
};

const configLine = {
  type: 'line',
  data: data,
};

const doughnutChart = new Chart(
  document.getElementById('doughnutChart'),
  doughnutConfig
);

const lineChart = new Chart(
  document.getElementById('lineChart'),
  configLine
);

function updateDoughnutChart(doughnutChart, data) {
  chart.data.datasets.forEach((dataset) => {
    dataset.data = data;
  });
  chart.update();
}

function updateDoughnutChart(lineChart, data) {
  chart.data.datasets.forEach((dataset) => {
    dataset.data = data;
  });
  chart.update();
}


