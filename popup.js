let data = [];


const doughnutChart = new Chart(
  document.getElementById('doughnutChart'),
  doughnutConfig
);

setInterval(async () => {
  //a = await chrome.system.memory.getInfo();
  //let newData = [a.capacity - a.availableCapacity, a.availableCapacity];
  //data.push(newData);
  //color = 'blue';
  //const usedCapacityPresent = (a.capacity - a.availableCapacity) / a.capacity * 100
  //if ( +usedCapacityPresent <= +warningThreshold ) {
  //  color = '#0d6efd'
  //} else if (+usedCapacityPresent > +warningThreshold && +usedCapacityPresent < +redThreshold) {
  //  color = '#ffecb5'
  //} else {
  //  const alarm = {
  //    description: usedCapacityPresent + '%',
  //    date: (new Date()).toLocaleTimeString()
  //  }
  //  alarm_log
  //  color = '#f8d7da'
  //}
  //
  //
  //
  //
  //updateDoughnutChart(doughnutChart, data[data.length - 1], color)
  //dataForLineChart = prepareDataForLineChart(data);
  //updateLineChart(lineChart, dataForLineChart)


  let a = null;
  chrome.runtime.sendMessage({ type: "getData" }, (result) => {
    updateDoughnutChart(doughnutChart, result['result'])
  })

  console.log('AAA', a);
}, 1000)


let a = chrome.extension.getBackgroundPage()

console.log('a', a);



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





document.getElementById('extendedVersion').addEventListener('click', () => {
  chrome.tabs.create({ url: "chrome-extension://" + chrome.runtime.id + "/index.html" });
})


