const icon = '<svg aria-hidden="true" data-prefix="fas" data-icon="times" class="svg-inline--fa fa-times fa-w-11" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512"><path fill="currentColor" d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path></svg>';

/* 
  If it is necessary to add more buttons to the options page
  just find a node from 'document' and add it to the 'NODES' object below
*/
const NODES = {
    postmoderation: document.querySelector('#postmoderation'),
    timer: document.querySelector('#timer'),
    clicker: document.querySelector('#clicker'),
    bumpsInfo: document.querySelector('#bumpsInfo'),
    descriptionSearch: document.querySelector('#descriptionSearch'),
},
      SAVE_MESSAGE_NODE = document.querySelector('.save-msg'),
      searchInput = document.querySelector('.search-input'),
      searchBtn = document.querySelector('.search-btn'),
      searchWordsContainer = document.querySelector('.search-words-container'),
      searchWordsList = document.querySelector('.search-words-list');
let store = [];

searchBtn.addEventListener('click', () => {
  const inputText = searchInput.value.toLowerCase().trim();

  if (accessToStore(inputText, store)) {
    createSearchWord(inputText);
    searchInput.value = '';
    searchInput.focus();
  }
});

searchWordsList.addEventListener('click', e => {
  const clickedLi = e.target.closest('li');

  if (clickedLi) {
    const liText = clickedLi.querySelector('.item-text').textContent;

    store = store.filter(el => el !== liText);
    clickedLi.remove();
    chrome.storage.sync.set({ store: store.join('*duck*')}, notifyUser);
  }
})

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
chrome.storage.sync.get([...Object.keys(NODES), 'store'], items => {
        const savedStore = items['store'];

        if (savedStore) {
            const words = savedStore.split('*duck*');
            
            store = words;
            words.forEach(createSearchWord);
        }

        Object.keys(NODES).forEach(key => {
            key === 'descriptionSearch' && items[key] ?
                searchWordsContainer.classList.remove('invisible') :
                searchWordsContainer.classList.add('invisible');
            
            NODES[key].checked = items[key]
        })
    }
)

// Save options to chrome.storage.sync
document.body.addEventListener('click', ({ target }) => {
    if (target.type === 'checkbox') {
        showHideSearchSection(target);   
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

function accessToStore(text, store) {
    const isStoreHasText = store.find(el => el === text);

    if (store.length >= 10 || isStoreHasText || text.length === 0) {
        return false;  
    } else {
        store.push(text);
        chrome.storage.sync.set({ store: store.join('*duck*')}, notifyUser);
    }

    return true;
}

function showHideSearchSection(node) {
    if (node.id === 'descriptionSearch') {
        searchWordsContainer.classList.toggle('invisible');
    }
}

function createSearchWord(text) {
    const li = document.createElement('li');
    const liIcon = document.createElement('div');
    const liText = document.createElement('div');
    
    liText.classList.add('item-text')
    liText.textContent = text;
    li.appendChild(liText);

    liIcon.classList.add('close-icon');
    liIcon.innerHTML = icon;
    li.appendChild(liIcon);

    searchWordsList.appendChild(li);
}
