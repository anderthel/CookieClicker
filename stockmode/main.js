// Register mod
Game.registerMod("stockmode", { //this string needs to match the ID provided in your info.txt
    init: function() {
        //this function is called as soon as the mod is registered
        let MOD = this;

        MOD.modeName = {
                0: ['Stable', "128,128,128"],
                1: ['Slow Rise', "0,153,0"],
                2: ['Slow Fall', "128,30,128"],
                3: ['Fast Rise', "0,200,0"],
                4: ['Fast Fall', "128,10,128"],
                5: ['Chaotic', "255, 0, 0"]
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
                                    MOD.stocks += '<h3 style="background-color:rgb(' + loc(MOD.modeName[stock.mode])[1] + ');">' + stock.symbol + ": " + loc(MOD.modeName[stock.mode])[0] + "</h3><br>";
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
    },
    save:function(){
        //use this to store persistent data associated with your mod
        //note: as your mod gets more complex, you should consider storing a stringified JSON instead
    },
    load:function(str){
        //do stuff with the string data you saved previously
    },
});
