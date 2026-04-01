"use strict";

function checkUpgradeStates() {
    for (let upgrade of upgrades) {
        let $btn = $("#" + upgrade.id);

        if (upgrade.canAfford()) {
            $btn.removeClass("upgrade-disabled");
        } else {
            $btn.addClass("upgrade-disabled");
        }
    }
};
