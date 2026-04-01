"use strict";
// array of upgrades simply for use with the ui updating for canAfford states

let upgrades = [
    { id: "daysUp", canAfford: () => gameState.userReps >= gameCalculations.daysRepsCost },
    { id: "strengthUp", canAfford: () => gameState.userReps >= gameCalculations.strengthRepsCost },
    { id: "preworkoutUp", canAfford: () => gameState.userReps >= preBaseCost },
    { id: "benchUp", canAfford: () => (gameState.userStrength[1] >= gameCalculations.benchSquatCost) && (gameState.userReps >= gameCalculations.benchRepsCost) },
    { id: "squatUp", canAfford: () => (gameState.userStrength[3] >= gameCalculations.squatRowCost) && (gameState.userReps >= gameCalculations.squatRepsCost) },
    { id: "deadliftUp", canAfford: () => (gameState.userStrength[0] >= gameCalculations.deadliftBenchCost) && (gameState.userReps >= gameCalculations.deadliftRepsCost) },
    { id: "rowUp", canAfford: () => (gameState.userStrength[2] >= gameCalculations.rowDeadliftCost) && (gameState.userReps >= gameCalculations.rowRepsCost) }
];

$(document).ready(() => {

      //Save / load game functions
    loadGame();
    recalcUpgradeValues();
    refreshScreen();
    // Any screen text or HTML modification
    function refreshScreen() {
        $("#user-name").text(gameState.userName);
        $("#user-reps").text(Math.round(gameState.userReps));

        $("#days").attr("value", gameState.daysLevel);
        $("#days").next("span").text(Math.round(gameState.daysPrest));

        $("#preworkout").attr("value", gameState.preCharges);

        $("#strength").attr("value", gameState.strengthLevel);
        $("#strength").next("span").text(Math.round(gameState.strengthPrest));

        $("#bench").attr("value", gameState.benchLevel);
        $("#bench").next("span").text(Math.round(gameState.benchPrest));

        $("#squat").attr("value", gameState.squatLevel);
        $("#squat").next("span").text(Math.round(gameState.squatPrest));
        
        $("#deadlift").attr("value", gameState.deadliftLevel);
        $("#deadlift").next("span").text(Math.round(gameState.deadliftPrest));
        
        $("#row").attr("value", gameState.rowLevel);
        $("#row").next("span").text(Math.round(gameState.rowPrest));
        
        $("#daysUp").find(".reps-cost").text(Math.round(gameCalculations.daysRepsCost));
        $("#strengthUp").find(".reps-cost").text(Math.round(gameCalculations.strengthRepsCost));
        $("#strengthUp").find(".upgrade-value").text(gameCalculations.clickUpgradeValue);
        $("#preworkoutUp").find(".reps-cost").text(Math.round(gameCalculations.preRepsCost));
        $("#benchUp").find(".reps-cost").text(Math.round(gameCalculations.benchRepsCost));
        $("#squatUp").find(".reps-cost").text(Math.round(gameCalculations.squatRepsCost));
        $("#deadliftUp").find(".reps-cost").text(Math.round(gameCalculations.deadliftRepsCost));
        $("#rowUp").find(".reps-cost").text(Math.round(gameCalculations.rowRepsCost));

        $("#benchUp").find(".muscle-cost").text(Math.round(gameCalculations.benchSquatCost));
        $("#squatUp").find(".muscle-cost").text(Math.round(gameCalculations.squatRowCost));
        $("#deadliftUp").find(".muscle-cost").text(Math.round(gameCalculations.deadliftBenchCost));
        $("#rowUp").find(".muscle-cost").text(Math.round(gameCalculations.rowDeadliftCost));

        $("#0").text(gameState.userStrength[0].toFixed(1));
        $("#1").text(gameState.userStrength[1].toFixed(1));
        $("#2").text(gameState.userStrength[2].toFixed(1));
        $("#3").text(gameState.userStrength[3].toFixed(1));   
        
        checkUpgradeStates();
    };

    function recalcUpgradeValues() {
        gameCalculations.strengthTotalLevel = gameState.strengthLevel + (gameState.strengthPrest * Number($("#strength").attr("max")));
        gameCalculations.daysTotalLevel = gameState.daysLevel + (gameState.daysPrest * Number($("#days").attr("max")));
        gameCalculations.benchTotalLevel = gameState.benchLevel + (gameState.benchPrest * Number($("#bench").attr("max")));
        gameCalculations.squatTotalLevel = gameState.squatLevel + (gameState.squatPrest * Number($("#squat").attr("max")));
        gameCalculations.deadliftTotalLevel = gameState.deadliftLevel + (gameState.deadliftPrest * Number($("#deadlift").attr("max")));
        gameCalculations.rowTotalLevel = gameState.rowLevel + (gameState.rowPrest * Number($("#row").attr("max")));

        gameCalculations.strengthRepsCost = strengthBaseCost * Math.pow(addedCost, gameCalculations.strengthTotalLevel);
        gameCalculations.daysRepsCost = ((gameState.daysLevel + 1 + (gameState.daysPrest * Number($("#days").attr("max")))) * (daysBaseCost * addedCost));
        gameCalculations.preRepsCost = preBaseCost;
        gameCalculations.benchRepsCost = benchBaseCost * Math.pow(addedCost, gameCalculations.benchTotalLevel);
        gameCalculations.benchSquatCost = (gameCalculations.benchTotalLevel * (benchBaseCost * addedCost)) * repMuscleMult;

        gameCalculations.clickUpgradeValue = Math.max(gameState.clickReps +1, Math.floor(gameState.clickBase * Math.pow(gameState.clickGrowth, gameCalculations.strengthTotalLevel + 1))) - gameState.clickReps;

        gameCalculations.squatRepsCost = squatBaseCost * Math.pow(addedCost, gameCalculations.squatTotalLevel);
        gameCalculations.squatRowCost = (gameCalculations.squatTotalLevel * (squatBaseCost * addedCost)) * repMuscleMult;

        gameCalculations.deadliftRepsCost = deadliftBaseCost * Math.pow(addedCost, gameCalculations.deadliftTotalLevel);
        gameCalculations.deadliftBenchCost = (gameCalculations.deadliftTotalLevel * (deadliftBaseCost * addedCost)) * repMuscleMult;

        gameCalculations.rowRepsCost = rowBaseCost * Math.pow(addedCost, gameCalculations.rowTotalLevel);
        gameCalculations.rowDeadliftCost = (gameCalculations.rowTotalLevel * (rowBaseCost * addedCost)) * repMuscleMult;
    };

 

    function updateStats() {
        $("#user-reps").text(Math.round(gameState.userReps));
        $("#0").text(gameState.userStrength[0].toFixed(1));
        $("#1").text(gameState.userStrength[1].toFixed(1));
        $("#2").text(gameState.userStrength[2].toFixed(1));
        $("#3").text(gameState.userStrength[3].toFixed(1)); 
    };

    // Any runtime logic
    function gameTick() {

        gameCalculations.strengthTotalLevel = gameState.strengthLevel + (gameState.strengthPrest * $("#strength").attr("max"));
        gameCalculations.benchTotalLevel = gameState.benchLevel + (gameState.benchPrest * $("#bench").attr("max"));
        gameCalculations.squatTotalLevel = gameState.squatLevel + (gameState.squatPrest * $("#squat").attr("max"));
        gameCalculations.deadliftTotalLevel = gameState.deadliftLevel + (gameState.deadliftPrest * $("#deadlift").attr("max"));
        gameCalculations.rowTotalLevel = gameState.rowLevel + (gameState.rowPrest * $("#row").attr("max"));
        gameCalculations.daysTotalLevel = gameState.daysLevel + (gameState.daysPrest * $("#days").attr("max"));

        gameCalculations.strengthBonus = gameCalculations.strengthTotalLevel * 0.05;

        if (gameState.preCharges > 0) {
            gameCalculations.strengthBonus *= 2;
            gameState.preCharges -= 1;
        };
        
        gameState.userStrength[0] += upgradePercent * (gameState.benchLevel + (gameCalculations.benchTotalLevel));
        gameState.userStrength[1] += upgradePercent * (gameState.squatLevel + (gameCalculations.squatTotalLevel));
        gameState.userStrength[2] += upgradePercent * (gameState.deadliftLevel + (gameCalculations.deadliftTotalLevel));
        gameState.userStrength[3] += upgradePercent * (gameState.rowLevel + (gameCalculations.rowTotalLevel));

        gameState.userReps += gameCalculations.daysTotalLevel;


       
        refreshScreen();
        updateStats();
    };

  
    
    $("#save-button").click(saveGame);
    $("#reset-button").click(resetSave);

    // Cheat menu checkin admin creds.
    // IF cheat menus is NOT open, ask for admin creds. Otherwise close the cheat menu
    // IF its NOT open, pop up admin login window. 

    // Then wait for a form submit to either OPEN cheat menu, or cancel.
    $('#cheat-toggle').click(function () {
    console.log(sessionStorage.getItem("adminGranted"));
    if (!$('.cheat-menu-container').hasClass('open')) {
        if (sessionStorage.getItem("adminGranted") === "true") {
            $('.cheat-menu-container').addClass('open');
            return;
        }
        $('#user-login-popup').removeClass('hidden-popup');
    } else {
        $('.cheat-menu-container').removeClass('open');
    }
    });

    $('#user-login-form').submit(function (e) {
        e.preventDefault();

        if (validateUserLogin()) {
            $('.cheat-menu-container').addClass('open');
            $('#user-login-popup').addClass('hidden-popup');
        }
    });

        
    $("#cancel-login, #user-close-login").click(function () {
        $('#user-login-popup').addClass("hidden-popup");
    });
    
    $(".menu-button").click(function () {
        const cheatChoice = $(this).attr("id"); 

        switch(cheatChoice) {
            case "give-money":
                gameState.userReps += 100000;
                for (let i = 0; i < gameState.userStrength.length - 1; i++) {
                    gameState.userStrength[i] += 100000;
                }
                gameState.userStrength[4] = gameState.userReps;
                break;
            case "give-bench":
                gameState.userStrength[0] += 100;
                break;
            case "give-squat":
                gameState.userStrength[1] += 100;
                break;
            case "give-deadlift":
                gameState.userStrength[2] += 100;
                break;
            case "give-row":
                gameState.userStrength[3] += 100;
                break;
            case "give-reps":
                gameState.userReps += 1000
                break;
                }
                updateStats();
    });

    let totalLevel = gameCalculations.daysTotalLevel + gameCalculations.strengthTotalLevel + gameCalculations.benchTotalLevel +
                gameCalculations.squatTotalLevel + gameCalculations.deadliftTotalLevel + gameCalculations.rowTotalLevel;
    $("#user-level").text(totalLevel);

    refreshScreen();

    $(".upgrade").click(function () {
        const upgradeChoice = $(this).attr("id");
        switch (upgradeChoice) {
            case "daysUp":
                if (gameState.userReps < gameCalculations.daysRepsCost) {
                    break;
                } else {
                    gameState.daysLevel += 1;
                    gameCalculations.daysTotalLevel = gameState.daysLevel + (gameState.daysPrest * $("#days").attr("max"));
                    gameState.userReps -= gameCalculations.daysRepsCost;
                    gameCalculations.daysRepsCost = (gameCalculations.daysTotalLevel * (daysBaseCost * addedCost));
                    break;
                }
            case "strengthUp":
                if (gameState.userReps < gameCalculations.strengthRepsCost) {
                    break;
                } else {
                    gameState.userReps -= gameCalculations.strengthRepsCost;
                    gameState.strengthLevel += 1;
                    gameCalculations.strengthTotalLevel = gameState.strengthLevel + (gameState.strengthPrest * $("#strength").attr("max"));
                    gameCalculations.strengthRepsCost = gameCalculations.strengthRepsCost = Math.floor(strengthBaseCost * Math.pow(addedCost, gameCalculations.strengthTotalLevel));
                    gameState.clickReps = Math.max(gameState.clickReps +1, Math.floor(gameState.clickBase * Math.pow(gameState.clickGrowth, gameCalculations.strengthTotalLevel)));
                    recalcUpgradeValues();
                    refreshScreen();
                    break;
                }
            case "preworkoutUp":
                if (gameState.userReps < preBaseCost) {
                    break;
                } else {
                    gameState.userReps -= preBaseCost;
                    gameState.preCharges = 200;
                    break;
                }
            case "benchUp":
                if ((gameState.userStrength[1] >= gameCalculations.benchSquatCost) && (gameState.userReps >= gameCalculations.benchRepsCost)) {
                    gameState.userReps -= gameCalculations.benchRepsCost;
                    gameState.userStrength[1] -= gameCalculations.benchSquatCost;
                    gameState.benchLevel += 1;
                    gameCalculations.benchTotalLevel = gameState.benchLevel + (gameState.benchPrest * $("#bench").attr("max"));
                    gameCalculations.benchRepsCost = benchBaseCost * Math.pow(addedCost, gameCalculations.benchTotalLevel);
                    gameCalculations.benchSquatCost = (gameCalculations.benchTotalLevel * (benchBaseCost * addedCost)) * repMuscleMult;
                    gameState.benchStatIncrease *= 2;
                    break;
                } else {
                    break;
                }    
            case "squatUp":
                if ((gameState.userStrength[3] >= gameCalculations.squatRowCost) && (gameState.userReps >= gameCalculations.squatRepsCost)) {
                    gameState.userReps -= gameCalculations.squatRepsCost;
                    gameState.userStrength[3] -= gameCalculations.squatRowCost;
                    gameState.squatLevel += 1;
                    gameCalculations.squatTotalLevel = gameState.squatLevel + (gameState.squatPrest * $("#squat").attr("max"));
                    gameCalculations.squatRepsCost = squatBaseCost * Math.pow(addedCost, gameCalculations.squatTotalLevel);
                    gameCalculations.squatRowCost = (gameCalculations.squatTotalLevel * (squatBaseCost * addedCost)) * repMuscleMult;
                    gameState.squatStatIncrease *=2;
                    break;
                } else {
                    break;
                }
            case "deadliftUp":
                if ((gameState.userStrength[0] >= gameCalculations.deadliftBenchCost) && (gameState.userReps >= gameCalculations.deadliftRepsCost)) {
                    gameState.userReps -= gameCalculations.deadliftRepsCost;
                    gameState.userStrength[0] -= gameCalculations.deadliftBenchCost;
                    gameState.deadliftLevel += 1;
                    gameCalculations.deadliftTotalLevel = gameState.deadliftLevel + (gameState.deadliftPrest * $("#deadlift").attr("max"));
                    gameCalculations.deadliftRepsCost = deadliftBaseCost * Math.pow(addedCost, gameCalculations.deadliftTotalLevel);
                    gameCalculations.deadliftBenchCost = (gameCalculations.deadliftTotalLevel * (deadliftBaseCost * addedCost)) * repMuscleMult;
                    gameState.deadliftStatIncrease *=2;
                    break;
                } else {
                    break;
                }
         
            case "rowUp":
                if ((gameState.userStrength[2] >= gameCalculations.rowDeadliftCost) && (gameState.userReps >= gameCalculations.rowRepsCost)) {
                    gameState.userReps -= gameCalculations.rowRepsCost;
                    gameState.userStrength[2] -= gameCalculations.rowDeadliftCost;
                    gameState.rowLevel += 1;
                    gameCalculations.rowTotalLevel = gameState.rowLevel + (gameState.rowPrest * $("#row").attr("max"));
                    gameCalculations.rowRepsCost = rowBaseCost * Math.pow(addedCost, gameCalculations.rowTotalLevel);
                    gameCalculations.rowDeadliftCost = (gameCalculations.rowTotalLevel * (rowBaseCost * addedCost)) * repMuscleMult;
                    gameState.rowStatIncrease *=2;
                    break;
                } else {
                    break;
                }
            default:
                console.log(upgradeChoice);
                break;
        }
        checkUpgradeStates();

        switch (true) {
            case (totalLevel < 20):
                gameState.userName = levelRanks[0];
                break;
            case (totalLevel < 30):
                gameState.userName = levelRanks[1];
                break;
            case (totalLevel < 50):
                gameState.userName = levelRanks[2];
                break;
            case (totalLevel < 60):
                gameState.userName = levelRanks[3];
                break;
            case (totalLevel < 80):
                gameState.userName = levelRanks[4];
                break;
            case (totalLevel < 99):
                gameState.userName = levelRanks[5];
                break;
            case (totalLevel < 120):
                gameState.userName = levelRanks[6];
                break;
            case (totalLevel >= 120):
                gameState.userName = levelRanks[7];
                break;
        }

        $("#user-name").text(gameState.userName);

        totalLevel = gameCalculations.daysTotalLevel + gameCalculations.strengthTotalLevel + gameCalculations.benchTotalLevel +
                gameCalculations.squatTotalLevel + gameCalculations.deadliftTotalLevel + gameCalculations.rowTotalLevel;
        $("#user-level").text(totalLevel);

        refreshScreen();

        if ($("#days").val() == $("#days").attr("max")) {
            gameState.daysPrest += 1;
            gameState.daysLevel = 0;
        }

        if ($("#strength").val() == $("#strength").attr("max")) {
            gameState.strengthPrest += 1;
            gameState.strengthLevel = 0;
        }
        
        if ($("#bench").val() == $("#bench").attr("max")) {
            gameState.benchPrest += 1;
            gameState.benchLevel = 0;
        }
        
        if ($("#squat").val() == $("#squat").attr("max")) {
            gameState.squatPrest += 1;
            gameState.squatLevel = 0;
        }
        
        if ($("#deadlift").val() == $("#deadlift").attr("max")) {
            gameState.deadliftPrest += 1;
            gameState.deadliftLevel = 0;
        }
        
        if ($("#row").val() == $("#row").attr("max")) {
            gameState.rowPrest += 1;
            gameState.rowLevel = 0;
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
                    gameState.userStrength[statToIncreaseIndex] += gameState.benchStatIncrease;}
                break;
            case "squat-action":
                statToIncreaseIndex = 1;
                if (statToIncreaseIndex !== null) {
                    gameState.userStrength[statToIncreaseIndex] += gameState.squatStatIncrease;}
                break;
            case "deadlift-action":
                statToIncreaseIndex = 2;
                if (statToIncreaseIndex !== null) {
                    gameState.userStrength[statToIncreaseIndex] += gameState.deadliftStatIncrease;}
                break;
            case "row-action":
                statToIncreaseIndex = 3;
                if (statToIncreaseIndex !== null) {
                    gameState.userStrength[statToIncreaseIndex] += gameState.rowStatIncrease;}
                    break;
                }
                updateStats();

        gameState.userReps += gameState.clickReps;
        checkUpgradeStates();

        let floatingRepValue = String(gameState.clickReps);
        let floatingRep = $('<span>').addClass('reps-floating').text('+' + floatingRepValue);
        $('#user-reps-floating').append(floatingRep);

        setTimeout(function () {
            floatingRep.remove();
        }, 800);

        $("#user-reps").text(Math.round(gameState.userReps));
    });

    setInterval(gameTick, 1000 / gameSpeed);
});