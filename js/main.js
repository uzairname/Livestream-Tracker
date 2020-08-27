var running = false;
var waiting = false;

var currentText;

var data = [];

var i = 0;

function toggleClicked() {
    updateButton(!running);
    if (running) {
        run("button", 1000*parseInt(document.getElementById("time-interval").value), 1000*parseInt(document.getElementById("total-time").value));
    }
}

function updateButton(setRunning) {
    running = setRunning;

    document.getElementById("info-text").innerHTML = running ? "started" : "stopped";
    document.getElementById("startstop").innerHTML = running ? "stop" : "start";
}

var para;
var text;
function run(from, timeInterval, totalTime) {

    if (waiting === (from === "button")) {
        console.log("rejected");
        return;
    }
    waiting = true;
    console.log(true);

    var count = Math.floor(totalTime*1.0 / timeInterval);
    console.log(count);

    setTimeout(function () {
        if (i < count && running) {
            getCurrentViewers().then(function () {
                i++;
                document.getElementById("info-text").innerHTML = "Request " + i + " of " + count;
                run("repeat", timeInterval, totalTime);
            });
        } else {
            para = document.createElement("div");
            text = document.createElement("p");
            text.innerHTML = (i >= count) ? "finished(" + i + "/" + count + ")\n" : "canceled (" + i + "/" + count + ")\n";
            para.appendChild(text);
            para.setAttribute("class", "no-copy"); para.setAttribute("style", "font-weight: bold; padding-bottom:3px");
            document.getElementById("times").appendChild(para);


            para = document.createElement("div");
            text = document.createElement("p");
            text.innerHTML = "⸻⸻\n";
            para.appendChild(text);
            para.setAttribute("class", "no-copy"); para.setAttribute("style", "font-weight: bold; padding-bottom:3px");
            document.getElementById("values").appendChild(para);


            updateButton(false);
            waiting = false;
            console.log(false);
            i = 0;
        }
    }, timeInterval);
}

//function to get number of viewers random int temporary placeholder
function getCurrentViewers() {
    return Math.floor(Math.random()*10);
}
