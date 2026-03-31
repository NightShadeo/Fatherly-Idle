"use strict";


let userName = defaultSettings.userName;
let userReps = defaultSettings.userReps;

let daysLevel = defaultSettings.daysLevel;
let daysPrest = defaultSettings.daysPrest;
let strengthLevel = defaultSettings.strengthLevel;
let strengthPrest = defaultSettings.strengthPrest;
let benchLevel = defaultSettings.benchLevel;
let benchPrest = defaultSettings.benchPrest;
let squatLevel = defaultSettings.squatLevel;
let squatPrest = defaultSettings.squatPrest;
let deadliftLevel = defaultSettings.deadliftLevel;
let deadliftPrest = defaultSettings.deadliftPrest;
let rowLevel = defaultSettings.rowLevel;
let rowPrest = defaultSettings.rowPrest;

let benchStatIncrease = defaultSettings.benchStatIncrease;
let squatStatIncrease = defaultSettings.squatStatIncrease;
let deadliftStatIncrease = defaultSettings.deadliftStatIncrease;
let rowStatIncrease = defaultSettings.rowStatIncrease;
let clickReps = defaultSettings.clickReps;
let clickBase = defaultSettings.clickBase;
let clickGrowth = defaultSettings.clickGrowth;

let preCharges = defaultSettings.preCharges;
let userStrength = [...defaultSettings.userStrength];

let strengthTotalLevel;
let strengthRepsCost;
let daysTotalLevel;
let daysRepsCost;
let benchTotalLevel;
let benchRepsCost;
let benchSquatCost;
let squatTotalLevel;
let squatRepsCost;
let squatRowCost;
let deadliftTotalLevel;
let deadliftRepsCost;
let deadliftBenchCost;
let rowTotalLevel;
let rowRepsCost;
let rowDeadliftCost;
let preRepsCost;
let strengthBonus;
let clickUpgradeValue;

