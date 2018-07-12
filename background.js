//Запускает расширение только на www2.kufar.by
chrome.runtime.onInstalled.addListener(function() {
  // Replace all rules ...
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    // With a new rule ...
    chrome.declarativeContent.onPageChanged.addRules([
      {
        // That fires when a page's URL contains a 'www2.kufar.by' ...
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { urlContains: 'www2.kufar.by' }
          })
        ],
        // And shows the extension's page action.
        actions: [new chrome.declarativeContent.ShowPageAction()]
      }
    ]);
  });
});

let tDate = new Date(); //todayDate
let sDate; // savedDate

//Заменяет вчерашнюю дату сегодняшней, если наступило время.
if (localStorage.getItem('savedDate') !== null) {
  sDate = new Date(localStorage.getItem('savedDate'));
  dateChange();

  //Логика замены даты.
  function dateChange() {
    if (
      tDate.getDate() - sDate.getDate() > 1 ||
      (tDate.getDate() - sDate.getDate() < 0 && tDate.getHours() > 4) ||
      (sDate.getDate() < tDate.getDate() && tDate.getHours() > 4) ||
      (sDate.getMonth() < tDate.getMonth() && tDate.getHours() > 4) ||
      (sDate.getFullYear() < tDate.getFullYear() && tDate.getHours() > 4)
    ) {
      clearAmount();
    }

    function clearAmount() {
      localStorage.setItem('savedDate', tDate);
      localStorage.setItem('dateSwitcher', 'on');
    }
  }
} else {
  localStorage.setItem('savedDate', tDate);
}

let forEgr;
//Слушает сообщения о готовности contentscript.js
chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
  //Если dateSwitcher включен, посылает сообщение об обнулении данных.
  if (
    req.greeting === 'ready' &&
    localStorage.getItem('dateSwitcher') === 'on'
  ) {
    sendResponse({ farewell: 'clearData' });
    localStorage.setItem('dateSwitcher', 'off');
  } else if (req.greeting === 'giveData') {
    sendResponse({ farewell: forEgr });
  }
  if (req.getDataFromEGR) {
    return !!fetch(`http://egr.gov.by/egrn/API.jsp?NM=${req.getDataFromEGR}`)
      .then(res => res.json())
      .then(([{ VFN: name, VS: isActive }]) =>
        sendResponse({ name, isActive })
      );
  }
  if (req.idToEGR) {
    forEgr = req.idToEGR;
  }
});
