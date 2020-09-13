// content.js
chrome.runtime.onMessage.addListener(processMessage);

function processMessage(request, sender, sendResponse) {
    console.log("Content - Received Msg", request.payload);
    console.log(JSON.stringify(request.header));
    if(request.header === "clicked_browser_action") {
        sendAMessage({"message": "open_new_tab"});
      
    }
 }
function sendAMessage(msgobj) {
    // This line is new!
     chrome.runtime.sendMessage(msgobj);
}