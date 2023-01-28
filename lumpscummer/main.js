// Register mod
Game.registerMod("lumpscummer", { //this string needs to match the ID provided in your info.txt
    init: function() {
        //this function is called as soon as the mod is registered
        let MOD = this;
        MOD.goal = 2; /*the id of the type you want - 0 normal, 1 bi, 2 gold, 3 meat, 4 carmel*/
        MOD.addition = 5; /*the amount you get for that type*/

        // Click the lump (will harvest if ready)
        MOD.count = Game.lumps;
        MOD.old = Game.lumpCurrentType;
        Game.clickLump();

        if (Game.lumps == MOD.count) { /*If count hasnt increased (botched)*/
            window.location.reload();
            console.log("Lumps not increased");
        } else if (MOD.old == MOD.goal && MOD.count + MOD.addition <= Game.lumps) { /*If old is same as goal check correct amount gotten*/
            window.location.reload();
            console.log("Lumps not increased enough");
        } else if (Game.lumpCurrentType == MOD.goal) { /*Check new lump type*/
            Game.toSave = true;
            Game.Notify('Done', '', [], 6000);
            console.log(Game.WriteSave(1));
        } else {
            window.location.reload();
            console.log("Not right type: " + Game.lumpCurrentType);
        }
    }
});
