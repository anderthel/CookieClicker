// Register mod
Game.registerMod("autowrinker", { //this string needs to match the ID provided in your info.txt
    init: function() {
        //this function is called as soon as the mod is registered
        let MOD = this;

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

        Game.registerHook("check", autowrinklers); /*Auto Wrinklers*/
        Game.Notify("Auto Wrinklers Loaded", '', [], 5);
    },
    save:function(){
        //use this to store persistent data associated with your mod
        //note: as your mod gets more complex, you should consider storing a stringified JSON instead
    },
    load:function(str){
        //do stuff with the string data you saved previously
    },
});
