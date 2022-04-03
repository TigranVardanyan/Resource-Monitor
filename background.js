const initialObj = {
  'ram': [],
  'options': {
    'warning': 30,
    'red': 65
  },
}
let alertColor = null;
let data = [];
chrome.runtime.onInstalled.addListener(() => {
  console.log('Worker inited');
});
chrome.storage.sync.set(initialObj);
setInterval(async () => {
  a = await chrome.system.memory.getInfo();
  const capacity = a.capacity;
  const availableCapacity = a.availableCapacity;
  const usedCapacityPresent = (capacity - availableCapacity) / capacity * 100;
  await chrome.storage.sync.get(['ram', 'options'], function ( result ) {
    data = result['ram']
    options = result['options']
    console.log('options', options);
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
    const object = {
      capacity,
      availableCapacity,
      usedCapacityPresent,
      date: (new Date()).toLocaleTimeString(),
      alertColor,
      alertLevel
    }
    data.push(object)
    //data = data.slice(data.length - 50, data.length)
    chrome.storage.sync.set({ 'ram': data });
  });
}, 1000)
chrome.runtime.onMessage.addListener(function ( request, sender, sendResponse ) {
  if ( request.type == "getData" ) {
    const obj = {
      "result": data
    }
    sendResponse(obj);
  }
});