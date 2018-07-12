//Посылает запрос в contentscript.js, получает количество проверенных объявлений.
chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  chrome.tabs.sendMessage(tabs[0].id, {msg: "getAmount"}, function(response) {
      document.getElementById('currentHourResult').innerHTML = response.farewell[24];
      document.getElementById('lastHourResult').innerHTML = response.farewell[25];
      document.getElementById('allDayResult').innerHTML = response.farewell[26];
      if (document.getElementById('hours') != null){
          for(var i = 0; i < 24; i++){
              if(!isNaN(parseFloat(response.farewell[i])) && isFinite(response.farewell[i]) && response.farewell[i] > 0){
                  if(i < 9){
                      document.getElementById("div" + (i).toString()).innerHTML = "0" + i + ":00-0" + (i + 1) + ":00 - " + response.farewell[i];
                      continue;
                  }
                  if(i == 9){
                      document.getElementById("div" + (i).toString()).innerHTML = "0" + i + ":00-" + (i + 1) + ":00 - " + response.farewell[i];
                      continue;
                  }
                  if(i == 23){
                      document.getElementById("div" + (i).toString()).innerHTML = i + ":00-00:00 - " + response.farewell[i];
                      continue;
                  }
                  document.getElementById("div" + (i).toString()).innerHTML = i + ":00-" + (i + 1) + ":00 - " + response.farewell[i];
              }
          }
      }
  });
});