const WALLPAPER = "homepage-browser-wallpaper-number"
const WALLPAPER_TYPE = "homepage-browser-wallpaper-type"
const DOM_WALLPAPERS = document.querySelectorAll(".wallpapers img")

function setWallpaper(index,type){
    let prevIndex = Number(localStorage.getItem(WALLPAPER));
    localStorage.setItem(WALLPAPER, index)
    localStorage.setItem(WALLPAPER_TYPE, type)
    
    

    DOM_WALLPAPERS[index].style.borderColor = "var(--color)"
    if(index!=prevIndex)
        DOM_WALLPAPERS[prevIndex].style.borderColor = "transparent";
}


function removeWallpaper(){
    let prevIndex = Number(localStorage.getItem(WALLPAPER));
    x = confirm("Remove Wallpaper?")
    if(!x)
        return
    localStorage.setItem(WALLPAPER, "")
    localStorage.setItem(WALLPAPER_TYPE, "")
    alert("Wallpaper Removed")
    DOM_WALLPAPERS[prevIndex].style.borderColor = "transparent";
}

function loadCurrentWallpaper(){
    let WP = localStorage.getItem(WALLPAPER)
    if(!WP)
        return
    WP = Number(WP);
    DOM_WALLPAPERS[WP].style.borderColor = "var(--color)"
}
loadCurrentWallpaper()


