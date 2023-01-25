// Register mod
Game.registerMod("autocast", { //this string needs to match the ID provided in your info.txt
    init: function() {
        //this function is called as soon as the mod is registered
        let MOD = this;

        // Spell to cast
        MOD.spell = "hand of fate";

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

        Game.registerHook("draw", autocast); /*Auto Cast*/
        Game.Notify("Auto Cast Loaded", '', [], 5);
    }
});