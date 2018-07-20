/* заменить ё на е */

const egrMessager = form => {
  const vatNumber = form.querySelector('#vat_number');
  if (vatNumber) {
    const key = `duck_${vatNumber.value}`;
    const value = sessionStorage.getItem(key);
    const sibling = form.querySelector('.SmallLabel');
    const userName = form.querySelector('span[onclick="editAuthorName(this)"]')
      .textContent;

    if (value) {
      const storedData = value.split('=');
      const isActive = storedData[1] === 'true';
      const node = createNode(storedData[0], vatNumber.value, isActive);

      sibling.parentNode.insertBefore(node, sibling);
    } else {
      chrome.runtime.sendMessage(
        { getDataFromEGR: vatNumber.value },
        ({ name, status, type }) => {
          const isActive = checkForActive(status, userName, name, type);
          const node = createNode(name, vatNumber.value, isActive);

          if (isActive) {
            sessionStorage.setItem(key, `${name}=${isActive}`);
          }
          sibling.parentNode.insertBefore(node, sibling);
        }
      );
    }
  }
};

function checkForActive(status, userName, name, type) {
  const isActiveStatus = status === 'Действующий' || status === 'Процедура банкротства';
  const isTitleCorrect = checkForTitle(userName, name, type);

  return isActiveStatus && isTitleCorrect;
}

/**
 * API link - http://egr.gov.by/egrn/index.jsp?content=API
 * @param type 1 - company, 2 - individual entrepreneur
 */
function checkForTitle(userName, name, type) {
  return type === 1
    ? userName.search(new RegExp(name, 'i')) > -1
    : userName.search(new RegExp(name.split(' ')[0], 'i')) > -1;
}

function createNode(name, value, isActive) {
  const node = document.createElement('div');
  const link = document.createElement('a');

  node.style.marginBottom = '5px';
  link.textContent = name;
  link.style.border = 'none';
  link.style.padding = '1px 5px 1px 0';
  link.style.cursor = 'pointer';
  link.style.background = `${isActive ? '#d7ffb5' : '#ffd6d6'}`;

  link.target = '_blank';
  link.href = 'http://egr.gov.by/egrn/index.jsp?content=Find';
  node.appendChild(link);
  node.addEventListener('click', () => chrome.runtime.sendMessage({ idToEGR: value }));

  return node;
}

export default egrMessager;
