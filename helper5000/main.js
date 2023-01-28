// Register mod
Game.registerMod("helper5000", { //this string needs to match the ID provided in your info.txt
    init: function() {
        //this function is called as soon as the mod is registered
        let MOD = this;

        // Addon achivement
        if (Game.AchievementsById[160].won == 0) {
            Game.AchievementsById[160].toggle()
        }

        // Add buttons
        /*Sell All*/
        l('storeBulk').insertAdjacentHTML('beforeend', '<a style="font-size:12px;position:absolute;bottom:2px;right:2px;display:block;" class="smallFancyButton" id="sellall">Sell All</a>');
        /*Save Scum*/
        l('storeTitle').insertAdjacentHTML('beforeend', '<a style="font-size:12px;position:absolute;bottom:2px;right:2px;display:block;" class="smallFancyButton" id="savescumbutton">Save</a>');

        // Button events
        /*Sell all*/
        AddEvent(l('sellall'), 'click', function() {
                Game.ObjectsById.forEach(function(building) {
                    if (MOD.keepfree == true) {
                        building.sell(building.amount - building.free);
                    } else {
                        building.sell(99999);
                    }
                })
            })
        
        /*Save Scum*/
        AddEvent(l('savescumbutton'), 'click', function() {
            if (Game.keys[16] == 1) {
                Game.ImportSaveCode(MOD.savescum);
                Game.CloseNotes();
                Game.Notify('Loaded', '', [], 1);
            } else {
                MOD.savescum = Game.WriteSave(1);
                Game.Notify('Saved', '', [], 1);
            }
        })

        function savescumbuttontext() { /*Change text on button if shift held*/
            if (Game.keys[16] == 1) {
                l('savescumbutton').innerText = "Load";
            } else {
                l('savescumbutton').innerText = "Save";
            }
        }


        // For shimmers
        function autoshimmers() {
            Game.shimmers.forEach(function(shimmer) {
                if (shimmer.type == "golden" && MOD.golden == true && shimmer.wrath == 0) { /*Normal cookies*/
                    shimmer.pop();
                } else if (shimmer.type === "reindeer" && MOD.reindeer) { /*Reindeer*/
                    shimmer.pop();
                }
            })
        }

        // Wrinklers
        function autowrinklers() {
            MOD.wrinkCount = 0; /*Number of wrinklers eating*/
            MOD.wrinkEaten = 0; /*Number of cookies in biggest wrinkler*/
            MOD.wrinkIndex = 0; /*Current biggest wrinkler*/

            Game.wrinklers.forEach(function(wrinkler) {
                // count number of eating wrinks
                if (wrinkler.sucked > 0) {
                    MOD.wrinkCount += 1;

                    // if is bigger than replace current
                    if (wrinkler.sucked > MOD.wrinkEaten && wrinkler.type == 0) {
                        MOD.wrinkEaten = wrinkler.sucked;
                        MOD.wrinkIndex = wrinkler.id;
                    }
                }

                // pop biggest if count full
                if (MOD.wrinkCount == Game.wrinklers.length && MOD.wrinkIndex != Game.wrinklers.length) {
                    Game.wrinklers[MOD.wrinkIndex].hp = 0;
                }
            })
        }

        // Spell casting
        function autocast() {
            MOD.wiz = Game.ObjectsById[7].minigame;
            if (MOD.wiz.magic == MOD.wiz.magicM) {
                MOD.wiz.castSpell(MOD.wiz.spells[MOD.spell]);
                if (MOD.spell == "hand of fate") {
                    Game.shimmers.forEach(function(shimmer) {
                        if ((shimmer.type == "golden") && (shimmer.wrath == 0)) {
                            shimmer.pop();
                        }
                    });
                }
            }
        }

        // Fortune Clicker
        function autofortune() {
            if (Game.TickerEffect && Game.TickerEffect.type == 'fortune') {
                Game.tickerL.click();
            }
        }

        // Dragon Orb Aura
        function autodragonorb() {
            if (Game.dragonAura == 19 || Game.dragonAura2 == 19) {
                Game.ObjectsById.forEach(function(building) {
                    if (building.amount > 0) {
                        MOD.strongestbuild = building.id
                    }
                })
                if (Game.buffsI > 1 && Game.cookies > Game.ObjectsById[MOD.strongestbuild].price) {
                    Game.ObjectsById[MOD.strongestbuild].sell(1);
                    Game.ObjectsById[MOD.strongestbuild].buy(1);
                    Game.shimmers.forEach(function(shimmer) {
                        shimmer.pop();
                    })
                }
            }
        }

        // SpirtofRuin
        //function spirtofruin() {
        //    if (Game.ObjectsById[6].minigame.slot.includes(2)) {

        //    }
        //}



        // Add
        // wrath cookies
        // Big cookie clicker
        // SpirtofRuin
        // Click to remove possitive efftcts?
        // Lump type Game.lumpCurrentType Game.lumpToolTip()

        // Trigger save scum saver
        MOD.savescum = Game.WriteSave(1);

        // Selector
        MOD.spell = "hand of fate";

        // Toggles
        MOD.golden = true; /*Click golden cookies*/
        MOD.reindeer = true; /*Click reindeer*/
        MOD.keepfree = true; /*Keep free buildings*/

        // Triggers
        Game.registerHook("draw", autoshimmers); /*Auto Shimmers*/
        Game.registerHook("check", autowrinklers); /*Auto Wrinklers*/
        Game.registerHook("draw", savescumbuttontext); /*Save Scum Button Text*/
        Game.registerHook("draw", autocast); /*Auto Cast*/
        // Game.registerHook("check",autofortune);         /*Auto fortune clicker*/
        // Game.registerHook("draw",autodragonorb);        /*Auto dragon orb aura*/
        // Game.registerHook("check",autofortune);         /*Auto spirit of ruin pantheon*/


        //note: this mod does nothing but show a notification at the bottom of the screen once it's loaded
        Game.Notify("Helper 5000", '', [16, 5], 5);
    },
    save:function(){
        //use this to store persistent data associated with your mod
        //note: as your mod gets more complex, you should consider storing a stringified JSON instead
    },
    load:function(str){
        //do stuff with the string data you saved previously
    },
});
