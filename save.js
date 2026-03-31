"use strict";

function saveGame() {
    const saveData = {
        reps: userReps,
        bench: userStrength[0].toFixed(1),
        squat: userStrength[1].toFixed(1),
        deadlift: userStrength[2].toFixed(1),
        row: userStrength[3].toFixed(1),
        idleLevel: daysLevel,
        idlePrestige: daysPrest,
        strengthLevel: strengthLevel,
        strengthPrestige: strengthPrest,
        benchLevel: benchLevel,
        benchPrestige: benchPrest,
        squatLevel: squatLevel,
        squatPrestige: squatPrest,
        deadliftLevel: deadliftLevel,
        deadliftPrestige: deadliftPrest,
        rowLevel: rowLevel,
        rowPrestige: rowPrest,

        benchStatIncrease: benchStatIncrease,
        squatStatIncrease: squatStatIncrease,
        deadliftStatIncrease: deadliftStatIncrease,
        rowStatIncrease: rowStatIncrease,
        clickReps: clickReps,
        preCharges: preCharges,
    };

    localStorage.setItem("fatherlyIdleSave", JSON.stringify(saveData));
    console.log("saved", saveData);
};

function loadGame() {
    const savedData = localStorage.getItem("fatherlyIdleSave");

    if (savedData !== null) {
        const data = JSON.parse(savedData);
        userReps = data.reps;
        userStrength[0] = parseFloat(data.bench);
        userStrength[1] = parseFloat(data.squat);
        userStrength[2] = parseFloat(data.deadlift);
        userStrength[3] = parseFloat(data.row);
        daysLevel = data.idleLevel;
        daysPrest = data.idlePrestige;
        strengthLevel = data.strengthLevel;
        strengthPrest = data.strengthPrestige;
        benchLevel = data.benchLevel;
        benchPrest = data.benchPrestige;
        squatLevel = data.squatLevel;
        squatPrest = data.squatPrestige;
        deadliftLevel = data.deadliftLevel;
        deadliftPrest = data.deadliftPrestige;
        rowLevel = data.rowLevel;
        rowPrest = data.rowPrestige;
        benchStatIncrease = data.benchStatIncrease;
        squatStatIncrease = data.squatStatIncrease;
        deadliftStatIncrease = data.deadliftStatIncrease;
        rowStatIncrease = data.rowStatIncrease;
        clickReps = data.clickReps;
        preCharges = data.preCharges;
        console.log("Loaded", data);
    }
};

function resetSave() {
    localStorage.removeItem("fatherlyIdleSave");

    userName = defaultSettings.userName;
    userReps = defaultSettings.userReps;

    daysLevel = defaultSettings.daysLevel;
    daysPrest = defaultSettings.daysPrest;
    strengthLevel = defaultSettings.strengthLevel;
    strengthPrest = defaultSettings.strengthPrest;
    benchLevel = defaultSettings.benchLevel;
    benchPrest = defaultSettings.benchPrest;
    squatLevel = defaultSettings.squatLevel;
    squatPrest = defaultSettings.squatPrest;
    deadliftLevel = defaultSettings.deadliftLevel;
    deadliftPrest = defaultSettings.deadliftPrest;
    rowLevel = defaultSettings.rowLevel;
    rowPrest = defaultSettings.rowPrest;

    benchStatIncrease = defaultSettings.benchStatIncrease;
    squatStatIncrease = defaultSettings.squatStatIncrease;
    deadliftStatIncrease = defaultSettings.deadliftStatIncrease;
    rowStatIncrease = defaultSettings.rowStatIncrease;
    clickReps = defaultSettings.clickReps;

    preCharges = defaultSettings.preCharges;
    userStrength = [...defaultSettings.userStrength];

    location.reload();
}


setInterval(saveGame, 25000);