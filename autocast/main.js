// Register mod
Game.registerMod("autocast", { //this string needs to match the ID provided in your info.txt
    init: function() {
        //this function is called as soon as the mod is registered
        let MOD = this;

        // Spell to cast
        MOD.spell = "hand of fate";

        // With buffs only
        MOD.bufftoggle = true;

        // Button
        l("grimoireContent").insertAdjacentHTML('beforeend', '<a style="font-size:12px;position:absolute;bottom:2px;right:2px;display:block;" class="smallFancyButton" id="autocastbutton">Cast: On</a>');

        // Button events
        AddEvent(l('autocastbutton'), 'click', function() {
            if (l('autocastbutton').innerText == "Cast: Off") {
                l('autocastbutton').innerText = "Cast: On";
                Game.registerHook("draw", autocast); /*Auto Cast*/
            } else {
                l('autocastbutton').innerText = "Cast: Off";
                Game.removeHook('draw', autocast);
            }
        })

        function autocast() {
            MOD.wiz = Game.ObjectsById[7].minigame;
            if (MOD.wiz.magic == MOD.wiz.magicM) { /*if magic is full*/
                if (MOD.bufftoggle == true) { /*if toggle on do tests*/
                    MOD.buffcount = 0;
                    for (key in Game.buffs) { /*count buffs*/
                        MOD.buffcount++
                    };
                    if (MOD.buffcount >= 1) { /*if at least 1 buff then cast*/
                        MOD.wiz.castSpell(MOD.wiz.spells[MOD.spell]);
                    }
                } else {
                    MOD.wiz.castSpell(MOD.wiz.spells[MOD.spell]); /*if toggle off cast*/
                }
                if (MOD.spell == "hand of fate") { /*if hand of fate*/
                    Game.shimmers.forEach(function(shimmer) {
                        if ((shimmer.type == "golden") && (shimmer.wrath == 0)) {
                            shimmer.pop();
                        }
                    });
                }
            }
        }

        Game.registerHook("draw", autocast); /*Auto Cast*/
        Game.Notify("Auto Cast Loaded", '', [], 5);
    },
    save: function() {
        //use this to store persistent data associated with your mod
        //note: as your mod gets more complex, you should consider storing a stringified JSON instead
    },
    load: function(str) {
        //do stuff with the string data you saved previously
    },
});
