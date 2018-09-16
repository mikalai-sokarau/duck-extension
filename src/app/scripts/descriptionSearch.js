export const descriptionSearch = form => {
  chrome.storage.sync.get(['descriptionSearch'], ({ descriptionSearch }) => {
      if (descriptionSearch) {
          const text = form.querySelector('body_area');
          
      }
    }
  );
}
