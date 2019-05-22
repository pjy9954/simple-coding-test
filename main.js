$(document).ready(function () {
    $("#start_button").click(startClicked);
    $("#answer").change(checkAnswer);
    $("#answer").keyup(checkAnswer);
});

var stage = 1;
var startTime = 0;
var timer = 0;
var timer_status = "off";
var elapsed_time = 0;
var total_elapsed_time = 0;

function startClicked() {
    if (timer_status == "off") {
        timer_status = "on";

        getProblemFromServer(stage);
        $("#duration").show();
        $("#problem").show();
        $("#answer_box").show();
        $("#start_button").hide();

        startTime = Date.now();
        timer = setInterval(function() {
            elapsed_time = Date.now() - startTime;
            $("#timer").text(timeToStr(elapsed_time));
        }, 50);
    }
}

function timeToStr(e_t) {
    var elapsed = new Date(e_t);

    var mm = elapsed.getMinutes();
    var ss = elapsed.getSeconds();
    var zz = elapsed.getMilliseconds() / 100;

    if (mm < 10) { mm = "0" + mm }
    if (ss < 10) { ss = "0" + ss }
    zz = ("" + zz).substr(0, 1);

    return mm + ":" + ss + "." + zz;
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

        stage++;
        $("#stage").text(stage);
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

//문제 1번의 정답 : good_j0b_fr13nd!