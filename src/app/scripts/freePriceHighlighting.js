const freePriceHighlighting = form => {
  if (form.querySelector('[id|=remuneration_type1]').checked) {
    try {
      const range = document.createRange();
      const aim = form.querySelector('[id|=remuneration_type1]').nextSibling;
      range.setStart(aim, 0);
      range.setEnd(aim, aim.length - 1);
      const highlightDiv = document.createElement('span');
      highlightDiv.style.color = 'red;';
      range.surroundContents(highlightDiv);
    } catch (e) {
      //do nothing
    }
  }
};

export default freePriceHighlighting;
