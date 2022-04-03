const doughnutChart = new Chart(
  document.getElementById('doughnutChart'),
  doughnutConfig
);
updateDoughnutChart(doughnutChart)
document.getElementById('extendedVersion').addEventListener('click', () => {
  chrome.tabs.create({ url: "chrome-extension://" + chrome.runtime.id + "/index.html" });
})


