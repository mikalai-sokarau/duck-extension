const NODES = {
    postmoderation: document.querySelector('#postmoderation'),
    timer: document.querySelector('#timer'),
    clicker: document.querySelector('#clicker'),
    bumpsInfo: document.querySelector('#bumpsInfo')
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
chrome.storage.sync.get(Object.keys(NODES), items => 
    Object.keys(NODES).forEach(key => NODES[key].checked = items[key])
)

// Save options to chrome.storage.sync
document.getElementById('save').addEventListener('click', () => {
  chrome.storage.sync.set(getOptions(NODES), notifyUser)
});

function getOptions(nodes) {
  return Object.keys(nodes).reduce((result, key) => {
      result[key] = nodes[key].checked;
      return result;
  }, {})
}

// Update status to let user know options were saved.
function notifyUser() {
  const status = document.getElementById('status');

  status.style.visibility = 'visible';
  setTimeout(() => {
    status.style.visibility = 'hidden'
  }, 750);
}
