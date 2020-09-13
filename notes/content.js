// content.js
console.log("hello")

container = document.getElementById('secondary-inner')
const element = document.createElement("div");
element.setAttribute("id", "trenplaf");
console.log(container.firstChild)
element.backgroundColor = "red"
 // and give it some content
const newContent = document.createTextNode("Hi there and greetings!\nHi there Eugene Ofori"); 
 // add the text node to the newly created div
element.appendChild(newContent); 
console.log(element)
container.insertBefore(element, container.firstChild)
/*
if (container === undefined) {
    console.log("Did not find")
} else {
    container.appendChild(element);  
    
}*/

filelabel = document.createElement("label")
fileInput = document.createElement("input");
element.appendChild(fileInput)
fileInput.setAttribute("type", "file")
fileInput.setAttribute("name", "inputfile")
fileInput.setAttribute("id", "inputfile")

output = document.createElement("pre");
element.appendChild(output)
output.setAttribute("id", "output")
  
document.getElementById('inputfile') 
    .addEventListener('change', function() { 
    console.log("Change")
    var fr=new FileReader(); 
    fr.onload=function(){ 
        document.getElementById('output') 
                .textContent=fr.result; 
    } 
    console.log(fr.result)
      
    fr.readAsText(this.files[0]); 
}) 


chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "clicked_browser_action" ) {
      var firstHref = $("a[href^='http']").eq(0).attr("href");

      console.log(firstHref);

      // This line is new!
      chrome.runtime.sendMessage({"message": "open_new_tab", "url": firstHref});
    }
  }
);

function getCurrentVideoTime() {
    ytplayer = document.getElementById("movie_player");
    if (ytplayer === undefined) {
        console.log("Bad Video");
    } else if (ytplayer.getCurrentTime === undefined) {
        console.log("Function hasn't loaded");
        return 0;
    } else {
        return ytplayer.getCurrentTime();
    }
}
console.log("Sleeping")
setTimeout(() => {  console.log("Current Time");
console.log(getCurrentVideoTime()); }, 2000);
