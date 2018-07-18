(function() {
  if (/https:\/\/www2.kufar.by/.test(window.location.href)) {
    sessionStorage.setItem('adsReviewed', 0);

    //Добавляет текст скрипта с функциями addWrongCategory(), addTitleEdited() в head
    const head = document.getElementsByTagName('head')[0];
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.text =
      'function innerLogic(myForm, editReason){\n' +
      "var editReasonBy = editReason + '_by';\n" +
      "var mbi = myForm.getElementsByClassName('multi_block_input');\n" +
      "mbi[0].checked = 'true';\n" +
      "var qBox = myForm.getElementsByClassName('QueueBox');" +
      'for (var i = 0; i < qBox.length; i++) {\n' +
      'if (qBox[i].childNodes[1]) {\n' +
      'if (qBox[i].childNodes[1].checked) {\n' +
      "qBox[i].style.backgroundColor = '#dcdcc3';\n" +
      '} else {\n' +
      "qBox[i].style.backgroundColor = '';\n" + //#FFFFEB
      '}\n' +
      '}\n' +
      '}\n' +
      "var e_aName = 'edit_accept_block' + myForm.id.substring(2, 30);\n" +
      'var e_aBlock = document.getElementById(e_aName);\n' +
      "var m_bDiv = e_aBlock.getElementsByClassName('multi_block_div');\n" +
      'var w_cChecker = 0;\n' +
      'for(var i = 0; i < m_bDiv.length; i++){\n' +
      "if(m_bDiv[i].childNodes[1].value == '«Deny»'){\n" +
      'm_bDiv[i].childNodes[1].value = editReason;\n' +
      "if (m_bDiv[i].childNodes[1].value == ''){\n" +
      'm_bDiv[i].childNodes[1].value = editReasonBy;\n' +
      '}\n' +
      '}\n' +
      'if(m_bDiv[i].childNodes[1].value == editReason || m_bDiv[i].childNodes[1].value == editReasonBy){\n' +
      'w_cChecker = 1;\n' +
      'break;\n' +
      '}\n' +
      '}\n' +
      'if(w_cChecker == 0 && m_bDiv.length < 3){\n' +
      'm_bDiv[0].childNodes[3].click();\n' +
      'm_bDiv[m_bDiv.length - 1].childNodes[1].value = editReason;\n' +
      "if (m_bDiv[m_bDiv.length - 1].childNodes[1].value == '') {\n" +
      'm_bDiv[m_bDiv.length - 1].childNodes[1].value = editReasonBy;\n' +
      '}\n' +
      '}\n' +
      '}\n' +
      'function addWrongCategory(w_cForm){\n' +
      "let duck_condition = w_cForm.getElementsByClassName('js-param js-condition')[0].lastElementChild.value || w_cForm.getElementsByClassName('js-param js-condition_required')[0].lastElementChild.value;\n" +
      "innerLogic(w_cForm, 'wrong_category');\n" +
      "w_cForm.getElementsByClassName('js-param js-condition')[0].lastElementChild.value = duck_condition;\n" +
      "w_cForm.getElementsByClassName('js-param js-condition_required')[0].lastElementChild.value = duck_condition;\n" +
      '}\n' +
      'function addTitleEdited(t_eForm){\n' +
      "innerLogic(t_eForm, 'title_edited');\n" +
      '}\n' +
      "function innerLogicRefuse(myForm, refuseReason) { \
        let refuseReasonBy = refuseReason + '_by'; \
        let mbi = myForm.getElementsByClassName('multi_block_select')[0]; \
        mbi.checked = true; \
        let qBox = myForm.getElementsByClassName('QueueBox'); \
        for (let i = 0; i < qBox.length; i++) { \
          if (qBox[i].childNodes[1]) { \
            if (qBox[i].childNodes[1].checked) { \
              qBox[i].style.backgroundColor = '#dcdcc3'; \
            } else { \
              qBox[i].style.backgroundColor = ''; \
            } \
          } \
        } \
        let e_rName = 'refuse_block' + myForm.id.substring(2, 30); \
        let e_rBlock = document.getElementById(e_rName); \
        let m_bDiv = e_rBlock.getElementsByClassName('multi_block_div'); \
        let w_cChecker = 0; \
        for(let i = 0; i < m_bDiv.length; i++){ \
          if(m_bDiv[i].childNodes[1].value == '«Deny»'){ \
            m_bDiv[i].childNodes[1].value = refuseReason; \
            if (m_bDiv[i].childNodes[1].value == ''){ \
              m_bDiv[i].childNodes[1].value = refuseReasonBy; \
            } \
          } \
          if(m_bDiv[i].childNodes[1].value == refuseReason || m_bDiv[i].childNodes[1].value == refuseReasonBy){ \
            w_cChecker = 1; \
            break; \
          } \
        } \
        if(w_cChecker == 0 && m_bDiv.length < 3){ \
            m_bDiv[0].childNodes[3].click(); \
            m_bDiv[m_bDiv.length - 1].childNodes[1].value = refuseReason; \
            if (m_bDiv[m_bDiv.length - 1].childNodes[1].value == '') { \
              m_bDiv[m_bDiv.length - 1].childNodes[1].value = refuseReasonBy; \
            } \
        } \
      } \
      const refuseCompanyAdAsPrivate = formId => innerLogicRefuse(formId, 'company_ad_as_private');\
      const refuse2Cabinets = formId => innerLogicRefuse(formId, '2_cabinets'); \
      const falseSellerInformation = formId => innerLogicRefuse(formId, 'false_seller_information'); \
      const inactiveDuplicate = formId => innerLogicRefuse(formId, 'inactive_duplicate'); \
      const duplicate = formId => innerLogicRefuse(formId, 'duplicate');";

    head.appendChild(script);

    //кликер
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

    //таймер
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
          let timer = document.createElement('div');
          timer.id = 'duck_timer';
          timer.style =
            'position: fixed; right: 10px; bottom: 10px; font-size: medium';
          document.getElementById('trail').appendChild(timer);
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

    //---------------------------------------------------------------------------

    const clickCounter = () => {
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

    //Неподдерживаемый мрак
    function _toConsumableArray(arr) {
      if (Array.isArray(arr)) {
        for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
          arr2[i] = arr[i];
        }
        return arr2;
      } else {
        return Array.from(arr);
      }
    }

    var forms = document.forms,
      fixedForms = []
        .concat(_toConsumableArray(document.forms))
        .filter(function(form) {
          return form.length > 1;
        });

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
          subjElelemnt.setAttribute(
            'onclick',
            'addTitleEdited(' + forms[i].id + ')'
          );
        }
      }

      //помещает телефон над полем с ценой.
      try {
        const currentPhoneNumber = forms[i].querySelector('[class|=UserData]')
          .children[2].textContent;
        const fixedNumber = String(currentPhoneNumber.replace(/\D+/g, ''));
        const phoneSpan = document.createElement('span');
        phoneSpan.innerHTML = currentPhoneNumber;
        fixedNumber.length < 9
          ? (phoneSpan.style = 'color: red; font-weight: bold;')
          : (phoneSpan.style = 'color: blue; font-weight: bold;');
        if (!checkNumber(fixedNumber)) {
          phoneSpan.style = 'color: red; font-weight: bold;';
        }
        if (fixedNumber.length > 17) {
          phoneSpan.style = 'color: #339900; font-weight: bold;';
        } // переделать
        function checkNumber(numb) {
          /* Первые цифры номера телефона */
          const startNumbers = [
            '37525',
            '37529',
            '37533',
            '37544',
            '8025',
            '8029',
            '8033',
            '8044',
            '25',
            '29',
            '33',
            '44',
            '025',
            '029',
            '033',
            '044'
          ];
          return startNumbers.some(current => {
            if (numb.startsWith(current)) {
              const pureNumber = numb.slice(current.length);
              if (pureNumber.length !== 7) return false;
              const numbers = [...pureNumber].reduce(
                (acc, item) => {
                  acc[Number(item)]++;
                  return acc;
                },
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
              );
              return Math.max(...numbers) < 6;
            }

            return false;
          });
        }

        forms[i].querySelector('[class|=SmallLabel]').appendChild(phoneSpan);
      } catch (e) {}

      //предыдущая редакция объявления
      try {
        let adQueueId = forms[i]
          .getElementsByClassName('fine_print')[0]
          .getElementsByTagName('a');
        let adNumberAndRedaction = adQueueId[
          adQueueId.length - 1
        ].innerHTML.split('-');
        if (!forms[i].querySelector('[class|=AdLink]')) {
          adNumberAndRedaction[1] = 2;
        }
        let previousRedactionButton = document.createElement('a');
        previousRedactionButton.id = 'duck_previousRedactionButton';
        previousRedactionButton.target = '_blank';
        previousRedactionButton.href =
          'https://www2.kufar.by/controlpanel?m=adqueue&queue=all&lock=0&a=show_ad&ad_id=' +
          adNumberAndRedaction[0] +
          '&action_id=' +
          (adNumberAndRedaction[1] - 1) +
          '&single=1';
        previousRedactionButton.appendChild(document.createTextNode('—►'));
        if (adQueueId[adQueueId.length - 1].innerHTML.split('-')[1] - 1) {
          previousRedactionButton.style = 'float:right;';
        } else {
          previousRedactionButton.style = 'float:right; display:none';
        }
        forms[i]
          .getElementsByClassName('AdWrapper')[0]
          .insertBefore(
            previousRedactionButton,
            forms[i].getElementsByClassName('AdWrapper')[0].children[0]
          );
      } catch (e) {
        /* do nothing */
      }

      /* подсветка сообщений от робота */
      let uidClass = forms[i].getElementsByClassName('UidNoticeLink');
      if (uidClass[uidClass.length - 1]) {
        var roboNode = uidClass[uidClass.length - 1];
        var roboText = roboNode.textContent;
        if (
          roboText.indexOf('autoaccept_category') != -1 ||
          roboText.indexOf('user_in_whitelist') != -1 ||
          roboText.indexOf('is_private_ad') != -1 ||
          roboText.indexOf('edit-abuse_refuse_filter') != -1 ||
          roboText.indexOf('fsm:new-is_new_user:yes') !== -1
        ) {
          roboNode.style.background = '#CCFFCC';
        } else if (
          roboText.indexOf('is_previous_state_refused:yes') != -1 ||
          roboText.indexOf('TERMINATOR:manual') != -1
        ) {
          roboNode.style.background = '#FF9999';
        } else if (roboText.indexOf('looks_like_company') != -1) {
          roboNode.style.background = '#CCFFFF';
        } else if (roboText.indexOf('is_belarus_ip:no') != -1) {
          roboNode.style.background = '#CCFFCC';
          roboNode.style.border = '3px solid black';
        }
      }

      //поиск по текущей категории
      let categoryFindButton;
      if (forms[i].querySelector('[name|=category_group]')) {
        let form_selectValue = forms[i].querySelector('[name|=category_group]')
          .value;
        let emailCheck = forms[i]
          .getElementsByClassName('AdWrapper')[0]
          .getElementsByTagName('a');
        let form_userMail;
        if (emailCheck[emailCheck.length - 1].textContent === '→') {
          form_userMail = emailCheck[emailCheck.length - 2];
        } else {
          form_userMail = emailCheck[emailCheck.length - 1];
        }
        categoryFindButton = document.createElement('a');
        categoryFindButton.href =
          'https://www2.kufar.by/controlpanel?m=search&a=search&q=' +
          form_userMail +
          '&search_type=email&queue=&region=&category_group=' +
          form_selectValue +
          '&archive_group=noarchive&timespan=all&time_from=2016-09-19&time_to=2016-10-19&search=Search';
        categoryFindButton.target = '_blank';
        categoryFindButton.appendChild(document.createTextNode('🔍'));
      }
      if (forms[i].querySelector('[name|=category_group]')) {
        if (
          !forms[i]
            .querySelector('[name|=category_group]')
            .getAttribute('onclick')
        ) {
          forms[i]
            .querySelector('[name|=category_group]')
            .setAttribute('onclick', 'addWrongCategory(' + forms[i].id + ')');
        }
        if (
          !forms[i]
            .getElementsByClassName('AdWrapper')[0]
            .getElementsByTagName('td')
            [
              forms[i]
                .getElementsByClassName('AdWrapper')[0]
                .getElementsByTagName('td').length - 1
            ].getAttribute('onclick')
        ) {
          forms[i]
            .getElementsByClassName('AdWrapper')[0]
            .getElementsByTagName('td')
            [
              forms[i]
                .getElementsByClassName('AdWrapper')[0]
                .getElementsByTagName('td').length - 1
            ].getElementsByTagName('select')[0]
            .setAttribute('onclick', 'addWrongCategory(' + forms[i].id + ')');
          let addedPlace = forms[i]
            .getElementsByClassName('AdWrapper')[0]
            .getElementsByTagName('td');
          addedPlace[addedPlace.length - 1].appendChild(categoryFindButton);
        }
        if (forms[i].querySelector('[name|=category_group]').value === '1120') {
          forms[i].style.border = '2px solid red';
        }
        if (forms[i].querySelector('[name|=category_group]').value === '2010') {
          let carButton = [];
          carButton[i] = document.createElement('input');
          carButton[i].type = 'button';
          carButton[i].value = '+';
          carButton[i].id = 'cars_' + forms[i].id;
          carButton[i].onclick = function() {
            let correctFormId = this.id.substring(5, 30);
            let carsBrandText = document
              .getElementById(correctFormId)
              .getElementsByClassName('js-param js-cars_brand')[0]
              .getElementsByTagName('select')[0];
            let carsModelText = document
              .getElementById(correctFormId)
              .getElementsByClassName('js-param js-cars_level_1')[0]
              .getElementsByTagName('select')[0];
            let carBrand = '';
            let carModel = '';
            if (
              carsBrandText.options[carsBrandText.selectedIndex].text !==
                'название марки' &&
              carsBrandText.options[carsBrandText.selectedIndex].text !== 'OTH1'
            ) {
              carBrand =
                ' ' + carsBrandText.options[carsBrandText.selectedIndex].text;
            }
            if (
              carsModelText.options[carsModelText.selectedIndex].text !==
                'название модели' &&
              carsModelText.options[carsModelText.selectedIndex].text !==
                'Другая'
            ) {
              carModel =
                ' ' + carsModelText.options[carsModelText.selectedIndex].text;
            }
            document
              .getElementById(correctFormId)
              .getElementsByClassName('subj')[0].nextSibling.value +=
              carBrand + carModel;
          };
          forms[i].getElementsByClassName('subj')[0].appendChild(carButton[i]);
        }

        // подсветка если цена бесплатно
        if (forms[i].querySelector('[id|=remuneration_type1]').checked) {
          try {
            let range = document.createRange();
            let aim = forms[i].querySelector('[id|=remuneration_type1]')
              .nextSibling;
            range.setStart(aim, 0);
            range.setEnd(aim, aim.length - 1);
            let highlightDiv = document.createElement('span');
            highlightDiv.style.cssText = 'color: red;';
            range.surroundContents(highlightDiv);
          } catch (e) {
            //do nothing
          }
        }

        /* кнопки для постмодерации */
        chrome.storage.sync.get(['postmoderation'], function(item) {
          if (item.postmoderation) {
            forms[i].getElementsByClassName('QueueName')[0].style.textAligh =
              'center';
            let buttons = [];
            for (let n = 0; n < 5; n++) {
              let idNumbers = forms[i].id.slice(3);

              buttons[n] = document.createElement('input');
              buttons[n].type = 'submit';
              buttons[n].className = 'postmoderation';
              buttons[n].setAttribute(
                'onfocus',
                `refuse_${idNumbers}.checked = true;`
              );
              buttons[n].style = 'float: right; margin-right: 10px;';
            }
            buttons[0].value = 'компания';
            buttons[1].value = '2 каб.';
            buttons[2].value = 'тел.';
            buttons[3].value = 'deactivated';
            buttons[4].value = 'published';

            buttons[0].setAttribute(
              'onclick',
              `refuseCompanyAdAsPrivate(${forms[i].id})`
            );
            buttons[1].setAttribute(
              'onclick',
              `refuse2Cabinets(${forms[i].id})`
            );
            buttons[2].setAttribute(
              'onclick',
              `falseSellerInformation(${forms[i].id})`
            );
            buttons[3].setAttribute(
              'onclick',
              `inactiveDuplicate(${forms[i].id})`
            );
            buttons[4].setAttribute('onclick', `duplicate(${forms[i].id})`);

            buttons.forEach(button =>
              button.addEventListener('click', clickCounter)
            );

            forms[i].querySelector('[class|=QueueName]').style =
              'max-width: 800px';

            for (let k = 4; k >= 0; k--) {
              let place = forms[i].querySelector('[class|=QueueName]');
              place.appendChild(buttons[k]);
            }
          }
        });

        /* выделение категории */
        chrome.storage.sync.get(
          ['category', 'phone', 'IP', 'firstAd'],
          function(items) {
            if (items.category) {
              if (
                forms[i].querySelector('[name|=category_group]').value ===
                  items.category &&
                !!forms[i].querySelectorAll(
                  'img[src$="flag_new_user.gif"]'
                )[0] === items.firstAd &&
                !!forms[i].getElementsByClassName('UserData')['0'].childNodes[5]
                  .textContent === items.phone &&
                !!forms[i].querySelector('a[class|=Highlight]') === items.IP &&
                forms[i].querySelector('option[value|=s]').selected
              ) {
                forms[i].style.border = '1px solid red';
              }
            }
          }
        );

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
        if (forms[i].querySelector('[name|=category_group]').value === '2075') {
          let constantDiameter =
            forms[i].getElementsByClassName(
              'js-param js-subparam js-tires_diameter'
            )[0].lastElementChild.value ||
            forms[i].getElementsByClassName(
              'js-param js-subparam js-wheels_diameter'
            )[0].lastElementChild.value ||
            forms[i].getElementsByClassName(
              'js-param js-subparam js-caps_diameter'
            )[0].lastElementChild.value ||
            forms[i].getElementsByClassName(
              'js-param js-subparam js-st_diameter'
            )[0].lastElementChild.value;
          let constantSeason =
            forms[i].getElementsByClassName(
              'js-param js-subparam js-tires_season'
            )[0].lastElementChild.value ||
            forms[i].getElementsByClassName(
              'js-param js-subparam js-st_season'
            )[0].lastElementChild.value;
          let constantWidth =
            forms[i].getElementsByClassName(
              'js-param js-subparam js-st_width'
            )[0].lastElementChild.value ||
            forms[i].getElementsByClassName(
              'js-param js-subparam js-tires_width'
            )[0].lastElementChild.value;
          let constantHeight =
            forms[i].getElementsByClassName(
              'js-param js-subparam js-tires_height'
            )[0].lastElementChild.value ||
            forms[i].getElementsByClassName(
              'js-param js-subparam js-st_height'
            )[0].lastElementChild.value;

          forms[i].getElementsByClassName(
            'js-param js-subparam js-tires_diameter'
          )[0].lastElementChild.value = constantDiameter;
          forms[i].getElementsByClassName(
            'js-param js-subparam js-wheels_diameter'
          )[0].lastElementChild.value = constantDiameter;
          forms[i].getElementsByClassName(
            'js-param js-subparam js-caps_diameter'
          )[0].lastElementChild.value = constantDiameter;
          forms[i].getElementsByClassName(
            'js-param js-subparam js-st_diameter'
          )[0].lastElementChild.value = constantDiameter;
          forms[i].getElementsByClassName(
            'js-param js-subparam js-tires_season'
          )[0].lastElementChild.value = constantSeason;
          forms[i].getElementsByClassName(
            'js-param js-subparam js-st_season'
          )[0].lastElementChild.value = constantSeason;
          forms[i].getElementsByClassName(
            'js-param js-subparam js-st_width'
          )[0].lastElementChild.value = constantWidth;
          forms[i].getElementsByClassName(
            'js-param js-subparam js-tires_width'
          )[0].lastElementChild.value = constantWidth;
          forms[i].getElementsByClassName(
            'js-param js-subparam js-tires_height'
          )[0].lastElementChild.value = constantHeight;
          forms[i].getElementsByClassName(
            'js-param js-subparam js-st_height'
          )[0].lastElementChild.value = constantHeight;
        }
      }

      /* дописать проверку на ип/компанию + отрефакторить поиск по имени в наименовании */
      const vatNumber = forms[i].querySelector('#vat_number');
      if (vatNumber) {
        const key = `duck_${vatNumber.value}`;
        const value = sessionStorage.getItem(key);
        const sibling = forms[i].querySelector('.SmallLabel');
        const userName = forms[i].querySelector(
          'span[onclick="editAuthorName(this)"]'
        ).textContent;

        if (value) {
          const storedData = value.split('=');
          const isActive = storedData[1] === 'true';
          const node = createNode(storedData[0], vatNumber.value, isActive);

          sibling.parentNode.insertBefore(node, sibling);
        } else {
          chrome.runtime.sendMessage(
            { getDataFromEGR: vatNumber.value },
            ({ name, status }) => {
              const isActive = checkForActive(status, userName, name);
              const node = createNode(name, vatNumber.value, isActive);

              sessionStorage.setItem(key, `${name}=${isActive}`);
              sibling.parentNode.insertBefore(node, sibling);
            }
          );
        }
      }
    }

    /* Выделяет адрест ИМ, ТТ при некорректных данных */
    let w_sLink = document.getElementsByName('web_shop_link');
    let sAddress = document.getElementsByName('shop_address');

    function addHighlight(elem) {
      elem.style.background = '#CCFFCC';
    }

    function checkForActive(status, userName, name) {
      const isActiveStatus =
        status === 'Действующий' || status === 'Процедура банкротства';
      const isTitleCorrect =
        userName.search(new RegExp(name.split(' ')[0], 'i')) > -1;

      return isActiveStatus && isTitleCorrect;
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
      node.addEventListener('click', () =>
        chrome.runtime.sendMessage({ idToEGR: value })
      );

      return node;
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
    chrome.runtime.onMessage.addListener(function(
      request,
      sender,
      sendResponse
    ) {
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
          // localStorage.clickcount === null ? responseArray[26] = 0 : responseArray[26] = localStorage.clickcount; //количество за день.
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
})();
