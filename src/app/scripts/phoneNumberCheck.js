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

export const phoneNumberCheck = form => {
  try {
    const currentPhoneNumber = form.querySelector('[class|=UserData]').children[2]
      .textContent;
    const fixedNumber = String(currentPhoneNumber.replace(/\D+/g, ''));
    const phoneSpan = document.createElement('span');

    phoneSpan.innerHTML = currentPhoneNumber;
    phoneSpan.style =
      fixedNumber.length < 9
        ? 'color: red; font-weight: bold;'
        : 'color: blue; font-weight: bold;';
    if (!checkNumber(fixedNumber)) {
      phoneSpan.style = 'color: red; font-weight: bold;';
    }
    if (fixedNumber.length > 17) {
      phoneSpan.style = 'color: #339900; font-weight: bold;';
    }
    form.querySelector('[class|=SmallLabel]').appendChild(phoneSpan);
  } catch (e) {}
};

function checkNumber(numb) {
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
