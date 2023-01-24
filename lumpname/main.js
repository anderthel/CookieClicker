// Register mod
Game.registerMod("lumpname", { //this string needs to match the ID provided in your info.txt
    init: function() {
        //this function is called as soon as the mod is registered
        let MOD = this;

        MOD.getLumpName = function(){
            var name = "";
            if(Game.lumpCurrentType == 0) {// Normal
                name = "Normal";
            } else if(Game.lumpCurrentType == 1) {// Bifurcated
                name = "Bifurcated";
            } else if(Game.lumpCurrentType == 2) {// Golden
                name = "Golden";
            } else if(Game.lumpCurrentType == 3) {// Meaty
                name = "Meaty";
            } else if(Game.lumpCurrentType == 4) {// Caramelized
                name = "Caramelized";
            }
            return name;
        }

        Game.Notify(MOD.getLumpName(), '', [], 5);

    },
    //save: function() {
        //use this to store persistent data associated with your mod
        // return String(this.savescum);
    //},
    //load: function(str) {
        //do stuff with the string data you saved previously
        // this.savescum = str;
    //},
});
