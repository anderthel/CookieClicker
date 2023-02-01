// Register mod
Game.registerMod("autopledge", { //this string needs to match the ID provided in your info.txt
    init: function() {
        //this function is called as soon as the mod is registered
        let MOD = this;

        function autopledge() {
            if (Game.pledgeT == 0) {
                Game.UpgradesById[74].click();
            }
        }
        
        Game.registerHook("check",autopledge);         /*Auto fortune clicker*/
        Game.Notify("Auto Pledge Loaded", '', [], 5);
    },
    save:function(){
        //use this to store persistent data associated with your mod
        //note: as your mod gets more complex, you should consider storing a stringified JSON instead
    },
    load:function(str){
        //do stuff with the string data you saved previously
    },
});
