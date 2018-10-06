export const descriptionSearch = forms => {
    try {
        chrome.storage.sync.get(
        ['descriptionSearch', 'store'],
        ({ descriptionSearch, store }) => {
            if (descriptionSearch) {
                const re = new RegExp(store.split('*duck*').join('|'), 'gi');

                forms.forEach(form => {
                    const description = form.querySelector('#body');

                    description.innerHTML = description.innerHTML.replace(
                        re,
                        matched => `<span class="duck-highlighted">${matched}</span>`
                    );
                });
            }
        });
    } catch (e) {
        console.log(e);
    }
};
