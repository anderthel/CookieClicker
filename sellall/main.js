// Register mod
Game.registerMod("sellall", { //this string needs to match the ID provided in your info.txt
    init: function() {
        //this function is called as soon as the mod is registered
        let MOD = this;

        // Toggle
        MOD.keepfree = true;

        // Button
        l('storeBulk').insertAdjacentHTML('beforeend', '<a style="font-size:12px;position:absolute;bottom:2px;right:2px;display:block;" class="smallFancyButton" id="sellall">Sell All</a>');

        // Button events
        AddEvent(l('sellall'), 'click', function() {
                Game.ObjectsById.forEach(function(building) {
                    if (MOD.keepfree == true) {
                        if (building.amount - building.free >= 1) {
                            building.sell(building.amount - building.free);
                        }
                    } else {
                        building.sell(999999);
                    }
                })
            })

        // Loaded
        Game.Notify("Sell All Button Loaded", '', [], 5);
    },
    save:function(){
        //use this to store persistent data associated with your mod
        //note: as your mod gets more complex, you should consider storing a stringified JSON instead
    },
    load:function(str){
        //do stuff with the string data you saved previously
    },
});
