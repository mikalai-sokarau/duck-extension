const wheelsDataSynchronizing = form => {
  if (form.querySelector('[name|=category_group]').value === '2075') {
    const constantDiameter =
      form.getElementsByClassName('js-param js-subparam js-tires_diameter')[0]
        .lastElementChild.value ||
      form.getElementsByClassName('js-param js-subparam js-wheels_diameter')[0]
        .lastElementChild.value ||
      form.getElementsByClassName('js-param js-subparam js-caps_diameter')[0]
        .lastElementChild.value ||
      form.getElementsByClassName('js-param js-subparam js-st_diameter')[0]
        .lastElementChild.value;
    const constantSeason =
      form.getElementsByClassName('js-param js-subparam js-tires_season')[0]
        .lastElementChild.value ||
      form.getElementsByClassName('js-param js-subparam js-st_season')[0].lastElementChild
        .value;
    const constantWidth =
      form.getElementsByClassName('js-param js-subparam js-st_width')[0].lastElementChild
        .value ||
      form.getElementsByClassName('js-param js-subparam js-tires_width')[0]
        .lastElementChild.value;
    const constantHeight =
      form.getElementsByClassName('js-param js-subparam js-tires_height')[0]
        .lastElementChild.value ||
      form.getElementsByClassName('js-param js-subparam js-st_height')[0].lastElementChild
        .value;

    form.getElementsByClassName(
      'js-param js-subparam js-tires_diameter'
    )[0].lastElementChild.value = constantDiameter;
    form.getElementsByClassName(
      'js-param js-subparam js-wheels_diameter'
    )[0].lastElementChild.value = constantDiameter;
    form.getElementsByClassName(
      'js-param js-subparam js-caps_diameter'
    )[0].lastElementChild.value = constantDiameter;
    form.getElementsByClassName(
      'js-param js-subparam js-st_diameter'
    )[0].lastElementChild.value = constantDiameter;
    form.getElementsByClassName(
      'js-param js-subparam js-tires_season'
    )[0].lastElementChild.value = constantSeason;
    form.getElementsByClassName(
      'js-param js-subparam js-st_season'
    )[0].lastElementChild.value = constantSeason;
    form.getElementsByClassName(
      'js-param js-subparam js-st_width'
    )[0].lastElementChild.value = constantWidth;
    form.getElementsByClassName(
      'js-param js-subparam js-tires_width'
    )[0].lastElementChild.value = constantWidth;
    form.getElementsByClassName(
      'js-param js-subparam js-tires_height'
    )[0].lastElementChild.value = constantHeight;
    form.getElementsByClassName(
      'js-param js-subparam js-st_height'
    )[0].lastElementChild.value = constantHeight;
  }
};

export default wheelsDataSynchronizing;
