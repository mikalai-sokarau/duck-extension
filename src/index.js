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

    phoneNumberCheck(forms[i]);
    previousRedaction(forms[i]);
    robocopMessagesHighlighting(forms[i]);

    //поиск по текущей категории
    currentCategorySearch(forms[i]);
    if (forms[i].querySelector('[name|=category_group]')) {
      if (forms[i].querySelector('[name|=category_group]').value === '1120') {
        forms[i].style.border = '2px solid red';
      }
      carTitleButton(forms[i]);
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

      extraButtons(forms[i]);

      /* выделение категории */
      chrome.storage.sync.get(['category', 'phone', 'IP', 'firstAd'], function(items) {
        if (items.category) {
          if (
            forms[i].querySelector('[name|=category_group]').value === items.category &&
            !!forms[i].querySelectorAll('img[src$="flag_new_user.gif"]')[0] ===
              items.firstAd &&
            !!forms[i].getElementsByClassName('UserData')['0'].childNodes[5]
              .textContent === items.phone &&
            !!forms[i].querySelector('a[class|=Highlight]') === items.IP &&
            forms[i].querySelector('option[value|=s]').selected
          ) {
            forms[i].style.border = '1px solid red';
          }
        }
      });

      /* выделение поисковых слов */
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

            function findAllStartRanges(nodeWithText, searchFragment) {
              let ranges = [];
              let text = nodeWithText.textContent.toLowerCase();
              let searchIndex = 0;

              while (~text.indexOf(searchFragment, searchIndex)) {
                let index = text.indexOf(searchFragment, searchIndex);
                ranges.push(index);
                searchIndex = index + searchFragment.length;
              }

              return ranges;
            }

            function highlightText(nodeWithText, arr, searchFragment) {
              for (let i = 0; i < arr.length; i++) {
                let wordStartRange = arr[i];
                let wordFinishRange = wordStartRange + searchFragment.length;
                let start = findNode(nodeWithText, wordStartRange);
                let end = findNode(nodeWithText, wordFinishRange);
                if (start !== null && ~start[1]) {
                  let range = document.createRange();
                  range.setStart(start[0], start[1]);
                  range.setEnd(end[0], end[1]);
                  let highlightDiv = document.createElement('span');
                  highlightDiv.style.backgroundColor = '#0ef';
                  try {
                    range.surroundContents(highlightDiv);
                  } catch (e) {
                    // если уже висит выделение на найденном участке вылетает
                    // InvalidStateError, будет просто пропускать этот кусок.
                  }
                }
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
                if (item[i].nodeType === 1) {
                  return [item[i].firstChild, index];
                } else {
                  return [item[i], index];
                }
              }
            }
          });
        }
      });

      //добавляет данные во все фильтры в шинах
      wheelsDataSynchronizing(forms[i]);
    }

    egrMessager(forms[i]);
  }

  /* Выделяет адрест ИМ, ТТ при некорректных данных */
  let w_sLink = document.getElementsByName('web_shop_link');
  let sAddress = document.getElementsByName('shop_address');

  function addHighlight(elem) {
    elem.style.background = '#CCFFCC';
  }

  for (let i = 0; i < w_sLink.length; i++) {
    if (
      w_sLink[i].value.toLowerCase().indexOf('.by') === -1 &&
      w_sLink[i].value.toLowerCase().indexOf('.бел') === -1 &&
      w_sLink[i].value.length !== 0
    ) {
      addHighlight(w_sLink[i]);
    }
    if (
      (sAddress[i].value.toLowerCase().indexOf('.by') ||
        sAddress[i].value.toLowerCase().indexOf('.ru') ||
        sAddress[i].value.toLowerCase().indexOf('.com') ||
        sAddress[i].value.toLowerCase().indexOf('.бел') ||
        sAddress[i].value.toLowerCase().indexOf('.org') ||
        sAddress[i].value.toLowerCase().indexOf('.рф') ||
        sAddress[i].value.toLowerCase().indexOf('.net')) !== -1 &&
      sAddress[i].value.length !== 0
    ) {
      addHighlight(sAddress[i]);
    }
  }

  //Подсвечивает незаполненные поля размера, сезона, состояния
  let shoesSeason = document.getElementsByName('shoes_season');
  for (let i = 0; i < shoesSeason.length; i++) {
    if (shoesSeason[i].value === '') {
      shoesSeason[i].style.border = '1px solid red';
    }
  }

  let womenClothesSize = document.getElementsByName('women_clothes_size');
  for (let i = 0; i < womenClothesSize.length; i++) {
    if (womenClothesSize[i].value === '') {
      womenClothesSize[i].style.border = '1px solid red';
    }
  }

  let menClothesSize = document.getElementsByName('men_clothes_size');
  for (let i = 0; i < menClothesSize.length; i++) {
    if (menClothesSize[i].value === '') {
      menClothesSize[i].style.border = '1px solid red';
    }
  }

  let conditionRequired = document.getElementsByName('condition_required');
  for (let i = 0; i < conditionRequired.length; i++) {
    if (conditionRequired[i].value === '') {
      conditionRequired[i].style.border = '1px solid red';
    }
  }
  let conditionFull = document.getElementsByName('condition');
  for (let i = 0; i < conditionFull.length; i++) {
    if (conditionFull[i].value === '') {
      conditionFull[i].style.border = '1px solid red';
    }
  }

  let menShoesSize = document.getElementsByName('men_shoes_size');
  for (let i = 0; i < menShoesSize.length; i++) {
    if (menShoesSize[i].value === '') {
      menShoesSize[i].style.border = '1px solid red';
    }
  }

  let womenShoesSize = document.getElementsByName('women_shoes_size');
  for (let i = 0; i < womenShoesSize.length; i++) {
    if (womenShoesSize[i].value === '') {
      womenShoesSize[i].style.border = '1px solid red';
    }
  }

  let babyClothesSeason = document.getElementsByName('baby_clothes_season');
  for (let i = 0; i < babyClothesSeason.length; i++) {
    if (babyClothesSeason[i].value === '') {
      babyClothesSeason[i].style.border = '1px solid red';
    }
  }

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

  //Заменяет поиск по id на корректный.
  {
    const IPSearchNodesArr = Array.from(
      document.querySelectorAll(".UserData a[href*='ripe.net']")
    );
    IPSearchNodesArr.forEach(node => {
      node.href = `https://www2.kufar.by/controlpanel?m=search&a=search&q=${
        node.innerHTML
      }&search_type=ip&queue=&region=&category_group=0&archive_group=noarchive&timespan=all&search=Search`;
    });
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
