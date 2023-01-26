// Register mod
Game.registerMod("stockmode", { //this string needs to match the ID provided in your info.txt
    init: function() {
        //this function is called as soon as the mod is registered
        let MOD = this;

        // Button
        l("bankHeader").insertAdjacentHTML('beforeend', '<a style="font-size:12px;position:absolute;bottom:2px;right:2px;display:block;" class="smallFancyButton" id="stockmode">Mode: Off</a>');

        // Button events
        AddEvent(l('stockmode'), 'click', function() {
                if (l('savescumbutton').innerText == "Mode: Off") {
                    l('savescumbutton').innerText = "Mode: On";
                    MOD.printing = setInterval(function() {
                        MOD.stocks = "";
                        if (Game.ObjectsById[5].muted == 0) {
                            Game.ObjectsById[5].minigame.goodsById.forEach(function(stock) {
                                if (stock.hidden == false) {
                                    MOD.stocks += stock.symbol + ": " + loc(modeName[stock.mode]) + "<br>";
                                }
                            });
                            if (MOD.stocks != "") {
                                Game.Notify(MOD.stocks, '', [], 5);
                            }
                        }
                    }, 5000);
                } else {
                    l('savescumbutton').innerText = "Mode: Off";
                    clearInterval(MOD.printing);
                }
            })


        // Loaded
        Game.Notify("Stock Mode Loaded", '', [], 5);
    }
});