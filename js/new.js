const SHORTCUTS = "homepage-browser-shortcut";

class Shortcut{
    #name
    #url
    constructor(name="",url=""){
        this.#name = name.trim();
        this.#url = url.trim();
    }
    save(){
        if(!this.#error())
            return
        let allShortcuts = localStorage.getItem(SHORTCUTS)
        allShortcuts = allShortcuts?JSON.parse(allShortcuts) : []   
        this.s = {
            "name" : this.#name,
            "url" : this.#url
        }
        allShortcuts.push(this.s);
        localStorage.setItem(SHORTCUTS, JSON.stringify(allShortcuts))
        //Have to be fixed
        window.location.replace("../","_SELF")
    }

    #error(){
        if(this.#name.length==0)
            alert("Shortcut name cannot be empty.")
        else if(this.#url.length==0)
            alert("Shortcut url cannot be empty.")
        else
            return true
        return false
    }
}



function newShortcut(){
    const SHORTCUT_NAME = document.getElementById("name").value
    const URL = document.getElementById("url").value
    const s = new Shortcut(SHORTCUT_NAME,URL);
    s.save();
}
