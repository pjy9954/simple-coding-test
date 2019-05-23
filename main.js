$(document).ready(function () {
    $("#start_button").click(startClicked);
    $("#answer").change(checkAnswer);
    $("#answer").keyup(checkAnswer);
    $(window).bind('beforeunload', beforeUnloadHandler);
});

function beforeUnloadHandler() {
    return '페이지에서 벗어날경우 기록은 유지되지만 1번문제부터 다시 시작하게 됩니다.';
}

var stage = 1;
var start_time = 0;
var timer = 0;
var timer_status = "off";
var elapsed_time = 0;
var total_elapsed_time = 0;

function startClicked() {
    start_time = getCookie("start_time");
    if (timer_status == "off") {
        timer_status = "on";

        getProblemFromServer(stage);
        $("#duration").show();
        $("#problem").show();
        $("#answer_box").show();
        $("#start_button").hide();

        if (start_time == null) {
            start_time = Date.now();
            setCookie("start_time", start_time, 7);
        }

        timer = setInterval(function () {
            elapsed_time = Date.now() - start_time;
            $("#timer").text(timeToStr(elapsed_time));
        }, 50);
    }
}

function timeToStr(e_t) {
    var elapsed = new Date(e_t);

    var hh = elapsed.getUTCHours();
    var mm = elapsed.getUTCMinutes();
    var ss = elapsed.getUTCSeconds();
    var zz = elapsed.getUTCMilliseconds() / 100;

    if (hh > 0) {
        if (hh < 10) { hh = "0" + hh }
        hh = hh + ":";
    }
    else {
        hh = ""
    }

    if (mm < 10) { mm = "0" + mm }
    if (ss < 10) { ss = "0" + ss }
    zz = ("" + zz).substr(0, 1);

    return hh + mm + ":" + ss + "." + zz;
}

function stop() {
    clearInterval(timer);
}

function getProblemFromServer(stage) {
    switch (stage) {
        case 1:
            $("#problem").load("./problem1.html");
            break;
        case 2:
            $("#problem").load("./problem2.html");
            break;
        case 3:
            $("#problem").load("./problem3.html");
            break;
    }
}

function checkAnswer() {
    var answer = $(this).val();
    if (isRightAnswer(stage, answer)) {
        var record_txt = $("#timer").text();
        $("<li>" + stage + "단계 : " + record_txt + "</li>").insertBefore("#total_score");

        total_elapsed_time += elapsed_time;
        $("#total_score").text("총합 : " + timeToStr(total_elapsed_time));

        $("#total_score").show();
        $("#duration").hide();
        $("#answer_box").hide();
        $("#problem").hide();
        $("#start_button").show();

        alert(stage + "단계 통과를 축하합니다!");

        $(this).val("");
        timer_status = "off";
        stop();
        
        if (stage != 3) {
            stage++;
            $("#stage").text(stage);
        }
        else {
            alert("모든 문제를 해결하셨습니다. 축하드립니다!");
        }
    }
}

function isRightAnswer(stage, answer) {
    switch (stage) {
        case 1:
            if (md5(answer).toUpperCase() == "E568C4F1269887B303C51334EA43089F") return true;
            break;
        case 2:
            if (md5(answer).toUpperCase() == "B801A017DED532559339BAC9672AFFF5") return true;
            break;
        case 3:
            if (md5(answer).toUpperCase() == "EB2373CFD7038C494F322E7D24FCD4D1") return true;
            break;
    }

    return false;
}

function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}
function eraseCookie(name) {
    document.cookie = name + '=; Max-Age=-99999999;';
}

//answer of problem No.1 : good_j0b_fr13nd!