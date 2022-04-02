let storedData = []
const alert_body = document.getElementById('alert_body')
const export_csv = document.getElementById('export_csv')
setInterval(async () => {
  await chrome.storage.sync.get(['ram'], function ( result ) {
    storedData = result['ram']
  });
  for ( const data of storedData ) {
    let table_body =
      `<tr>
        <th scope="row">3</th>
        <td>80%</td>
        <td>22:11</td>
      </tr>`
  }
  let table_body = '';

  const filteredStoredData = filterStoredData(storedData)

  filteredStoredData.forEach((value, index) => {
    table_body +=
      `<tr>
        <th scope="row">${index + 1}</th>
        <td>${value.usedCapacityPresent.toFixed(2)}%</td>
        <td>${value.date}</td>
      </tr>`
  })

  alert_body.innerHTML = table_body

}, 1000)

export_csv.addEventListener('click', () => {
  filteredData = filterStoredData(storedData);
  const csv = generateCSV(filteredData);

  console.log('csv', csv);
})


function filterStoredData(data) {
  filteredData = data.filter((value) => {
    return value.alertLevel >= 1
  })
  return filteredData
}


