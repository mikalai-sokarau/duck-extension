if (/http:\/\/egr.gov.by/.test(window.location.href)) {
    console.log("in Egr");
    
    var data;
    
    chrome.runtime.sendMessage({greeting: "giveData"}, function(response) {
        data = response.farewell;
        console.log(response.farewell);
        if(data !== undefined) {
            main();
        }
        
    });
            
    function main(){
     document.getElementsByName("ngrn")[0].value = data;
        
        var amount = document.getElementById("txtCaptchaDiv").innerHTML;
        document.getElementById("txtInput").value = amount;
        
        if(sessionStorage.getItem("check") && sessionStorage.getItem("check") == "true"){
            document.getElementsByName("fndform")[0].submit();
            sessionStorage.setItem("check", "false");
        } else if (sessionStorage.getItem("check") == "false") {
            //doing nothing
        } else {
            document.getElementsByName("fndform")[0].submit();
            sessionStorage.setItem("check", "false");
        }
    }
}