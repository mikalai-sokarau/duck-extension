const wrongCompanyDataHighlighting = () => {
  document.getElementsByName('web_shop_link').forEach(node => {
    const value = node.value.toLowerCase();

    if (
      value.indexOf('.by') === -1 &&
      value.indexOf('.бел') === -1 &&
      value.length !== 0
    ) {
      addHighlight(node);
    }
  });

  document.getElementsByName('shop_address').forEach(node => {
    const value = node.value.toLowerCase();

    if (
      (value.indexOf('.by') ||
        value.indexOf('.ru') ||
        value.indexOf('.com') ||
        value.indexOf('.бел') ||
        value.indexOf('.org') ||
        value.indexOf('.рф') ||
        value.indexOf('.net')) !== -1 &&
      value.length !== 0
    ) {
      addHighlight(node);
    }
  });
};

function addHighlight(elem) {
  elem.style.background = '#CCFFCC';
}

export default wrongCompanyDataHighlighting;
