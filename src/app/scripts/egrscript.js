if (/http:\/\/egr.gov.by/.test(window.location.href)) {
  chrome.runtime.sendMessage({ greeting: 'giveData' }, ({ farewell }) => {
    if (farewell) {
      document.getElementsByName('ngrn')[0].value = farewell;

      const amount = document.getElementById('txtCaptchaDiv').innerHTML;
      document.getElementById('txtInput').value = amount;

      if (sessionStorage.getItem('check') && sessionStorage.getItem('check') == 'true') {
        document.getElementsByName('fndform')[0].submit();
        sessionStorage.setItem('check', 'false');
      } else if (sessionStorage.getItem('check') == 'false') {
        //doing nothing
      } else {
        document.getElementsByName('fndform')[0].submit();
        sessionStorage.setItem('check', 'false');
      }
    }
  });
}
