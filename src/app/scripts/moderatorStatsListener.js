const moderatorStatsListener = () =>
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request)
      if (request.msg === 'getAmount') {
        let responseArray = [];
        //сохраняет почасовые значения в массив с 6 до 23 часов.
        for (let i = 6; i < 24; i++) {
          if (
            !isNaN(parseFloat(localStorage.getItem(i))) &&
            isFinite(localStorage.getItem(i))
          ) {
            responseArray[i] = localStorage.getItem(i);
            responseArray[25] = localStorage.getItem(i); //количество за прошлый час.
          }
        }
        //сохраняет почасовые значения в массив с 0 до 5 часов.
        for (let i = 0; i < 6; i++) {
          if (
            !isNaN(parseFloat(localStorage.getItem(i))) &&
            isFinite(localStorage.getItem(i))
          ) {
            responseArray[i] = localStorage.getItem(i);
            responseArray[25] = localStorage.getItem(i); //количество за прошлый час.
          }
        }
        responseArray[24] = Number(localStorage.getItem('currentHourResult')); //количество за час.
        responseArray[26] =
          localStorage.clickcount === null ? 0 : localStorage.clickcount;
        sendResponse({ farewell: responseArray });
      }
  });

export default moderatorStatsListener;
