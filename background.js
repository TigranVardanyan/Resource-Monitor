const initialObj = {
  'ram': [],
  'options': {
    'warning': 30,
    'red': 65
  }
}

chrome.runtime.onInstalled.addListener(() => {
  console.log('Worker inited');
});

chrome.storage.sync.set(initialObj);

setInterval(async () => {
  a = await chrome.system.memory.getInfo();

  const capacity = a.capacity;
  const availableCapacity = a.availableCapacity;
  const usedCapacityPresent = (capacity - availableCapacity) / capacity * 100;

  let alertLevel = null;
  let data = [];

  switch ( true ) {
    case +usedCapacityPresent < 10:
      alertLevel = 0;
      break;
    case +usedCapacityPresent < 20:
      alertLevel = 1;
      break;
    default:
      alertLevel = 2;
  }

  const object = {
    capacity:capacity,
    availableCapacity:availableCapacity,
    usedCapacityPresent,usedCapacityPresent,
    date:(new Date()).toLocaleTimeString(),
    alertLevel: alertLevel
  }

  await chrome.storage.sync.get(['ram'], function(result) {
    data = result['ram']
    data.push(object)

    data = data.slice(data.length - 50,data.length)
    chrome.storage.sync.set({ 'ram': data });
  });

},1000)
