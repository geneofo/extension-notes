/***
 * Youtube API Functions
 */
function save2LS(str) {
    //Need to finish it
    sects = str.split("\n");
    f = sects.slice(1, sects.length).join("\n")
    write2LS(dataKey, f);
}

function write2LS(key, str) {
    //Write to local storage.
    localStorage.setItem(key, str);
}

function read2LS(key) {
    //Read to local storage.
    return localStorage.getItem(key);
}

function createButton(title, clss, div, func) {
    btn = document.createElement("button");
    btn.innerHTML = title;
    if (clss !== undefined) {
        btn.setAttribute("class", clss);
    }
    div.appendChild(btn);
    console.log("Set up event listener.");
    btn.addEventListener("click", func);
    return btn;
}

/***
 * Youtube API Functions
 */
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

function seekTo(val) {
    ytplayer = document.getElementById("movie_player");
    if (ytplayer == undefined) {
        console.log("Bad Video");
    } else {
        player.seekTo(val,true);
    }
}


/**
 * Change an absolute time in (s) timestamp to an
 * timestamp - "hh:mm:ss" / "mm:ss"
 */
function abstime_2_timestamp(absTime) {
    timeStamp = ""
    for (i = 2; i >= 0; i--) {
        if (i === 0) {
            timeStamp += ("00" + parseInt(absTime)).slice(-2);
        } else {
            let val = parseInt(absTime/((Math.pow(60,i))));
            if (!(val === 0 && i === 2)) {
                timeStamp += ('00'+val).slice(-2) + ":";
            }
        }
        absTime %= Math.pow(60, i);
    }
    return timeStamp
}

/**
 * Change an timestamp and to absolute time in (s).
 * timestamp - "hh:mm:ss" / "mm:ss"
 */
function timestamp_2_abstime(tmstmp) {
    val = 0;
    var l = tmstmp.split(":");
    for (i = l.length-1; i >= 0; i--) {
        val += parseInt(l[i]) * Math.pow(60, l.length-1 -i);
    }
    return val
}