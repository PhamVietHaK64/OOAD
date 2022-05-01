var vehicles
class Vehicle {
    constructor(name, location, state) {
        this.name = name
        this.location = location
        this.state = state
    }

    setLocation(location){
        this.location = location
    }

    getName() {
        return this.name
    }

    getLocation() {
        return this.location
    }

    getState() {
        return this.state
    }

    async getAddressName() {
        return await getAddress(this.location)
    }
}

function createVehicle() {
    vehicles = [new Vehicle("car", new Microsoft.Maps.Location(21.023729849592034, 105.803293897214), "Tốt"),
    new Vehicle("car 1hjdfd", new Microsoft.Maps.Location(21.027377958761136, 105.78551963954398, "Tốt"))]

    var count = 0
    vehicles.forEach(e => {
        var op = document.createElement("option")
        op.innerHTML = `${e.getName()}`
        op.setAttribute("data", count)
        selectVehicle.append(op)
    })
}

function updateVehicle(location){
    var index = selectVehicle.selectedIndex
    vehicles[index].setLocation(location)
}