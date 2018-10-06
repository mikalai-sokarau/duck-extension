import { clickCounter } from './clickCounter';

export const extraButtons = forms =>
  chrome.storage.sync.get(['postmoderation'], ({ postmoderation }) => {
    if (postmoderation) {
      forms.forEach(form => {
        const buttons = [];

        form.querySelector('.QueueName').style.textAligh = 'center';
        for (let n = 0; n < 5; n++) {
          const idNumbers = form.id.slice(3);

          buttons[n] = document.createElement('input');
          buttons[n].type = 'submit';
          buttons[n].className = 'postmoderation';
          buttons[n].setAttribute('onfocus', `refuse_${idNumbers}.checked = true;`);
          buttons[n].style = 'float: right; margin-right: 10px;';
        }
        buttons[0].value = 'компания';
        buttons[1].value = '2 каб.';
        buttons[2].value = 'тел.';
        buttons[3].value = 'deactivated';
        buttons[4].value = 'published';

        buttons[0].setAttribute('onclick', `refuseCompanyAdAsPrivate(${form.id})`);
        buttons[1].setAttribute('onclick', `refuse2Cabinets(${form.id})`);
        buttons[2].setAttribute('onclick', `falseSellerInformation(${form.id})`);
        buttons[3].setAttribute('onclick', `inactiveDuplicate(${form.id})`);
        buttons[4].setAttribute('onclick', `duplicate(${form.id})`);

        buttons.forEach(button => button.addEventListener('click', clickCounter));

        form.querySelector('[class|=QueueName]').style = 'max-width: 800px';

        for (let k = 4; k >= 0; k--) {
          let place = form.querySelector('[class|=QueueName]');
          place.appendChild(buttons[k]);
        }
      });
    }
  });
