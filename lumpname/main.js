// Register mod
Game.registerMod("lumpname", { //this string needs to match the ID provided in your info.txt
    init: function() {
        //this function is called as soon as the mod is registered
        let MOD = this;

    setInterval(function() {
        if (Game.lumpCurrentType == 0) {
            // Normal
            Game.Notify("Normal", '', [29, 14], 0.5);
        } else if (Game.lumpCurrentType == 1) {
            // Bifurcated
            Game.Notify("Bifurcated", '', [29, 15], 0.5);
        } else if (Game.lumpCurrentType == 2) {
            // Golden
            Game.Notify("Golden", '', [29, 16], 0.5);
        } else if (Game.lumpCurrentType == 3) {
            // Meaty
            Game.Notify("Meaty", '', [29, 17], 0.5);
        } else if (Game.lumpCurrentType == 4) {
            // Caramelized
            Game.Notify("Caramelized", '', [29, 27], 0.5);
        }
    }, 500);
    }
});
