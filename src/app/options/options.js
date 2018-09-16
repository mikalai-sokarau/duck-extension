/* 
  If it is necessary to add more buttons to the options page
  just find a node from 'document' and add it to the 'NODES' object below
*/
const NODES = {
    postmoderation: document.querySelector('#postmoderation'),
    timer: document.querySelector('#timer'),
    clicker: document.querySelector('#clicker'),
    bumpsInfo: document.querySelector('#bumpsInfo')
}
const SAVE_MESSAGE_NODE = document.querySelector('.save-msg');

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
chrome.storage.sync.get(Object.keys(NODES), items => 
    Object.keys(NODES).forEach(key => NODES[key].checked = items[key])
)

// Save options to chrome.storage.sync
document.body.addEventListener('click', ({ target }) => {
  if (target.type === 'checkbox') {
    chrome.storage.sync.set(getOptions(NODES), notifyUser)
  }
})

function getOptions(nodes) {
  return Object.keys(nodes).reduce((result, key) => {
      result[key] = nodes[key].checked;
      return result;
  }, {})
}

// Update status to let user know options were saved.
function notifyUser() {
  SAVE_MESSAGE_NODE.classList.add('show');

  setTimeout(() => {
    SAVE_MESSAGE_NODE.classList.remove('show');
  }, 650);
}
