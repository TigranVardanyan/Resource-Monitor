const labels = [
  'Used Memory(%)',
  'Free Memory(%)'
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

chrome.runtime.onMessage.addListener(async function ( message, sender, sendResponse ) {
  if ( message === 'data_updated' ) {
    await chrome.storage.sync.get(['ram'], function ( result ) {
      const data = result['ram']
      const last = data[data.length - 1]
      const usedCapacity = ((last['capacity'] - last['availableCapacity']) / last['capacity'] * 100).toFixed(1);
      const availableCapacity = (last['availableCapacity'] / last['capacity'] * 100).toFixed(1);
      const dataForDoughnut = [usedCapacity, availableCapacity]
      if ( doughnutChart ) {
        doughnutChart.data.datasets.forEach(( dataset ) => {
          dataset.data = dataForDoughnut;
          dataset.backgroundColor = [last['alertColor'], 'transparent']
        });
        doughnutChart.update();
      }
    })
    sendResponse({status: 'ok'});
  }
});