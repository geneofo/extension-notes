//launch.js 
dataKey = "extData";
container = document.getElementById('secondary-inner');
console.log(container);

//Application Frame
function createNotesFrame() {
    var notesFrame = document.createElement("div");
    notesFrame.setAttribute("id", "notes-frame");
    container.insertBefore(notesFrame, container.firstChild);
    return notesFrame;
}

var notesFrame = createNotesFrame();
var times = [0, 0, 0];

//load_start_window(notesFrame) //!!!!!!Need to fix notesfrme global
load_work_window();
//Load the start window
function load_start_window(notesFrame) {
    notes = document.createElement("div");
    notes.setAttribute("class", "center");
    notesFrame.appendChild(notes);
    console.log("Running");
    const uploadLabel = document.createElement("label");
    notes.appendChild(uploadLabel);
    //File Input Button
    uploadLabel.setAttribute("for", "inputfile");
    uploadLabel.setAttribute("class", "buttonUpload");
    uploadLabel.innerHTML = "Custom Upload";
    fileInput = document.createElement("input");
    notes.appendChild(fileInput);
    fileInput.setAttribute("type", "file");
    fileInput.setAttribute("name", "inputfile");
    fileInput.setAttribute("id", "inputfile");    
    document.getElementById('inputfile') .addEventListener(
                                        'change', process_file);
    newSessBtn = createButton("Start New Session", "buttonUpload", notes, 
                              load_work_window);    
    
}

function load_work_window() {
    console.log("Loading work window");
    while (notesFrame.firstChild) {
        notesFrame.removeChild(notesFrame.firstChild);
    }
    sessionsFrame = createSessionsFrame();
   /*dataFrame
    tagLineFrame
    pinFrame*/
    var itemsContainer = document.createElement("DIV");
    container.appendChild(itemsContainer);
    itemsContainer.setAttribute("id", "notes-items");
    notesFrame.appendChild(itemsContainer);
    data = {"times":[[0, 10], [20, 400000], [30, undefined]], "data":["clip9", "clip4 chicken ate the dog" +
"happy birthday are you okay no bad young money suoer trwester dp",
"Money"]}
    for (i=0; i <10; i++) {
        data["times"].push([20, 40]);
        data["data"].push("abs");
    }
    
    createTimeStamp(itemsContainer, data);
    notesFrame.appendChild(createAddBox());
    notesFrame.appendChild(createPinsBox());
}

function createTimeStamp(container, data) {
    //!!Add some alternating colour
    
    //create string with link
    //Structure
    //container
        //item-cont
            //time-cont
                //


    if (!(Object.keys(data).length === 0 && data.constructor === Object)) {
        var maxTimeLen = 0;
        for (let i=0; i < data["times"].length; i++) {
            var itemCont = document.createElement("DIV");
            itemCont.setAttribute("id", "item-cont");
            itemCont.setAttribute("class", "notes-clip-data");
            if (i%2 == 0) { //Alternate background color
                itemCont.setAttribute("class", "notes-clip-data odd-tile");
            } else {
                itemCont.setAttribute("class", "notes-clip-data even-tile");
            }
            container.appendChild(itemCont);
            //Times container
            var timesCont = document.createElement("DIV");
            timesCont.setAttribute("id", "times-cont");
            timesCont.setAttribute("class", "notes-clip-data");
            itemCont.appendChild(timesCont);

            var p = document.createElement("SPAN");
            p.setAttribute("class", "notes-clip-text");
            timesCont.appendChild(p);
            t0 = abstime_2_timestamp(data["times"][i][0]);
            if (data["times"][i][1] !== undefined) {
                var t1 = abstime_2_timestamp(data["times"][i][1]);
            } else {
                var t1 = undefined;
            }
            var linkT0 = create_link(t0);
            p.appendChild(linkT0);
            if (t1 !== undefined) {
                var linkT1 = create_link(t1);
                s = document.createTextNode(" - ");
                p.appendChild(s);
                p.appendChild(linkT1);
            }

            var p = document.createElement("P");
            p.setAttribute("class", "descrip-cont");
            p.appendChild(document.createTextNode(data["data"][i]));
            itemCont.appendChild(p);
        }
       // change_text_length(maxTimeLen);
    }
}

function createAddBox() {
    var addBox = document.createElement("DIV");
    addBox.setAttribute("class", "cntrl-add-box");
    var tagForm = document.createElement('INPUT');
    tagForm.setAttribute("id", "cntrl-add-form");
    var addButt = document.createElement('BUTTON');
    addButt.setAttribute("type", "button");
    addButt.setAttribute("class", "button-add");
    addButt.innerHTML = "<img src='images\\add.svg'>";
    addBox.appendChild(tagForm);
    addBox.appendChild(addButt);
    return addBox;
}

