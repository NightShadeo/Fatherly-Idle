"use strict";

const levelRanks = [
    "Small Frank",
    "Big Joe",
    "Sam Sulek",
    "Chad Thundercock",
    "Urs Kalecinski",
    "Jay Cutler",
    "Ronnie Coleman",
    "BIG CHUNGUS",
]

    // ALL variables
    // Touching line vars are changable game mechanics
const gameSpeed = 1; //fps
const addedCost = 1.25; // Multipler how much each upgrade costs more
const repMuscleMult = 0.64; // Rep to Muscle strength cost ratio
const upgradePercent = 0.05; // Percentage of each each upgrade gives you
    
const daysBaseCost = 30; 
const strengthBaseCost = 120;
const preBaseCost = 2500;
const benchBaseCost = 150;
const squatBaseCost = 150;
const deadliftBaseCost = 150;
const rowBaseCost = 150;


const defaultSettings = {
    userName: levelRanks[0],
    userReps: 1,

    daysLevel: 0,
    daysPrest: 0,
    strengthLevel: 0,
    strengthPrest: 0,
    benchLevel: 0,
    benchPrest: 0,
    squatLevel: 0,
    squatPrest: 0,
    deadliftLevel: 0,
    deadliftPrest: 0,
    rowLevel: 0,
    rowPrest: 0,

    benchStatIncrease: 0.1,
    squatStatIncrease: 0.1,
    deadliftStatIncrease: 0.1,
    rowStatIncrease: 0.1,
    clickReps: 1,

    preCharges: 0,
    userStrength: [45, 45, 45, 45, 1]
};