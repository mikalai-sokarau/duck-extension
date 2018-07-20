const currentCategorySearch = form => {
  const categoryFindButton = document.createElement('a');

  if (form.querySelector('[name|=category_group]')) {
    const form_selectValue = form.querySelector('[name|=category_group]').value;
    const emailCheck = form
      .getElementsByClassName('AdWrapper')[0]
      .getElementsByTagName('a');

    let form_userMail;

    if (emailCheck[emailCheck.length - 1].textContent === '→') {
      form_userMail = emailCheck[emailCheck.length - 2];
    } else {
      form_userMail = emailCheck[emailCheck.length - 1];
    }

    categoryFindButton.href = `https://www2.kufar.by/controlpanel?m=search&a=search&q=${form_userMail}&search_type=email&queue=&region=&category_group=${form_selectValue}&archive_group=noarchive&timespan=all&time_from=2016-09-19&time_to=2016-10-19&search=Search`;
    categoryFindButton.target = '_blank';
    categoryFindButton.appendChild(document.createTextNode('🔍'));
  }
  if (!form.querySelector('[name|=category_group]').getAttribute('onclick')) {
    form
      .querySelector('[name|=category_group]')
      .setAttribute('onclick', 'addWrongCategory(' + form.id + ')');
  }
  if (
    !form
      .getElementsByClassName('AdWrapper')[0]
      .getElementsByTagName('td')
      [
        form.getElementsByClassName('AdWrapper')[0].getElementsByTagName('td').length - 1
      ].getAttribute('onclick')
  ) {
    form
      .getElementsByClassName('AdWrapper')[0]
      .getElementsByTagName('td')
      [
        form.getElementsByClassName('AdWrapper')[0].getElementsByTagName('td').length - 1
      ].getElementsByTagName('select')[0]
      .setAttribute('onclick', 'addWrongCategory(' + form.id + ')');
    let addedPlace = form
      .getElementsByClassName('AdWrapper')[0]
      .getElementsByTagName('td');
    addedPlace[addedPlace.length - 1].appendChild(categoryFindButton);
  }
};

export default currentCategorySearch;
