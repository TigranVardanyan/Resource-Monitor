const initialObj = {
  'ram': [],
  'options': {
    'warning': 30,
    'red': 65
  },
  'alerts':[]
}
let alertColor = null;
let data = [];
let alerts = [];
chrome.runtime.onInstalled.addListener(() => {
  console.log('Worker initialized');
});
chrome.storage.sync.set(initialObj);
setInterval(async () => {
  a = await chrome.system.memory.getInfo();
  const capacity = a.capacity;
  const availableCapacity = a.availableCapacity;
  const usedCapacityPresent = (capacity - availableCapacity) / capacity * 100;
  await chrome.storage.sync.get(['ram', 'options', 'alerts'], function ( result ) {
    data = result['ram']
    options = result['options']
    switch ( true ) {
      case +usedCapacityPresent < +options['warning']:
        alertColor = '#0D6EFD';
        alertLevel = 0;
        break;
      case +usedCapacityPresent < +options['red']:
        alertColor = '#FFECB5';
        alertLevel = 1;
        break;
      default:
        alertColor = '#F8D7DA';
        alertLevel = 2;
    }

    //updating data
    const object = {
      capacity,
      availableCapacity,
      usedCapacityPresent,
      date: (new Date()).toLocaleTimeString(),
      alertColor,
      alertLevel
    }
    data.push(object)
    //Error: QUOTA_BYTES_PER_ITEM quota exceeded
    while ( data.length > 50 ) {
      data.shift();
    }
    chrome.storage.sync.set({ 'ram': data });
    chrome.runtime.sendMessage('data_updated')

    //updating alerts
    const alertObject = {
      usedCapacityPresent,
      date: (new Date()).toLocaleTimeString(),
    }
    if ( alertLevel != 0 ) {
      alerts.push(alertObject)
      //Error: QUOTA_BYTES_PER_ITEM quota exceeded
      while ( alerts.length > 50 ) {
        alerts.shift();
      }
      chrome.storage.sync.set({ 'alerts': alerts });
      chrome.runtime.sendMessage('alerts_updated')
    }
  });
}, 2500)