// Register mod
Game.registerMod("lumpscummerv2", { //this string needs to match the ID provided in your info.txt
    init: function() {
        //this function is called as soon as the mod is registered
        let MOD = this;
        MOD.goal = 2; /*the id of the type you want - 0 normal, 1 bi, 2 gold, 3 meat, 4 carmel*/
        MOD.addition = 7; /*the amount you get for that type*/

        // Save before starting
        MOD.save = Game.WriteSave(1);

        // Get information
        MOD.count = Game.lumps;
        MOD.old = Game.lumpCurrentType;
        MOD.tries = 0;

        while (true) {
            // Click the lump (will harvest if ready)
            Game.clickLump();
            MOD.tries++;
            // await new Promise(resolve => setTimeout(resolve, 100));console.log("run") // wait 100ms

            if (Game.lumps == MOD.count) { /*If count hasnt increased (botched)*/
                console.log("Try " + MOD.tries + " - Lumps not increased");
                Game.ImportSaveCode(MOD.save);
            } else if (MOD.old == MOD.goal && !(Game.lumps - MOD.count <= MOD.addition)) { /*If old is same as goal check correct amount gotten*/
                console.log("Try " + MOD.tries + " - Lumps not increased enough: " + Game.lumps);
                Game.ImportSaveCode(MOD.save);
            } else if (Game.lumpCurrentType == MOD.goal) { /*Check new lump type*/
                Game.toSave = true;
                Game.CloseNotes();
                console.log(Game.WriteSave(1));
                Game.Notify('Done', '', [], 6000);
                break;
            } else {
                console.log("Try " + MOD.tries + " - Not right type: " + Game.lumpCurrentType);
                Game.ImportSaveCode(MOD.save);
            }
        }
    }
});
