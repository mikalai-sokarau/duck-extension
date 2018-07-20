const previousRedaction = form => {
  try {
    const adQueueId = form
      .getElementsByClassName('fine_print')[0]
      .getElementsByTagName('a');
    const adNumberAndRedaction = adQueueId[adQueueId.length - 1].innerHTML.split('-');
    if (!form.querySelector('[class|=AdLink]')) {
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
    form
      .getElementsByClassName('AdWrapper')[0]
      .insertBefore(
        previousRedactionButton,
        form.getElementsByClassName('AdWrapper')[0].children[0]
      );
  } catch (e) {
    /* do nothing */
  }
};

export default previousRedaction;
