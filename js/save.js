"use strict";

function saveGame() {
    localStorage.setItem("fatherlyIdleSave", JSON.stringify(gameState));
    console.log("saved", gameState);
};

function loadGame() {
    const savedData = localStorage.getItem("fatherlyIdleSave");

    if (savedData !== null) {
        const data = JSON.parse(savedData);

        Object.assign(gameState, data);
        console.log("loaded", gameState);
    }
};

function resetSave() {
    localStorage.removeItem("fatherlyIdleSave");

    Object.assign(gameState, defaultSettings);

    gameState.userStrength = [...defaultSettings.userStrength];

    console.log("save reset", gameState);

    location.reload();
};

function validateUserLogin() {
    let usernameInput = $('#login-username').val();
    let passwordInput = $('#login-password').val();

    if (usernameInput === userCredentials.admin.username && passwordInput === userCredentials.admin.password) {
        // adminAccess = true;
        sessionStorage.setItem("adminGranted", "true");
        return true;
    } else {
        alert("Invalid Credentials");
        return false;
    }
};



setInterval(saveGame, 25000);