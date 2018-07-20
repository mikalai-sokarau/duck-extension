import scriptText from './app/scripts/headScriptText';
import timer from './app/scripts/timer';
import clicker from './app/scripts/clicker';
import clickCounter from './app/scripts/clickCounter';
import phoneNumberCheck from './app/scripts/phoneNumberCheck';
import previousRedaction from './app/scripts/previousRedaction';
import egrMessager from './app/scripts/egrMessager';
import robocopMessagesHighlighting from './app/scripts/robocopMessagesHighlighting';
import currentCategorySearch from './app/scripts/currentCategorySearch';
import wheelsDataSynchronizing from './app/scripts/wheelsDataSynchronizing';
import carTitleButton from './app/scripts/carTitleButton';
import extraButtons from './app/scripts/extraButtons';
import searchWords from './app/scripts/searchWords';
import dangerNodesHighlighting from './app/scripts/dangerNodesHighlighting';
import wrongCompanyDataHighlighting from './app/scripts/wrongCompanyDataHighlighting';
import correctIPSearch from './app/scripts/correctIPSearch';

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

  var forms = document.forms;
  
  for (let i = 0; i < forms.length; i++) {
    phoneNumberCheck(forms[i]);
    previousRedaction(forms[i]);
    robocopMessagesHighlighting(forms[i]);
    currentCategorySearch(forms[i]);
    egrMessager(forms[i]);
    extraButtons(forms[i]);
    searchWords(forms[i]);
    carTitleButton(forms[i]);
    wheelsDataSynchronizing(forms[i]);

    /* оранжевая шапка на опубликованные объявления */
    if (forms[i].querySelector('.AdLink')) {
      forms[i].querySelector('.GreyOutlineHeader').classList.add('Orange');
    }

    const submitButton = forms[i].querySelector('.SubmitButton');
    if (submitButton) {
      submitButton.addEventListener('click', clickCounter);
    }

    /* добавление причины "Заголовок" */
    const subjElelemnt = forms[i].getElementsByClassName('subj')[0];
    if (subjElelemnt) {
      if (!subjElelemnt.getAttribute('onclick')) {
        subjElelemnt.setAttribute('onclick', 'addTitleEdited(' + forms[i].id + ')');
      }
    }

    if (forms[i].querySelector('[name|=category_group]')) {
      if (forms[i].querySelector('[name|=category_group]').value === '1120') {
        forms[i].style.border = '2px solid red';
      }

      // подсветка если цена бесплатно
      if (forms[i].querySelector('[id|=remuneration_type1]').checked) {
        try {
          let range = document.createRange();
          let aim = forms[i].querySelector('[id|=remuneration_type1]').nextSibling;
          range.setStart(aim, 0);
          range.setEnd(aim, aim.length - 1);
          let highlightDiv = document.createElement('span');
          highlightDiv.style.cssText = 'color: red;';
          range.surroundContents(highlightDiv);
        } catch (e) {
          //do nothing
        }
      }
    }
  }

  wrongCompanyDataHighlighting();
  dangerNodesHighlighting();

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

  //Cлушает сообщения из main.js
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
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

  //подсвечивает цену, большую 10000р. и меньшую 2р.
  let price = document.getElementsByClassName('input_price');
  for (let i = 0; i < price.length; i++) {
    let correctPrice = price[i].value.replace(/\s+/g, '');
    if (correctPrice >= 10000 || correctPrice <= 2) {
      price[i].style.backgroundColor = '#CCFFCC';
    }
  }

  correctIPSearch();

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
