const doughnutChart = new Chart(
  document.getElementById('doughnutChart'),
  doughnutConfig
);

//redirect to tab with extended version
document.getElementById('extendedVersion').addEventListener('click', () => {
  chrome.tabs.create({ url: "chrome-extension://" + chrome.runtime.id + "/index.html" });
})


