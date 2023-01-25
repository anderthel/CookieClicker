// Register mod
Game.registerMod("savescum", { //this string needs to match the ID provided in your info.txt
    init: function() {
        //this function is called as soon as the mod is registered
        let MOD = this;

        // Add buttons
        l('storeTitle').insertAdjacentHTML('beforeend', '<a style="font-size:12px;position:absolute;bottom:2px;right:2px;display:block;" class="smallFancyButton" id="savescumbutton">Save</a>');

        // Button events
        AddEvent(l('savescumbutton'), 'click', function() {
            if (Game.keys[16] == 1) {
                Game.ImportSaveCode(MOD.savescum);
                Game.CloseNotes();
                Game.Notify('Loaded', '', [], 1);
            } else {
                MOD.savescum = Game.WriteSave(1);
                Game.Notify('Saved', '', [], 1);
            }
        })

        // Button text
        function savescumbuttontext() { /*Change text on button if shift held*/
            if (Game.keys[16] == 1) {
                l('savescumbutton').innerText = "Load";
            } else {
                l('savescumbutton').innerText = "Save";
            }
        }

        Game.registerHook("draw", savescumbuttontext);  /*Save Scum Button Text*/
        MOD.savescum = Game.WriteSave(1);               /*tigger on load*/
        Game.Notify("Save Scum loaded", '', [], 5);
    }
});