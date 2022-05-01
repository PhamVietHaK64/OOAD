var test = document.querySelector("#click")
// var input_address_from = document.querySelector('#find-address-from')
// var list_address_from = document.querySelector('.from')
// var visit_address_from = document.querySelector('.visitMapFrom')
var input_address_to = document.querySelector('#find-address-to')
var list_address_to = document.querySelector('.to')
var visit_address_to = document.querySelector('.visitMapTo')
var menu = document.querySelector('#menu')
var menuSide = document.querySelector('#menu-side')
var back = document.querySelector('.back')
// var direction = document.querySelector('#direction')
// var a = document.querySelector("#a")
var selectVehicle = document.querySelector('#vehicle')

// input_address_from.oninput = e => {
//     getSuggest(e, list_address_from)
// }

// visit_address_from.onmousedown = e => {
//     e.preventDefault()
// }

// visit_address_from.onclick = e => {
//     visitLocation(e, 0)
// }

input_address_to.oninput = e => {
    getSuggest(e, list_address_to)
}

visit_address_to.onmousedown = e => {
    e.preventDefault()
}

visit_address_to.onclick = e => {
    visitLocation(e, 1)
}

back.onclick = e => {
    hideDetails()
}

menu.onclick = e => {
    console.log(e.currentTarget)
    showDetails(e)
}

// direction.onclick = async () => {
//     getPath()
// }

// a.onclick = e => {
//     removePolyLine()
// }

selectVehicle.onchange = e => {
    // createStartPin(e.currentTarget.)
    createStartPin(e.currentTarget.selectedIndex)
}