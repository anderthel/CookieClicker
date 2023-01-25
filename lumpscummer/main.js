// Register mod
Game.registerMod("lumpscummer", { //this string needs to match the ID provided in your info.txt
    init: function() {
        //this function is called as soon as the mod is registered
        let MOD = this;
        MOD.goal = 2; /*the id of the type you want - 0 normal, 1 bi, 2 gold, 3 meat, 4 carmel*/
        MOD.addition = 7; /*the amount you get for that type*/

        // Click the lump (will harvest if ready)
        MOD.count = Game.lumps;
        MOD.old = Game.lumpCurrentType;
        Game.clickLump;

        // If botched then reload
        if (Game.lumps == MOD.count) {
            window.location.reload();
        }

        // If old is same as goal check correct amount gotten
        if (MOD.old == MOD.goal && Game.lumps - MOD.addition != MOD.count) {
            window.location.reload();
        }

        // Check new lump type
        if (Game.lumpCurrentType == MOD.goal) {
            Game.toSave = true;
            Game.Notify('Done', '', [], 60);
        } else {
            window.location.reload();
        }
    }
});