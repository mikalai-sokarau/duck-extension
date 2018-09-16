export const clickCounter = () => {
  if (typeof Storage !== 'undefined') {
    if (localStorage.clickcount) {
      localStorage.clickcount = +localStorage.clickcount + 1;
      localStorage.setItem(
        'currentHourResult',
        +localStorage.getItem('currentHourResult') + 1
      );
    } else {
      localStorage.clickcount = 1;
      localStorage.setItem('currentHourResult', 1);
    }
    const adsReviewed = sessionStorage.getItem('adsReviewed');
    adsReviewed
      ? sessionStorage.setItem('adsReviewed', +adsReviewed + 1)
      : sessionStorage.setItem('adsReviewed', 1);
  }
};
