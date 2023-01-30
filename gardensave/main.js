// Register mod
Game.registerMod("gardensave", { //this string needs to match the ID provided in your info.txt
    init: function() {
        //this function is called as soon as the mod is registered
        let MOD = this;

        // Button
        l("gardenContent").insertAdjacentHTML('beforeend', '<a style="font-size:12px;position:absolute;bottom:2px;right:2px;display:block;" class="smallFancyButton" id="gardensavebutton">Scum</a>');

        // Button events
        AddEvent(l('gardensavebutton'), 'click', function() {
            savescum();
        })

        function savescum() {
            MOD.savescum = Game.mods["savescum"].savescum;
            MOD.farm = Game.ObjectsById[2].minigame;
            MOD.locked = [];
            MOD.tries = 0;
            MOD.run = true;
            // MOD.farm.nextStep = farm tick

            // Get list of locked plants
            MOD.farm.plantsById.forEach(function(plant) {
                if (plant.unlocked == 0) {
                    MOD.locked.push(plant.id);
                }
            });

            // For each plot of farm check if a new plant is there
            while (MOD.run) {
                MOD.tries++; /*count*/

                if (MOD.tries <= 50) {
                    console.log("Try:" + String(MOD.tries).padStart(5, ' '))
                    MOD.farm.plot.forEach(function(row) {
                        row.forEach(function(plot) {
                            if (MOD.locked.indexOf(plot) == -1) {
                                Game.ImportSaveCode(MOD.savescum);
                            } else {
                                Game.CloseNotes();
                                Game.Notify('Done', '', [], 1);
                                MOD.run = false;
                            }
                        });
                    });
                } else {
                    MOD.run = false;
                    Game.Notify('Failed', '', [], 10);
                }
            }
        }

        Game.Notify("Garden Save Loaded", '', [], 5);
    }
});
