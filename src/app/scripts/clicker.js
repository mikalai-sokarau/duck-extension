export const clicker = () =>
  chrome.storage.sync.get(['clicker'], function(item) {
    if (item.clicker) {
      if (document.querySelector('body').innerHTML.length < 200) {
        window.location.href =
          'https://www2.kufar.by/controlpanel?lock=1&m=adqueue&a=show_adqueues&queue=medium';
      }
      const err = document.querySelector('.error');
      if (err && err.textContent === 'Review queue is empty.') {
        window.location.href =
          'https://www2.kufar.by/controlpanel?lock=1&m=adqueue&a=show_adqueues&queue=medium';
      }
    }
  });
