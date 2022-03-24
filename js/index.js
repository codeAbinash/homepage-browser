const WALLPAPER = localStorage.getItem("homepage-browser-wallpaper-number") 
const WALLPAPER_TYPE =  localStorage.getItem("homepage-browser-wallpaper-type")

const SHORTCUTS = "homepage-browser-shortcut";
const DOM_SHORTCUT_DIV = document.getElementById("newShortcuts")
const DOM_WALLPAPER = document.getElementById("wallpaper")



let searchInput = document.getElementById("query");
let sugDiv = document.getElementById("suggestions");
let arrowKeyCount = -1;
let topDiv = document.querySelector(".top");


searchInput.onkeyup = inputNow;
searchInput.onfocus = focused;
searchInput.onblur = blurred;
searchInput.onsearch = search;
searchInput.onclick = hideSearch;




function search(){
    let txt = searchInput.value;
    if(txt.length>0){
        clean();
        hideSearch();
        openLink("https://www.google.com/search?q="+txt);
    }
}
function focused(){
    topDiv.style.paddingTop = "100px";
    showSearch();
}
function blurred(){
    topDiv.style.paddingTop = "150px";
}



function inputNow(event){
    let searchText = searchInput.value;
    let totalSuggestions = sugDiv.children.length;
    // event.preventDefault();

    switch (event.keyCode) {
        case 38://Up
            if(arrowKeyCount>0){
                arrowKeyCount--;
                searchInput.value = sugDiv.children[arrowKeyCount].innerHTML;
                colorOnce(arrowKeyCount,"u");
            }
            break;

        case 40://Down
            if(arrowKeyCount<totalSuggestions-1){
                arrowKeyCount++;
                searchInput.value =  sugDiv.children[arrowKeyCount].innerHTML;
                colorOnce(arrowKeyCount,"d");
            }
            break;

        default:
            arrowKeyCount = -1;
            showSearch();
            if(document.getElementsByTagName("script")[1])
                document.getElementsByTagName("script")[1].remove();
            
            script = document.createElement('script');
            script.src = 'https://suggestqueries.google.com/complete/search?client=chrome&q='+searchText+'&callback=searchData';
            document.body.appendChild(script);        
            break;
    }
}


function colorOnce(n=0,ud="u"){
    sugDiv.children[n].style.backgroundColor = "#00000010";
    if(ud=="u")
        sugDiv.children[n+1].style.backgroundColor = "#00000000";
    else if(n!=0){
        sugDiv.children[n-1].style.backgroundColor = "#00000000";
    }
}

function clean(){
    searchInput.value = "";
}

function hideSearch(){
    sugDiv.style.display= "none";
}
function showSearch(){
    sugDiv.style.display= "block";
}

function searchData(data){
    sugDiv.innerHTML = '';
    let searchData = data[1];
    let searchType = data[4]["google:suggesttype"];
    for(let i=0;i<searchData.length;i++){
        let searchElem = document.createElement("p");

        if(searchType[i] == 'NAVIGATION'){
            searchElem.onclick = ()=>{
                clean();
                hideSearch();
                openLink(searchData[i]);
            }
            searchElem.style.color = "dodgerBlue";
        }else{
            searchElem.onclick = ()=>{
                searchInput.focus();
                searchInput.value = searchData[i] + " ";
                inputNow(event);
            }
        }
        searchElem.innerText = searchData[i];
        sugDiv.appendChild(searchElem);
    }

}


function lucky(){
    if(searchInput.value.length!=0)
        openLink("https://google.com/search?btnI=I&q=" + searchInput.value);
}


function openLink(link="",delay=0,tab="_self"){
    setTimeout(() => {
        window.open(link,tab);
    }, delay);
}


//Load Shortcuts
function loadShortcuts(){
    let allShortcuts = localStorage.getItem(SHORTCUTS)
    if(!allShortcuts){
        return;
    }
    allShortcuts = JSON.parse(allShortcuts)

    for(let shortcut of allShortcuts){
        const DOM_SHORTCUT = document.createElement("p")
        DOM_SHORTCUT.innerText = shortcut.name
        DOM_SHORTCUT.setAttribute("onclick", `openLink('${shortcut.url}')`)
        DOM_SHORTCUT_DIV.append(DOM_SHORTCUT)
    }
    
}

loadShortcuts();
DOM_SHORTCUT_DIV.innerHTML += `<p onclick="openLink('./pages/new.html')">+</p>`;



//Apply Wallpaper if available
function loadWallpaper(){
    if(!WALLPAPER){
        DOM_WALLPAPER.remove()
        return
    }
    const wallNumber = Number(WALLPAPER)
    console.log(wallNumber);
    DOM_WALLPAPER.src = `./wallpapers/${wallNumber}.svg`
    
    
    if(WALLPAPER_TYPE==0)
        document.body.style.setProperty("--text", "#fff")
    else
        document.body.style.setProperty("--text", "#000")
}
loadWallpaper()