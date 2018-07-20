// Save options to chrome.storage.sync.
function save_options() {
  let isPostmoderation = document.getElementById('postmoderation').checked;
  let isTimerOn = document.getElementById('timer').checked;
  let clicker = document.getElementById('clicker').checked;
  chrome.storage.sync.set({
    'postmoderation': isPostmoderation,
    'timer': isTimerOn,
    'clicker': clicker
  }, function() {
    // Update status to let user know options were saved.
    let status = document.getElementById('status');
    status.style.visibility = 'visible';
    setTimeout(function() {
      status.style.visibility = 'hidden';
    }, 750);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  chrome.storage.sync.get([
    'postmoderation',
    'timer',
    'clicker'
  ], function(items) {
    document.getElementById('postmoderation').checked = items.postmoderation;
    document.getElementById('timer').checked = items.timer;
    document.getElementById('clicker').checked = items.clicker;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
