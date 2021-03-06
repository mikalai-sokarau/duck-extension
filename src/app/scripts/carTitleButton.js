import icon from '../../assets/images/svg/plus-solid.svg';

export const carTitleButton = form => {
  if (form.querySelector('[name|=category_group]').value === '2010') {
    const iconWrapper = document.createElement('div');

    iconWrapper.innerHTML = icon;
    iconWrapper.style.width = '15px';
    iconWrapper.style.display = 'inline-block';
    iconWrapper.style.cursor = 'pointer';
    iconWrapper.id = 'cars_' + form.id;
    iconWrapper.addEventListener('click', () => {
      const carsBrandText = form.querySelector('#cars_brand');
      const carsModelText = form.querySelector('#cars_level_1');
      let carBrand = '';
      let carModel = '';
      
      if (
        carsBrandText.options[carsBrandText.selectedIndex].text !== 'название марки' &&
        carsBrandText.options[carsBrandText.selectedIndex].text !== 'OTH1'
      ) {
        carBrand = ' ' + carsBrandText.options[carsBrandText.selectedIndex].text;
      }
      if (
        carsModelText.options[carsModelText.selectedIndex].text !== 'название модели' &&
        carsModelText.options[carsModelText.selectedIndex].text !== 'Другая'
      ) {
        carModel = ' ' + carsModelText.options[carsModelText.selectedIndex].text;
      }
      form.querySelector('#subj_edit').value += carBrand + carModel;
    });
    form.querySelector('#subj').appendChild(iconWrapper);
  }
};
