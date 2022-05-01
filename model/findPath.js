var currentRoute = [];

function getPath() {
    console.log("a")
    showDetails()
    if (address[0] && address[1]) {
        var directionManager
        Microsoft.Maps.loadModule('Microsoft.Maps.Directions', () => {
            directionManager = new Microsoft.Maps.Directions.DirectionsManager(map)
            directionManager.clearAll()
            directionManager.clearDisplay()
            var start = new Microsoft.Maps.Directions.Waypoint({ location: address[0].getLocation() })
            var end = new Microsoft.Maps.Directions.Waypoint({ location: address[1].getLocation() })
            directionManager.addWaypoint(start)
            directionManager.addWaypoint(end)
            directionManager.setRenderOptions({
                itineraryContainer: "#details",
                firstWaypointPushpinOptions: {
                    visible: false
                },
                lastWaypointPushpinOptions: {
                    visible: false
                },
            })
            Microsoft.Maps.Events.addHandler(directionManager, 'directionsUpdated', e => {
                currentRoute = directionManager.getCurrentRoute().routePath
                // map.layers.forEach(e => {
                //     console.log(e)
                // })
                console.log(map.layers)
            })
            directionManager.calculateDirections()

        })
    }
}

function setMove(){
    console.log(currentRoute)
    if (currentRoute && address[1]){
        input_address_to.disabled = true
        selectVehicle.disabled = true
        hideSuggestRoute()
        map.layers.clear()
        currentRoute.push(address[1].getLocation())
        var line = new Microsoft.Maps.Polyline(currentRoute, {
            strokeColor: "blue",
            strokeThickness: 6
        })
        map.entities.push(line)
        var length = currentRoute.length
        var i = 0
        var id = setInterval(async () => {
            if (i < length){
                // map.entities.remove(address[0])

                address[0].setLocation(currentRoute[i])
                var des = await getAddress(currentRoute[i])
                infobox[0].setOptions({
                    title: "Phương tiện đang di chuyển",
                    description: des,
                    actions: []
                })
                infobox[0].setLocation(currentRoute[i])
                i++
            }else{
                clearInterval(id)
                map.entities.remove(line)
                map.entities.remove(address[1])
                updateVehicle(address[1].getLocation())
                infobox[0].setMap(null)
                infobox[1] = null
                address[1] = null
                createStartPin(selectVehicle.selectedIndex)
                selectVehicle.disabled = false
                input_address_to.disabled = false
                clearDetails()
            }
        }, 2000)
    }
}