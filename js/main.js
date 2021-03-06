var running = false;
var waiting = false;

var currentText;
var authenticated = 0
var data = [];
var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var dateTime = date+' '+time;
var i = 0;
console.log("Last restarted: " + time);
console.log("REMINDER FOR INIMICALPART: TIME ABOVE IS NOT THE TIME SINCE REBOOT, FIND OUT AND FIX ISSUE");

//<<<<<<< HEAD

//=======
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
            execute().then(function () {
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

function load() {

    gapi.load("client:auth2", function() {
        gapi.auth2.init({client_id: "184134997783-hg6clikhn40ekh5jugqssma3nre9a03m.apps.googleusercontent.com"});
    });

    document.getElementById("load-btn").innerHTML = "Loaded!";
}

function authenticate() {
//if (authenticated = "1") { 
//            console.log("Already signed in!");
//            document.getElementById("signin-text").innerHTML = "You are already signed in!";
//            document.getElementById("signin-text").style.color = "red";
//} else {
    return gapi.auth2.getAuthInstance()
        .signIn({scope: "https://www.googleapis.com/auth/youtube.readonly"})
        .then(function() {
            console.log("Sign-in successful");
            document.getElementById("signin-text").innerHTML = "Sign in successful";
            document.getElementById("signin-text").style.color = "green";
            var authenticated = 1
        }, function(err) {
            console.error("Error signing in", err);
            document.getElementById("signin-text").innerHTML = "Error signing in";
            document.getElementById("signin-text").style.color = "red";
            var authenticated = 0
        });
//    }
}

function loadClient() {
    gapi.client.setApiKey("AIzaSyChuEvw1Ii6dMd2dhYlPfLCH49jtRe-CZk");
    return gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
        .then(function() {
            console.log("GAPI client loaded for API");
        }, function(err) {
            console.error("Error loading GAPI client for API", err);
        });
}

// Make sure the client is loaded and sign-in is complete before calling this method.
function execute() {
    return gapi.client.youtube.videos.list({
        "part": ["liveStreamingDetails"],
        "id": ["PL-GXzQU_x0"]
    }).then(function(response) {

        data.push([response.headers.date, response.result.items[0].liveStreamingDetails.concurrentViewers]);

        text = document.createElement("p");
        text.innerHTML = response.headers.date + "\n";
        document.getElementById("times").appendChild(text);

        text = document.createElement("p");
        text.innerHTML = response.result.items[0].liveStreamingDetails.concurrentViewers + "\n";
        document.getElementById("values").appendChild(text);

    }, function(err) {
        console.error("Error in API request", err);
    });
}
