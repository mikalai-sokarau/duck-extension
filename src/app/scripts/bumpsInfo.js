import icon from '../../assets/images/svg/bitcoin.svg';

const TIME = {
    TODAY: new Date(),
    DAY: 1000 * 60 * 60 * 24,
    WEEK: 1000 * 60 * 60 * 24 * 7,
    MONTH: 1000 * 60 * 60 * 24 * 31
}

const BUMPS_DURATION = {
    bump: TIME.DAY,
    daily_bump: TIME.WEEK,
    weekly_bump: TIME.MONTH,
    polepos: TIME.DAY * 3,
    polepos_day: TIME.DAY,
    highlight: TIME.WEEK,
    ribbons: TIME.WEEK,
    express: TIME.WEEK,
    seasonal: TIME.WEEK,
    turbo: TIME.WEEK,
}

const APPROVED_STATUS = 'accepted';
const APPROVED_REVIEW_QUEUE = 'normal';

export const bumpsInfo = form => {
    const parser = new DOMParser();
    const adId = form
        .querySelector('.fine_print a[target="_blank"]')
        .textContent
        .split('-')[0];

    fetch(`https://www2.kufar.by/controlpanel?m=search&a=ad_history&ad_id=${adId}&popup=`)
        .then(res => res.text())
        .then(text => parser.parseFromString(text, 'text/html'))
        .then(page => {
            const isBump = Array.from(page.querySelectorAll('tr'))
                                .reverse()
                                .some(findActiveBump);
            
            if (isBump) {
                addBumpIcon(form);
            }
        })
        .catch(err => console.log(err));
};

function addBumpIcon(form) {
    const elem = document.createElement('div');
    const adWrapper = form.querySelector('.AdWrapper');
    
    adWrapper.style.position = 'relative';
    elem.style.width = '15px';
    elem.style.position = 'absolute';
    elem.style.top = '25px';
    elem.style.right = '0';
    elem.innerHTML = icon;
    adWrapper.appendChild(elem);
}

function findActiveBump (row) {
    const cells = row.querySelectorAll('td');
    let date, action, status, reviewQueue;

    if (cells.length) {
        date = new Date(cells[0].textContent);
        action = cells[1].textContent;
        status = cells[3].textContent;
        reviewQueue = cells[5].textContent;
    }
    
    action = action.startsWith('ribbons') ? 'ribbons' : action;

    return (
        status === APPROVED_STATUS && 
        reviewQueue === APPROVED_REVIEW_QUEUE &&
        TIME.TODAY - date < BUMPS_DURATION[action]
    )
}
