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
    }
});