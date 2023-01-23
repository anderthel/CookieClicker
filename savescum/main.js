// Register mod
Game.registerMod("savescum", { //this string needs to match the ID provided in your info.txt
    init: function() {
        //this function is called as soon as the mod is registered
        let MOD = this;

        //Add in save button
        l('storeTitle').insertAdjacentHTML('beforeend', '<a style="font-size:12px;position:absolute;bottom:2px;right:2px;display:block;" class="smallFancyButton" id="savescumbutton">Save</a>');

        //Click detector
        AddEvent(l('savescumbutton'), 'click', function() {
            if (Game.keys[16] == 1) {
                Game.ImportSaveCode(MOD.savescum);
                Game.CloseNotes();
                Game.Notify('Loaded', '', [], 1);
            } else {
                MOD.savescum = Game.WriteSave(1);
                Game.Notify('Saved', '', [], 1);
            }
        });

        function buttontext() {
            if (Game.keys[16] == 1) {
                l('savescumbutton').innerText = "Load";
            } else {
                l('savescumbutton').innerText = "Save";
            }
        }

        // Add shift hook
        Game.registerHook("draw",buttontext)

        //note: this mod does nothing but show a notification at the bottom of the screen once it's loaded
        Game.Notify("Save Scum Loaded", '', [16, 5]);
    },
    save: function() {
        //use this to store persistent data associated with your mod
        // return String(this.savescum);
    },
    load: function(str) {
        //do stuff with the string data you saved previously
        // this.savescum = str;
    },
});
