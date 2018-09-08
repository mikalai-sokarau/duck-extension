import { 
  scriptText,
  timer,
  clicker,
  clickCounter,
  phoneNumberCheck,
  previousRedaction,
  egrMessager,
  robocopMessagesHighlighting,
  currentCategorySearch,
  wheelsDataSynchronizing,
  carTitleButton,
  extraButtons,
  searchWords,
  dangerNodesHighlighting,
  wrongCompanyDataHighlighting,
  correctIPSearch,
  moderatorStatsListener,
  freePriceHighlighting
} from './app/scripts';

if (/https:\/\/www2.kufar.by/.test(window.location.href)) {
  sessionStorage.setItem('adsReviewed', 0);

  //Добавляет текст скрипта с функциями addWrongCategory(), addTitleEdited() в head
  const head = document.getElementsByTagName('head')[0];
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.text = scriptText;

  head.appendChild(script);

  clicker();
  timer();
  wrongCompanyDataHighlighting();
  dangerNodesHighlighting();
  moderatorStatsListener();
  correctIPSearch();

  Array.from(document.forms).forEach(form => {
    phoneNumberCheck(form);
    previousRedaction(form);
    robocopMessagesHighlighting(form);
    currentCategorySearch(form);
    egrMessager(form);
    extraButtons(form);
    searchWords(form);
    carTitleButton(form);
    wheelsDataSynchronizing(form);
    freePriceHighlighting(form);

    if (form.querySelector('.AdLink')) {
      form.querySelector('.GreyOutlineHeader').classList.add('Orange');
    }

    const submitButton = form.querySelector('.SubmitButton');
    if (submitButton) {
      submitButton.addEventListener('click', clickCounter);
    }

    /* добавление причины "Заголовок" */
    const subjElelemnt = form.getElementsByClassName('subj')[0];
    if (subjElelemnt) {
      if (!subjElelemnt.getAttribute('onclick')) {
        subjElelemnt.setAttribute('onclick', 'addTitleEdited(' + form.id + ')');
      }
    }

    if (form.querySelector('[name|=category_group]')) {
      if (form.querySelector('[name|=category_group]').value === '1120') {
        form.style.border = '2px solid red';
      }
    }
  });

  //Сохраняет данные при наступлении нового часа.
  let tmpDate = new Date().getHours();
  if (localStorage.getItem('sHour') !== null) {
    let savedHour = Number(localStorage.getItem('sHour'));
    if (tmpDate > savedHour || (savedHour === 23 && tmpDate === 0)) {
      let tmp = tmpDate - 1; //Значание прошлого часа для сохранения данных.
      if (tmp === -1) tmp = 23;
      localStorage.setItem(tmp, localStorage.getItem('currentHourResult'));
      localStorage.setItem('currentHourResult', '0');
      localStorage.setItem('sHour', tmpDate);
    }
  } else {
    localStorage.setItem('sHour', tmpDate);
  }

  //подсвечивает цену, большую 10000р. и меньшую 2р.
  let price = document.getElementsByClassName('input_price');
  for (let i = 0; i < price.length; i++) {
    let correctPrice = price[i].value.replace(/\s+/g, '');
    if (correctPrice >= 10000 || correctPrice <= 2) {
      price[i].style.backgroundColor = '#CCFFCC';
    }
  }

  //Отправляет сообщение о готовности принимать комманды от background.js
  chrome.runtime.sendMessage({ greeting: 'ready' }, function(response) {
    //обнуление данных.
    if (response) {
      if (response.farewell === 'clearData') {
        localStorage.clear();
      }
    }
  });
}
