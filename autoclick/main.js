// Register mod
Game.registerMod("autoclick", { //this string needs to match the ID provided in your info.txt
    init: function() {
        //this function is called as soon as the mod is registered
        let MOD = this;

        // Clicks per second
        MOD.cps = 6;                                /*cps from test*/
        MOD.delay = Math.floor(1000 / MOD.cps);     /*convert to delay*/

        setInterval(function() {
            if (Game.BigCookieState == 2) {     /*Only click when mouse hovering*/
                Game.ClickCookie();
            }
        }, MOD.delay);


        Game.Notify("Auto Click Loaded", '', [], 5);
    }
});