export const robocopMessagesHighlighting = form => {
  const uidClass = form.getElementsByClassName('UidNoticeLink');
  
  if (uidClass[uidClass.length - 1]) {
    const roboNode = uidClass[uidClass.length - 1],
          roboText = roboNode.textContent;

    roboNode.style.margin = '0 -10px';
    roboNode.style.padding = '0 0 0 18px';
    if (
      roboText.indexOf('autoaccept_category') != -1 ||
      roboText.indexOf('user_in_whitelist') != -1 ||
      roboText.indexOf('is_private_ad') != -1 ||
      roboText.indexOf('edit-abuse_refuse_filter') != -1 ||
      roboText.indexOf('fsm:new-is_new_user:yes') !== -1
    ) {
      roboNode.style.background = '#00ccb4';
    } else if (
      roboText.indexOf('is_previous_state_refused:yes') != -1 ||
      roboText.indexOf('TERMINATOR:manual') != -1
    ) {
      roboNode.style.background = '#F7786B';
    } else if (roboText.indexOf('looks_like_company') != -1) {
      roboNode.style.background = '#9bbce4';
    } else if (roboText.indexOf('is_belarus_ip:no') != -1) {
      roboNode.style.background = '#CCFFCC';
      roboNode.style.border = '3px solid black';
    }
  }
};
