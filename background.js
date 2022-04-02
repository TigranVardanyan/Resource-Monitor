// todo interactive icon

const initialObj = {
  'ram': []
}

chrome.storage.sync.set(initialObj);

setInterval(async () => {
  console.log('background - ');
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

    chrome.storage.sync.set({ 'ram': data });
  });

},1000)
