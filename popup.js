setInterval(async () => {
  a = await chrome.system.memory.getInfo();
  addData(myChart, [a.availableCapacity, a.capacity - a.availableCapacity])
}, 1000)

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

const config = {
  type: 'doughnut',
  data: data,
  options: {}
};

const myChart = new Chart(
  document.getElementById('resourceChart'),
  config
);

function addData(chart, data) {
  chart.data.datasets.forEach((dataset) => {
    dataset.data = data;
  });
  chart.update();
}