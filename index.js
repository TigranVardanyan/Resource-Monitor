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
  download_file(csv)
})


function filterStoredData(data) {
  filteredData = data.filter((value) => {
    return value.alertLevel >= 1
  })
  return filteredData
}

function generateCSV(objArray) {
  if ( objArray.length != 0 ) {
    const array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
    let str = `${Object.keys(array[0]).map(value => `"${value}"`).join(",")}` + '\r\n';

    return array.reduce((str, next) => {
      str += `${Object.values(next).map(value => `"${value}"`).join(",")}` + '\r\n';
      return str;
    }, str);
  } else {
    return '';
  }

}


function download_file(content) {
  let b = new Blob([content], { type: 'mime' })

  console.log('b', b);
  var url = URL.createObjectURL(b);

  chrome.downloads.download({
    url: url // The object URL can be used as download URL
  });
}

