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



const lineChart = new Chart(
  document.getElementById('lineChart'),
  configLine
);



function updateLineChart(lineChart, data) {
  lineChart.data.datasets.forEach((dataset) => {
    dataset.data = data;
  });
  lineChart.update();
}

chrome.runtime.sendMessage({ type: "getData" }, (result) => {
  updateDoughnutChart(doughnutChart, result['result'])
})