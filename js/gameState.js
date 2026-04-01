"use strict";


const gameState = {
    userName: defaultSettings.userName,
    userReps: defaultSettings.userReps,

    daysLevel: defaultSettings.daysLevel,
    daysPrest: defaultSettings.daysPrest,
    strengthLevel: defaultSettings.strengthLevel,
    strengthPrest: defaultSettings.strengthPrest,
    benchLevel: defaultSettings.benchLevel,
    benchPrest: defaultSettings.benchPrest,
    squatLevel: defaultSettings.squatLevel,
    squatPrest: defaultSettings.squatPrest,
    deadliftLevel: defaultSettings.deadliftLevel,
    deadliftPrest: defaultSettings.deadliftPrest,
    rowLevel: defaultSettings.rowLevel,
    rowPrest: defaultSettings.rowPrest,

    benchStatIncrease: defaultSettings.benchStatIncrease,
    squatStatIncrease: defaultSettings.squatStatIncrease,
    deadliftStatIncrease: defaultSettings.deadliftStatIncrease,
    rowStatIncrease: defaultSettings.rowStatIncrease,
    clickReps: defaultSettings.clickReps,
    clickBase: defaultSettings.clickBase,
    clickGrowth: defaultSettings.clickGrowth,

    preCharges: defaultSettings.preCharges,
    userStrength: [...defaultSettings.userStrength]
};

const gameCalculations = {
    strengthTotalLevel: 0,
    strengthRepsCost: 0,
    daysTotalLevel: 0,
    daysRepsCost: 0,
    benchTotalLevel: 0,
    benchRepsCost: 0,
    benchSquatCost: 0,
    squatTotalLevel: 0,
    squatRepsCost: 0,
    squatRowCost: 0,
    deadliftTotalLevel: 0,
    deadliftRepsCost: 0,
    deadliftBenchCost: 0,
    rowTotalLevel: 0,
    rowRepsCost: 0,
    rowDeadliftCost: 0,
    preRepsCost: 0,
    strengthBonus: 0,
    clickUpgradeValue: 0
};