$(document).ready(() => {

      //Save / load game functions
    loadGame();
    recalcUpgradeValues();
    refreshScreen();
    // Any screen text or HTML modification
    function refreshScreen() {
        $("#user-name").text(userName);
        $("#user-reps").text(Math.round(userReps));

        $("#days").attr("value", daysLevel);
        $("#days").next("span").text(Math.round(daysPrest));

        $("#preworkout").attr("value", preCharges);

        $("#strength").attr("value", strengthLevel);
        $("#strength").next("span").text(Math.round(strengthPrest));

        $("#bench").attr("value", benchLevel);
        $("#bench").next("span").text(Math.round(benchPrest));

        $("#squat").attr("value", squatLevel);
        $("#squat").next("span").text(Math.round(squatPrest));
        
        $("#deadlift").attr("value", deadliftLevel);
        $("#deadlift").next("span").text(Math.round(deadliftPrest));
        
        $("#row").attr("value", rowLevel);
        $("#row").next("span").text(Math.round(rowPrest));
        
        $("#daysUp").find(".reps-cost").text(Math.round(daysRepsCost));
        $("#strengthUp").find(".reps-cost").text(Math.round(strengthRepsCost));
        $("#strengthUp").find(".upgrade-value").text(clickUpgradeValue);
        $("#preworkoutUp").find(".reps-cost").text(Math.round(preRepsCost));
        $("#benchUp").find(".reps-cost").text(Math.round(benchRepsCost));
        $("#squatUp").find(".reps-cost").text(Math.round(squatRepsCost));
        $("#deadliftUp").find(".reps-cost").text(Math.round(deadliftRepsCost));
        $("#rowUp").find(".reps-cost").text(Math.round(rowRepsCost));

        $("#benchUp").find(".muscle-cost").text(Math.round(benchSquatCost));
        $("#squatUp").find(".muscle-cost").text(Math.round(squatRowCost));
        $("#deadliftUp").find(".muscle-cost").text(Math.round(deadliftBenchCost));
        $("#rowUp").find(".muscle-cost").text(Math.round(rowDeadliftCost));

        $("#0").text(userStrength[0].toFixed(1));
        $("#1").text(userStrength[1].toFixed(1));
        $("#2").text(userStrength[2].toFixed(1));
        $("#3").text(userStrength[3].toFixed(1));   
    };

    function recalcUpgradeValues() {
        strengthTotalLevel = strengthLevel + (strengthPrest * Number($("#strength").attr("max")));
        daysTotalLevel = daysLevel + (daysPrest * Number($("#days").attr("max")));
        benchTotalLevel = benchLevel + (benchPrest * Number($("#bench").attr("max")));
        squatTotalLevel = squatLevel + (squatPrest * Number($("#squat").attr("max")));
        deadliftTotalLevel = deadliftLevel + (deadliftPrest * Number($("#deadlift").attr("max")));
        rowTotalLevel = rowLevel + (rowPrest * Number($("#row").attr("max")));

        strengthRepsCost = strengthBaseCost * Math.pow(addedCost, strengthTotalLevel);
        daysRepsCost = ((daysLevel + 1 + (daysPrest * Number($("#days").attr("max")))) * (daysBaseCost * addedCost));
        preRepsCost = preBaseCost;
        benchRepsCost = benchBaseCost * Math.pow(addedCost, benchTotalLevel);
        benchSquatCost = (benchTotalLevel * (benchBaseCost * addedCost)) * repMuscleMult;

        clickUpgradeValue = Math.max(clickReps +1, Math.floor(clickBase * Math.pow(clickGrowth, strengthTotalLevel + 1))) - clickReps;

        squatRepsCost = squatBaseCost * Math.pow(addedCost, squatTotalLevel);
        squatRowCost = (squatTotalLevel * (squatBaseCost * addedCost)) * repMuscleMult;

        deadliftRepsCost = deadliftBaseCost * Math.pow(addedCost, deadliftTotalLevel);
        deadliftBenchCost = (deadliftTotalLevel * (deadliftBaseCost * addedCost)) * repMuscleMult;

        rowRepsCost = rowBaseCost * Math.pow(addedCost, rowTotalLevel);
        rowDeadliftCost = (rowTotalLevel * (rowBaseCost * addedCost)) * repMuscleMult;
    };

 

    function updateStats() {
        $("#user-reps").text(Math.round(userReps));
        $("#0").text(userStrength[0].toFixed(1));
        $("#1").text(userStrength[1].toFixed(1));
        $("#2").text(userStrength[2].toFixed(1));
        $("#3").text(userStrength[3].toFixed(1)); 
    };

    // Any runtime logic
    function gameTick() {

        strengthTotalLevel = strengthLevel + (strengthPrest * $("#strength").attr("max"));
        benchTotalLevel = benchLevel + (benchPrest * $("#bench").attr("max"));
        squatTotalLevel = squatLevel + (squatPrest * $("#squat").attr("max"));
        deadliftTotalLevel = deadliftLevel + (deadliftPrest * $("#deadlift").attr("max"));
        rowTotalLevel = rowLevel + (rowPrest * $("#row").attr("max"));
        daysTotalLevel = daysLevel + (daysPrest * $("#days").attr("max"));

        strengthBonus = strengthTotalLevel * 0.05;

        if (preCharges > 0) {
            strengthBonus *= 2;
            preCharges -= 1;
        };
        
        userStrength[0] += upgradePercent * (benchLevel + (benchTotalLevel));
        userStrength[1] += upgradePercent * (squatLevel + (squatTotalLevel));
        userStrength[2] += upgradePercent * (deadliftLevel + (deadliftTotalLevel));
        userStrength[3] += upgradePercent * (rowLevel + (rowTotalLevel));

        // for (let i = 0; i < userStrength.length; i++) {
        //     userStrength[i] = Math.round(userStrength[i] * 100) / 100;
        // }

        userReps += daysTotalLevel;
        // console.log("Tick", userStrength[0]);
        refreshScreen();
        updateStats();
        // console.log({
        //     daysRepsCost,
        //     strengthRepsCost,
        //     preRepsCost,
        //     benchRepsCost,
        //     benchSquatCost,
        //     squatRepsCost,
        //     squatRowCost,
        //     deadliftRepsCost,
        //     deadliftBenchCost,
        //     rowRepsCost,
        //     rowDeadliftCost
        // });
    };

  
    
    $("#save-button").click(saveGame);
    $("#reset-button").click(resetSave);



    $('#cheat-toggle').click(function () {
        $('.cheat-menu-container').toggleClass('open');
    });
    
    $(".menu-button").click(function () {
        const cheatChoice = $(this).attr("id"); 

        switch(cheatChoice) {
            case "give-money":
                userReps += 100000;
                for (let i = 0; i < userStrength.length - 1; i++) {
                    userStrength[i] += 100000;
                }
                userStrength[4] = userReps;
                break;
            case "give-bench":
                userStrength[0] += 100;
                break;
            case "give-squat":
                userStrength[1] += 100;
                break;
            case "give-deadlift":
                userStrength[2] += 100;
                break;
            case "give-row":
                userStrength[3] += 100;
                break;
            case "give-reps":
                userReps += 1000
                break;
                }
                updateStats();
    });

    let totalLevel = daysTotalLevel + strengthTotalLevel + benchTotalLevel +
                squatTotalLevel + deadliftTotalLevel + rowTotalLevel;
    $("#user-level").text(totalLevel);

    refreshScreen();

    $(".upgrade").click(function () {
        const upgradeChoice = $(this).attr("id");
        switch (upgradeChoice) {
            case "daysUp":
                if (userReps < daysRepsCost) {
                    break;
                } else {
                    daysLevel += 1;
                    daysTotalLevel = daysLevel + (daysPrest * $("#days").attr("max"));
                    userReps -= daysRepsCost;
                    daysRepsCost = (daysTotalLevel * (daysBaseCost * addedCost));
                    break;
                }
            case "strengthUp":
                if (userReps < strengthRepsCost) {
                    break;
                }
                userReps -= strengthRepsCost;
                strengthLevel += 1;
                strengthTotalLevel = strengthLevel + (strengthPrest * $("#strength").attr("max"));
                strengthRepsCost = strengthRepsCost = Math.floor(strengthBaseCost * Math.pow(addedCost, strengthTotalLevel));
                clickReps = Math.max(clickReps +1, Math.floor(clickBase * Math.pow(clickGrowth, strengthTotalLevel)));
                recalcUpgradeValues();
                refreshScreen();
                break;
            case "preworkoutUp":
                if (userReps < preBaseCost) {
                    break;
                }
                userReps -= preBaseCost;
                preCharges = 200;
                break;
            case "benchUp":
                if ((userStrength[1] >= benchSquatCost) && (userReps >= benchRepsCost)) {
                    userReps -= benchRepsCost;
                    userStrength[1] -= benchSquatCost;
                    benchLevel += 1;
                    benchTotalLevel = benchLevel + (benchPrest * $("#bench").attr("max"));
                    benchRepsCost = benchBaseCost * Math.pow(addedCost, benchTotalLevel);
                    benchSquatCost = (benchTotalLevel * (benchBaseCost * addedCost)) * repMuscleMult;
                    benchStatIncrease *= 2;
                    break;
                } else {
                    break;
                }    
            case "squatUp":
                if ((userStrength[3] >= squatRowCost) && (userReps >= squatRepsCost)) {
                    userReps -= squatRepsCost;
                    userStrength[3] -= squatRowCost;
                    squatLevel += 1;
                    squatTotalLevel = squatLevel + (squatPrest * $("#squat").attr("max"));
                    squatRepsCost = squatBaseCost * Math.pow(addedCost, squatTotalLevel);
                    squatRowCost = (squatTotalLevel * (squatBaseCost * addedCost)) * repMuscleMult;
                    squatStatIncrease *=2;
                    break;
                } else {
                    break;
                }
            case "deadliftUp":
                if ((userStrength[0] >= deadliftBenchCost) && (userReps >= deadliftRepsCost)) {
                    userReps -= deadliftRepsCost;
                    userStrength[0] -= deadliftBenchCost;
                    deadliftLevel += 1;
                    deadliftTotalLevel = deadliftLevel + (deadliftPrest * $("#deadlift").attr("max"));
                    deadliftRepsCost = deadliftBaseCost * Math.pow(addedCost, deadliftTotalLevel);
                    deadliftBenchCost = (deadliftTotalLevel * (deadliftBaseCost * addedCost)) * repMuscleMult;
                    deadliftStatIncrease *=2;
                    break;
                } else {
                    break;
                }
         
            case "rowUp":
                if ((userStrength[2] >= rowDeadliftCost) && (userReps >= rowRepsCost)) {
                    userReps -= rowRepsCost;
                    userStrength[2] -= rowDeadliftCost;
                    rowLevel += 1;
                    rowTotalLevel = rowLevel + (rowPrest * $("#row").attr("max"));
                    rowRepsCost = rowBaseCost * Math.pow(addedCost, rowTotalLevel);
                    rowDeadliftCost = (rowTotalLevel * (rowBaseCost * addedCost)) * repMuscleMult;
                    rowStatIncrease *=2;
                    break;
                } else {
                    break;
                }
            default:
                console.log(upgradeChoice);
                break;
        }

        switch (true) {
            case (totalLevel < 20):
                userName = levelRanks[0];
                break;
            case (totalLevel < 30):
                userName = levelRanks[1];
                break;
            case (totalLevel < 50):
                userName = levelRanks[2];
                break;
            case (totalLevel < 60):
                userName = levelRanks[3];
                break;
            case (totalLevel < 80):
                userName = levelRanks[4];
                break;
            case (totalLevel < 99):
                userName = levelRanks[5];
                break;
            case (totalLevel < 120):
                userName = levelRanks[6];
                break;
            case (totalLevel >= 120):
                userName = levelRanks[7];
                break;
        }

        $("#user-name").text(userName);

        totalLevel = daysTotalLevel + strengthTotalLevel + benchTotalLevel +
                squatTotalLevel + deadliftTotalLevel + rowTotalLevel;
        $("#user-level").text(totalLevel);

        refreshScreen();

        if ($("#days").val() == $("#days").attr("max")) {
            daysPrest += 1;
            daysLevel = 0;
        }

        if ($("#strength").val() == $("#strength").attr("max")) {
            strengthPrest += 1;
            strengthLevel = 0;
        }
        
        if ($("#bench").val() == $("#bench").attr("max")) {
            benchPrest += 1;
            benchLevel = 0;
        }
        
        if ($("#squat").val() == $("#squat").attr("max")) {
            squatPrest += 1;
            squatLevel = 0;
        }
        
        if ($("#deadlift").val() == $("#deadlift").attr("max")) {
            deadliftPrest += 1;
            deadliftLevel = 0;
        }
        
        if ($("#row").val() == $("#row").attr("max")) {
            rowPrest += 1;
            rowLevel = 0;
        }
    });


    // Play Area Workout Cards Clicking Code
    // Play Tiles expand rapidly when clicked on
    $('.action-workout-card').each(function () {
        const $card = $(this);
        const $img = $card.find('img');

        if ($img.length === 0) return;

        const img = $img[0];
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d', { willReadFrequently: true });

        function setupCanvas() {
            canvas.width = img.naturalWidth;
            canvas.height = img.naturalHeight;

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0);

            $card.data('hitCanvas', canvas);
            $card.data('hitCtx', ctx);
            $card.data('hitReady', true);
        }

        if (img.complete) {
            setupCanvas();
        } else {
            $img.on('load', function () {
                setupCanvas();
            });
        }
    });

    $('.action-workout-card').on('click', function (e) {
        const $card = $(this);
        const $img = $card.find('img');

        if ($img.length === 0) return;

        const img = $img[0];
        const canvas = $card.data('hitCanvas');
        const ctx = $card.data('hitCtx');
        const ready = $card.data('hitReady');

        if (!ready || !canvas || !ctx) return;

        const rect = img.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const scaleX = img.naturalWidth / rect.width;
        const scaleY = img.naturalHeight / rect.height;

        const imgX = Math.floor(x * scaleX);
        const imgY = Math.floor(y * scaleY);

        if (imgX < 0 || imgY < 0 || imgX >= canvas.width || imgY >= canvas.height) {
            return;
        }

        const pixel = ctx.getImageData(imgX, imgY, 1, 1).data;
        const alpha = pixel[3];

        if (alpha <= 10) return;

        const actionChoice = $card.attr("id");

        let statToIncreaseIndex = null;

        switch (actionChoice) {
            case "bench-action":
                statToIncreaseIndex = 0;
                if (statToIncreaseIndex !== null) {
                    userStrength[statToIncreaseIndex] += benchStatIncrease;}
                break;
            case "squat-action":
                statToIncreaseIndex = 1;
                if (statToIncreaseIndex !== null) {
                    userStrength[statToIncreaseIndex] += squatStatIncrease;}
                break;
            case "deadlift-action":
                statToIncreaseIndex = 2;
                if (statToIncreaseIndex !== null) {
                    userStrength[statToIncreaseIndex] += deadliftStatIncrease;}
                break;
            case "row-action":
                statToIncreaseIndex = 3;
                if (statToIncreaseIndex !== null) {
                    userStrength[statToIncreaseIndex] += rowStatIncrease;}
                    break;
                }
                updateStats();

        userReps += clickReps;

        let floatingRepValue = String(clickReps);
        let floatingRep = $('<span>').addClass('reps-floating').text('+' + floatingRepValue);
        $('#user-reps-floating').append(floatingRep);

        setTimeout(function () {
            floatingRep.remove();
        }, 800);

        $("#user-reps").text(Math.round(userReps));
    });

    setInterval(gameTick, 1000 / gameSpeed);
});