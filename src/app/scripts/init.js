export const init = (words) => {
  chrome.storage.sync.get(['descriptionSearch', 'store'], ({ descriptionSearch, store }) => {
    if (descriptionSearch) {
        // const text = form.querySelector('body_area');
        words.push(...store.split('*duck*'));
    }
  });
}
