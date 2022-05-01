const bing_map_key = "AlBNU0mQXvdQU1b1JTEi5YZElIvaX3TFP5ov3pR_5Xq4pl2XEDA3mccLe3fClWZ3"
var address = [null, null]
var add_address = [false, false]
// var input = [input_address_from, input_address_to]
var input = [0, input_address_to]
var infobox = [null, null]
var map

function GetMap() {
    map = new Microsoft.Maps.Map('#map', {
        center: new Microsoft.Maps.Location(21.032857804598823, 105.83215941068394),
        mapTypeId: Microsoft.Maps.MapTypeId.road,
        zoom: 16,
        showMapTypeSelector: false,
        showBreadcrumb: true,
        navigationBarMode: Microsoft.Maps.NavigationBarMode.square,
        showLocateMeButton: false
    })

    createVehicle()
    createStartPin(0)
    Microsoft.Maps.Events.addHandler(map, 'rightclick', async function(e){
        // var finish = false
        map.layers.clear()
        document.querySelector("#details").innerHTML = ""
        var name = await getAddress(e.location)
        createPushpin(e.location.latitude, e.location.longitude, 1, name)
        input[1].value = name
        //getPath()
        // for (var i = 0; i < 2; i++){
        //     if(!address[i]){
        //         createPushpin(e.location.latitude, e.location.longitude, i, name)
        //         input[i].value = name
        //         finish = true;
        //         break;
        //     }
        // }

        // if(!finish){
        //     for (var i = 0; i < 2; i++){
        //         if(!add_address[i]){
        //             createPushpin(e.location.latitude, e.location.longitude, i, name)
        //             input[i].value = name
        //             finish = true;
        //             break;
        //         }
        //     }
        // }


    })
}

function addSuggest(resources, input) {
    var fullAddress = ""
    var nameAddress = ""
    var p = new Place(resources.address.addressLine, resources.address.locality,
        resources.address.adminDistrict2, resources.address.adminDistrict, resources.address.formattedAddress, resources.name)
    // console.log(p.name)
    fullAddress = p.getFullName()
    nameAddress = p.getAddressName()
    var li = document.createElement('li')
    li.className = "suggestElememt"
    li.setAttribute('data', p.getQuery())
    li.innerHTML = `
    <label class="nameAddress">${nameAddress}</label></br>
    <label class="fullAddress">${fullAddress}</label>
    <hr>`
    li.onclick = e => {
        input.blur()
        // if(input == input_address_from)
        //     getGeo(e, 0)
        /* else */ 
        if(input == input_address_to){
            getGeo(e, 1)
            // map.layers.clear()
            // getPath()
            // visitPin(address[1])
        }
        // getPath()
        input.value = e.currentTarget.querySelector(".nameAddress").textContent
    }
    li.onmousedown = e => {
        e.preventDefault()
    }
    return li
}

function getGeo(e, index) {
    var latitude;
    var longitude;
    var address_data = e.currentTarget.getAttribute('data')
    fetch("http://dev.virtualearth.net/REST/v1/Locations?" + new URLSearchParams({
        query: address_data,
        maxResults: 1,
        key: bing_map_key
    }))
        .then(res => res.json())
        .then(data => {
            data.resourceSets.forEach(element => {
                latitude = element.resources[0].point.coordinates[0]
                longitude = element.resources[0].point.coordinates[1]
                createPushpin(latitude, longitude, index, address_data)
                console.log(address_data)
                // visitPin(address[index])
            })
        })
}

async function getAddress(location){
    var res = await fetch(`http://dev.virtualearth.net/REST/v1/Locations/${location.latitude},${location.longitude}?` + 
    new URLSearchParams({
        key: bing_map_key
    }))
    var data = await res.json()
    var name = data.resourceSets[0].resources[0].name;
    var namearr = name.split(',')
    namearr.pop()
    var length = namearr.length
    var length_str = namearr[length - 1].length
    namearr[length - 1] = namearr[length - 1].substr(0, length_str - 6)
    return namearr.join(", ")
}

function createPushpin(latitude, longitude, index, des) {
    // add_address[index] = true
    // add_address[(index + 1) % 2] = false
    console.log(des)
    if (address[index]) {
        map.entities.remove(address[index])
    }
    // console.log(latitude, longitude)
    var location = new Microsoft.Maps.Location(latitude, longitude)
    // console.log(location)
    var color = "red"
    var title = "Điểm đến"
    if (!index){
        color = "green"
        title = "Điểm xuất phát"
    }

    var pin = new Microsoft.Maps.Pushpin(location, {
        color: color
    })

    var info
    if(index){
        console.log("1")
        info = new Microsoft.Maps.Infobox(location, {
            title: title,
            description: des,
            visible: false
        })
    }else{
        console.log("0")
        info = new Microsoft.Maps.Infobox(location, {
            title: title,
            description: des,
            visible: false,
            actions: [{
                label: 'Bắt Đầu',
                eventHandler: () => {
                    console.log("start")
                    setMove()
                }
            }]
        })
    }

    infobox[index] = info
    console.log(info)

    Microsoft.Maps.Events.addHandler(pin, 'mouseover', e => {
        info.setOptions({
            visible: true
        })
    })

    Microsoft.Maps.Events.addHandler(pin, 'mouseout', e => {
        info.setOptions({
            visible: false
        })
    })

    info.setMap(map)
    map.entities.push(pin)
    address[index] = pin
    if(index || (!index && address[1]) ){
        //console.log("d")
        map.layers.clear()
        getPath()
    }
}

function getSuggest(e, list) {
    list.innerHTML = ""
    if (e.target.value != "")
        fetch("http://dev.virtualearth.net/REST/v1/Autosuggest?" + new URLSearchParams({
            key: bing_map_key,
            query: e.target.value,
            ur: "VN",
            c: "vi",
            cf: "VN",
            o: "JSON"
        }))
            .then(res => res.json())
            .then(data => {
                console.log(data)
                data.resourceSets.forEach(element => {
                    element.resources.forEach(data => {
                        data.value.forEach(element1 => {
                            list.append(addSuggest(element1, e.target))
                        })
                    })
                })
            })
}

function visitLocation(e, index){
    if(address[index]){
        map.setView({
            center: address[index].getLocation()
        })
        e.target.blur()
    }
}

function visitPin(pin){
    map.setView({
        center: pin.getLocation()
    })
}

async function createStartPin(index){
    var vehicle = vehicles[index] 
    var location = vehicle.getLocation()
    createPushpin(location.latitude, location.longitude, 0,await vehicle.getAddressName())
    visitPin(address[0])
}
