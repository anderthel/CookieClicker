    // Register mod
    Game.registerMod("gardensave", { //this string needs to match the ID provided in your info.txt
        init: function() {
            //this function is called as soon as the mod is registered
            let MOD = this;

            // Button
            l("gardenField").insertAdjacentHTML('beforeend', '<a style="font-size:11px;position:absolute;bottom:2px;right:2px;display:block;text-align:center;" class="smallFancyButton" id="gardensavebutton">Garden<br>Scum</a>');

            // Button events
            AddEvent(l('gardensavebutton'), 'click', function() {
                savescum();
            })

            // Sleep function
            function sleep(ms) {
                return new Promise(resolve => setTimeout(resolve, ms));
            }

            // main function called on button press
            async function savescum() {
                MOD.savescum = Game.mods["savescum"].savescum;
                var farm = Game.ObjectsById[2].minigame;
                var locked = [];
                var complete = false;
                MOD.waittime = 1000;
                // MOD.farm.nextStep = farm tick

                // Get list of locked plants
                for (const plant in farm.plantsById) {
                    if (plant.unlocked == 0) {
                        locked.push(plant.id + 1);      /*add one to id since in plot they are incremented by one for some reason*/
                    }
                }


                console.log(locked);
                // For each plot of farm check if a new plant is there
                loop:                                                   /*label to allow break to exist whole loop*/
                for (var tries = 1; tries >= 50; tries++) {
                    // wait 1000ms before processing - convert to less arbitary number
                    console.log("Try:" + String(tries).padStart(3, ' '))
                    await sleep(MOD.waittime);

                    for (const row in farm.plot) {                      /*for row*/
                        for (const plot in row) {                       /*for col*/
                            if (locked.indexOf(plot[0]) != -1) {        /*if plant id is found in locked list*/
                                complete = true;
                                console.log(plot);
                                break loop;
                            }
                        }
                    }
                    
                    if (!complete) {
                        Game.CloseNotes();
                        Game.ImportSaveCode(MOD.savescum);
                    }
                }

                // At completion of for loop
                if (complete) {
                    Game.Notify('Done', '', [], 10);
                } else {
                    Game.Notify('Failed', '', [], 10);
                }
            }

            Game.Notify("Garden Save Loaded", '', [], 5);
        }
    });
