// background.js

// Called when the user clicks on the browser action.
console.log("hello")

chrome.browserAction.onClicked.addListener(sendNewTabRequest);

function sendNewTabRequest(tab) {
    sendMessage({header:"task0", payload:"{1,2,3}"});
}

function sendMessage(msgObj) {
  // Send a message to the active tab
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, msgObj);
    }
  );
}

// This block is new!
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log("BG - Received Msg", request.header);
    if( request.header === "open_new_tab" ) {

    }
  }
);