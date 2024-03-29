// Register mod
Game.registerMod("lumpscummerv2", { //this string needs to match the ID provided in your info.txt
    init: function() {
        //this function is called as soon as the mod is registered
        let MOD = this;
        MOD.goal = 2; /*the id of the type you want - 0 normal, 1 bi, 2 gold, 3 meat, 4 carmel*/
        MOD.addition = 7; /*the amount you get for that type (must be max you can*/

        // Save before starting
        MOD.oldsave = Game.WriteSave(1);

        // Get information
        MOD.oldcount = Game.lumps;
        MOD.oldtype = Game.lumpCurrentType;
        MOD.tries = 0;

        // condition
        MOD.run = true;

        while (MOD.run) {
            // Click the lump (will harvest if ready)
            Game.clickLump();
            MOD.tries++;
            // await new Promise(resolve => setTimeout(resolve, 100));console.log("run") // wait 100ms

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
    },
    save:function(){
        //use this to store persistent data associated with your mod
        //note: as your mod gets more complex, you should consider storing a stringified JSON instead
    },
    load:function(str){
        //do stuff with the string data you saved previously
    },
});
