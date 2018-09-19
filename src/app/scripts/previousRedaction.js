import icon from '../../assets/images/svg/arrow-right.svg';

export const previousRedaction = form => {
    try {
        const id = form.querySelector('.fine_print > a:not(.AdLink)').textContent.split('-');

        if (id[1] > 1) {
            const btn = document.createElement('a'),
                  iconWrapper = document.createElement('div'),
                  adWrapper = form.querySelector('.AdWrapper');

            iconWrapper.innerHTML = icon;
            btn.target = '_blank';
            btn.href = `https://www2.kufar.by/controlpanel?m=adqueue&queue=all&lock=0&a=show_ad&ad_id=${
                id[0]
            }&action_id=${id[1] - 1}&single=1`;
            btn.classList.add('duck-previous-redaction-btn');
            btn.appendChild(iconWrapper);
            adWrapper.insertBefore(btn, adWrapper.children[0]);
        }
    } catch (e) {
        console.log(e);
    }
};
