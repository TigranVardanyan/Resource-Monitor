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
const doughnutConfig = {
  type: 'doughnut',
  data: doughnutInitialData,
  options: {}
};

function updateDoughnutChart( doughnutChart ) {
  setInterval(async () => {
    chrome.runtime.sendMessage({ type: "getData" }, ( result ) => {
      console.log('updateDoughnutChart');
      const data = result['result']
      const last = data[data.length - 1]
      const dataForDoughnut = [last['availableCapacity'], last['capacity']]
      doughnutChart.data.datasets.forEach(( dataset ) => {
        dataset.data = dataForDoughnut;
        dataset.backgroundColor = [last['alertColor'], 'transparent']
      });
      doughnutChart.update();
    })
  }, 1000)
}