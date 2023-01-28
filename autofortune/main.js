// Register mod
Game.registerMod("autofortune", { //this string needs to match the ID provided in your info.txt
    init: function() {
        //this function is called as soon as the mod is registered
        let MOD = this;

        function autofortune() {
            if (Game.TickerEffect && Game.TickerEffect.type == 'fortune') {
                Game.tickerL.click();
            }
        }
        
        Game.registerHook("check",autofortune);         /*Auto fortune clicker*/
        Game.Notify("Auto Fortune Loaded", '', [], 5);
    },
    save:function(){
        //use this to store persistent data associated with your mod
        //note: as your mod gets more complex, you should consider storing a stringified JSON instead
    },
    load:function(str){
        //do stuff with the string data you saved previously
    },
});
