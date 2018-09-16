export const searchWords = form =>
  chrome.storage.sync.get(['isSearchTextVisible'], function(obj) {
    if (obj.isSearchTextVisible) {
      chrome.storage.sync.get(['searchText'], function(item) {
        let wordsFromOptions = item.searchText;
        let adBodyNode = forms[i].querySelector('div[id|=body]');
        wordsFromOptions.forEach(function(item) {
          try {
            let wordsStartRanges = findAllStartRanges(adBodyNode, item);
            highlightText(adBodyNode, wordsStartRanges, item);
          } catch (e) {
            /* do nothing */
          }
        });
      });
    }
  });

function highlightText(nodeWithText, arr, searchFragment) {
  arr.forEach(wordStartRange => {
    const wordFinishRange = wordStartRange + searchFragment.length;
    const start = findNode(nodeWithText, wordStartRange);
    const end = findNode(nodeWithText, wordFinishRange);

    if (start !== null && ~start[1]) {
      const range = document.createRange();
      range.setStart(start[0], start[1]);
      range.setEnd(end[0], end[1]);
      const highlightDiv = document.createElement('span');
      highlightDiv.style.backgroundColor = '#0ef';
      try {
        range.surroundContents(highlightDiv);
      } catch (e) {
        // если уже висит выделение на найденном участке вылетает
        // InvalidStateError, будет просто пропускать этот кусок.
      }
    }
  });
}

function findAllStartRanges(nodeWithText, searchFragment) {
  const ranges = [];
  const text = nodeWithText.textContent.toLowerCase();
  let searchIndex = 0;

  while (~text.indexOf(searchFragment, searchIndex)) {
    const index = text.indexOf(searchFragment, searchIndex);
    ranges.push(index);
    searchIndex = index + searchFragment.length;
  }

  return ranges;
}

function findNode(nodeWithText, num, startIndex = 0) {
  let index = startIndex,
    item = nodeWithText.childNodes,
    i = 0;

  for (; i < item.length; i++) {
    if (item[i].nodeType === 1) {
      if (item[i].childNodes.length > 1) {
        if (index + item[i].textContent.length < num) {
          index += item[i].textContent.length;
        } else {
          let zz = findNode(item[i], num, index);
          item[i] = zz[0];
          index = zz[1];
          break;
        }
      } else {
        if (index + item[i].textContent.length < num) {
          index += item[i].textContent.length;
        } else {
          index = num - index;
          break;
        }
      }
    }
    if (item[i].nodeType === 3) {
      if (index + item[i].length <= num) {
        index += item[i].length;
      } else {
        index = num - index;
        break;
      }
    }
  }
  return item[i].nodeType === 1 ? [item[i].firstChild, index] : [item[i], index];
}
