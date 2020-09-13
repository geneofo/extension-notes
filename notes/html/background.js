function sendNewTabRequest(tab) {
    sendMessage({active: true, currentWindow: true})
}

function sendMessage(msgObj) {
  // Send a message to the active tab
  console.log("BG - Sending message", JSON.stringify(msgObj));
  chrome.tabs.query(msgObj, respondTomessage);
}

function respondTomessage(tabs) {
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, {"message": "clicked_browser_action"});
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {

    if( request.message === "open_new_tab" ) {

    }
  }
);