function createPinsBox() {
    //addBox
        //input
        //button
    var pinsBox = document.createElement("DIV");
    pinsBox.setAttribute("id", "cntrl-box");
    
    

    var tBox0 = createSetBox("cntrl-add-box0", "cntrl-pin");
    var tBox1 = createSetBox("cntrl-add-box1", "cntrl-pin");
    var tBox2 = createSetBox("cntrl-add-box2", "cntrl-pin");

    var labForm = document.createElement('p');
    labForm.setAttribute("class", "cntrl-label");
    labForm.innerHTML="Start";
    tBox0.appendChild(labForm);

    var labForm = document.createElement('p');
    labForm.setAttribute("class", "cntrl-label");
    labForm.innerHTML="End";
    tBox1.appendChild(labForm);

    var labForm = document.createElement('p');
    labForm.setAttribute("class", "cntrl-label");
    labForm.innerHTML="Point";
    tBox2.appendChild(labForm);

    createPinSet(tBox0, "pin-inpt0", "pin-btn0");
    createPinSet(tBox1, "pin-inpt1", "pin-btn1");
    createPinSet(tBox2, "pin-inpt2", "pin-btn2");

    pinsBox.appendChild(tBox0);
    pinsBox.appendChild(tBox1);
    pinsBox.appendChild(tBox2);

    return pinsBox;

}

function createSetBox(idNm, clssNm) {
    var tBox = document.createElement("DIV");
    tBox.setAttribute("id", idNm);
    tBox.setAttribute("class", clssNm);
    return tBox;
}

function createPinSet(clssBox, idForm, idButt) {
    var tagForm = document.createElement('INPUT');
    tagForm.setAttribute("id", idForm);
    var pinButt = document.createElement('BUTTON');
    pinButt.setAttribute("type", "button");
    pinButt.setAttribute("class", "button-pin");
    pinButt.setAttribute("id", idButt);
    pinButt.innerHTML = "<img src='images\\pin.svg'>";
    clssBox.appendChild(tagForm);
    clssBox.appendChild(pinButt);
}

function createTimesBox() {
    var timesBox = document.createElement("DIV");

    var t0Input = document.createElement('INPUT');
    var addButt = document.createElement('BUTTON');
    addButt.setAttribute("type", "button");
    addButt.setAttribute("class", "button-pin")
    addButt.innerHTML = "<img src='images\\pin.svg'>";

    addBox.appendChild(tagForm);
    addBox.appendChild(addButt);
    return addBox;
}


function change_text_length(len) {
    var cols = document.getElementsByClassName('times-cont');
    console.log("New length", len.toString() + "px")
    for(i = 0; i < cols.length; i++) {
        console.log(cols[i], cols[i].style.width);
        cols[i].style.width = len.toString() + "px";
    }
}

function create_link(linkText) {
    var link = document.createElement("A");
    link.setAttribute("class", "clip-link");
    link.addEventListener("click", handleclick, false);
    link.innerHTML = linkText;
    return link
}

function handleclick(event) {
    tm = timestamp_2_abstime(event.currentTarget.innerHTML)
    seekTo(tm);
}

function createSessionsFrame() {
    
    var sessionsFrame = document.createElement("DIV");
    sessionsFrame.setAttribute("class", "session-frame");
    notesFrame.appendChild(sessionsFrame);

    var lbl = document.createElement("div");
    lbl.innerHTML = "Session:";
    sessionsFrame.appendChild(lbl);
    lbl.setAttribute("class","session-lbl");
    
    var cars = ["Select Session:", "Saab", "Volvo", "BMW"];
    var customSelectFrame = document.createElement("DIV");
    sessionsFrame.appendChild(customSelectFrame);
    customSelectFrame.style.width = "200px";
    
    var sel = create_select("session-select", cars);
    customSelectFrame.appendChild(sel);
    
    customSelectFrame.setAttribute("class", "custom-select");
    create_select_dropdown();
}

function process_file() { 
    var fr=new FileReader();
    fr.onload=function() { 
        console.log("On Read.");
        //Remove the header comment
        console.log(fr.result);
        let str = fr.result;
        str = str.split("\n").slice(1, str.length).join("\n");
        save2LS(str);
    }
    fr.readAsText(this.files[0]);
}
//Save the file

function create_file_data(obj) {
    s = Date().toString() + "\n" + JSON.stringify(o, null, 4);
}

//Functionality
function m() {
    //For
    //object.addEventListener("change", myScript);

    sess = document.getElementById("id", "session-select");
    el.options[el.selectedIndex].text;
    //Send message

}

function sendMessage() {
    chrome.runtime.sendMessage({greeting: "hello"}, function(response) {
        console.log(response.farewell);
    });
}

function contentHandle(response) {
    if (response.header==="update_session") {

    } else if (response.header==="update_data") {
        
    }
}

function sendMessage() {
    chrome.runtime.sendMessage({greeting: "hello"}, function(response) {
        console.log(response.farewell);
    });
}
/*
function contentHandle(response) {
    if (respon)
}*/

