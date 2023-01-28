// Register mod
Game.registerMod("autoshimmers", { //this string needs to match the ID provided in your info.txt
    init: function() {
        //this function is called as soon as the mod is registered
        let MOD = this;

        // Toggles
        MOD.golden = true; /*Click golden cookies*/
        MOD.reindeer = true; /*Click reindeer*/

        function autoshimmers() {
            Game.shimmers.forEach(function(shimmer) {
                if (shimmer.type == "golden" && MOD.golden == true && shimmer.wrath == 0) { /*Normal cookies*/
                    shimmer.pop();
                } else if (shimmer.type === "reindeer" && MOD.reindeer) { /*Reindeer*/
                    shimmer.pop();
                }
            })
        }

        Game.registerHook("draw", autoshimmers); /*Auto Shimmers*/
        Game.Notify("Auto Shimmers Loaded", '', [], 5);

    },
    save:function(){
        //use this to store persistent data associated with your mod
        //note: as your mod gets more complex, you should consider storing a stringified JSON instead
    },
    load:function(str){
        //do stuff with the string data you saved previously
    },
});
