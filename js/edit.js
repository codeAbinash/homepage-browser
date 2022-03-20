const SHORTCUTS = "homepage-browser-shortcut"
const SHORTCUT_DOM = document.getElementById("allShortcuts")


function loadAllShortcuts(){
    let shortcuts = localStorage.getItem(SHORTCUTS)

    if(!shortcuts){
        SHORTCUT_DOM.innerHTML = "<p>No Shortcut Found</p>"
        return
    }
    shortcuts = JSON.parse(shortcuts)
    if(shortcuts.length==0){
        SHORTCUT_DOM.innerHTML = "<p>No Shortcut Found</p>"
        return
    }

    for(let i in shortcuts){
        const S = document.createElement("div")
        const name = document.createElement("span")
        const del = document.createElement("span")    

        S.classList.add("shortcut","touch")

        name.id = "name"
        name.textContent = shortcuts[i].name;
        
        del.id = "delete"
        del.setAttribute("onclick", `deleteByIndex(${i})`)
        del.textContent = "Delete"
        S.append(name)
        S.append(del)
        SHORTCUT_DOM.append(S);   
    }
}
loadAllShortcuts();


function deleteByIndex(index = 0){
    x = confirm("Are you sure to want to delete this shortcut?")
    if(!x)
        return
    let shortcuts = JSON.parse(localStorage.getItem(SHORTCUTS))
    shortcuts.splice(index,1);
    localStorage.setItem(SHORTCUTS, JSON.stringify(shortcuts))

    const DOM_ALL_SHORTCUTS = document.querySelectorAll(".allShortcuts .shortcut")
    DOM_ALL_SHORTCUTS[index].remove()
    if(DOM_ALL_SHORTCUTS.length == 1){
        SHORTCUT_DOM.innerHTML = "<p>No Shortcut Found</p>"
    }
}