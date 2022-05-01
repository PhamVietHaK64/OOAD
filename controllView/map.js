function showDetails(){
    if (!menuSide.style.width){
        menu.style.display = "none"
        menuSide.style.width = getComputedStyle(document.documentElement).getPropertyValue("--width-mobile")    
    }
}

function hideDetails(){
    menuSide.style.width = ""
    menu.style.display = "flex"
}

function hideSuggestRoute(){
    var lis = document.querySelectorAll("li:not(.selected)")
    lis.forEach(e => {
        e.style.display = "none"
    })
}

function clearDetails(){
    document.querySelector("#details").innerHTML = ""
}

