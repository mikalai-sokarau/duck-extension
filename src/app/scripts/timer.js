export const timer = () => {
  try {
    chrome.storage.sync.get(['timer'], function(item) {
      const url = window.location.href;

      if (
        item.timer &&
        (url ===
          'https://www2.kufar.by/controlpanel?lock=1&m=adqueue&a=show_adqueues&queue=medium' ||
          url ===
            'https://www2.kufar.by/controlpanel?m=adqueue&a=show_adqueues')
      ) {
        let duck_timer = document.createElement('div');
        duck_timer.id = 'duck_timer';
        duck_timer.style =
          'position: fixed; right: 10px; bottom: 10px; font-size: medium';
        document.getElementById('trail').appendChild(duck_timer);
        let timerTime = 3;
        setInterval(function() {
          let timerDate = new Date();
          timerDate.setMinutes(0);
          timerDate.setSeconds(timerTime++);
          let timerMinutes = timerDate.getMinutes();
          let timerSeconds = timerDate.getSeconds();
          if (timerSeconds < 10) timerSeconds = '0' + timerSeconds;
          document.getElementById('duck_timer').innerHTML =
            timerMinutes +
            ':' +
            timerSeconds +
            ' Ads:' +
            sessionStorage.getItem('adsReviewed');
        }, 1000);
      }
    });
  } catch (e) {
    /* do nothing */
  }
};
