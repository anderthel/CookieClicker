// Register mod
Game.registerMod("stockmode", { //this string needs to match the ID provided in your info.txt
    init: function() {
        //this function is called as soon as the mod is registered
        let MOD = this;

        MOD.modeName = {
                0: 'Stable',
                1: 'Slow Rise',
                2: 'Slow Fall',
                3: 'Fast Rise',
                4: 'Fast Fall',
                5: 'Chaotic'
            };
        // Button
        l("bankHeader").insertAdjacentHTML('beforeend', '<a style="font-size:12px;position:absolute;bottom:2px;right:2px;display:block;" class="smallFancyButton" id="stockmodebutton">Mode: Off</a>');

        // Button events
        AddEvent(l('stockmodebutton'), 'click', function() {
                if (l('stockmodebutton').innerText == "Mode: Off") {
                    l('stockmodebutton').innerText = "Mode: On";
                    MOD.printing = setInterval(function() {
                        MOD.stocks = "";
                        if (Game.ObjectsById[5].muted == 0) {
                            Game.ObjectsById[5].minigame.goodsById.forEach(function(stock) {
                                if (stock.hidden == false) {
                                    MOD.stocks += stock.symbol + ": " + loc(MOD.modeName[stock.mode]) + "<br>";
                                }
                            });
                            if (MOD.stocks != "") {
                                Game.Notify(MOD.stocks, '', [], 5);
                            }
                        }
                    }, 5000);
                } else {
                    l('stockmodebutton').innerText = "Mode: Off";
                    clearInterval(MOD.printing);
                }
            })


        // Loaded
        Game.Notify("Stock Mode Loaded", '', [], 5);
    }
});