// Register mod
Game.registerMod("lumpscummerv3", { //this string needs to match the ID provided in your info.txt
    init: function() {
        //this function is called as soon as the mod is registered
        let MOD = this;
        MOD.goal = 2; /*the id of the type you want - 0 normal, 1 bi, 2 gold, 3 meat, 4 carmel*/
        MOD.addition = 7; /*the amount you get for that type (must be max you can*/

        // First trigger
        MOD.waiting();

    },

    waiting: function() { /*Change text on button if shift held*/
        let MOD = this;
        
        if (Date.now() >= Game.lumpT + Game.lumpRipeAge) {
            MOD.run = true;
            MOD.savescum();
        } else {
            setTimeout(MOD.waiting(), (Game.lumpT + Game.lumpRipeAge + 1000) - Date.now());
        }
    },

    savescum: function() {
        let MOD = this;

        // Save before starting
        MOD.oldsave = Game.WriteSave(1);

        // Get information
        MOD.oldcount = Game.lumps;
        MOD.oldtype = Game.lumpCurrentType;
        MOD.tries = 0;

        // Main logic
        while (MOD.run) {
            // Click the lump (will harvest if ready)
            Game.clickLump();
            MOD.tries++;

            if (Game.lumps == MOD.oldcount) { /*If count hasnt increased (botched)*/
                console.log("Try:" + String(MOD.tries).padStart(5, ' ') + " | Type:" + Game.lumpCurrentType + " | Lumps:" + String(Game.lumps).padStart(2, ' ') + " | Count not increased");
                Game.ImportSaveCode(MOD.oldsave);
            } else if (MOD.oldtype == MOD.goal && Game.lumps - MOD.addition !== MOD.oldcount) { /*If old is same as goal check correct amount gotten*/
                console.log("Try:" + String(MOD.tries).padStart(5, ' ') + " | Type:" + Game.lumpCurrentType + " | Lumps:" + String(Game.lumps).padStart(2, ' ') + " | Lumps not increased enough");
                Game.ImportSaveCode(MOD.oldsave);
            } else if (Game.lumpCurrentType == MOD.goal) { /*Check new lump type*/
                Game.toSave = true;
                Game.CloseNotes();
                console.log(Game.WriteSave(1));
                /*MOD.save = Game.WriteSave(1);*/
                /*console.log(MOD.save);*/
                console.log("Done");
                Game.Notify('Done', '', [], 6000);
                MOD.run = false;
                /*break;*/
            } else {
                console.log("Try:" + String(MOD.tries).padStart(5, ' ') + " | Type:" + Game.lumpCurrentType + " | Lumps:" + String(Game.lumps).padStart(2, ' ') + " | Not right type");
                Game.ImportSaveCode(MOD.oldsave);
            }
        }

        // Runs once while is done
        MOD.waiting();
    }
});
