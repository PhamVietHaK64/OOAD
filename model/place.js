class Place {
    constructor(addressLine, locality, adminDistrict2, adminDistrict, fomattedAddress, name) {
        this.addressLine = addressLine ? addressLine : ""
        this.locality = locality ? locality : "" 
        this.adminDistrict = adminDistrict ? adminDistrict : ""
        this.adminDistrict2 = adminDistrict2 ? adminDistrict2 : ""
        this.fomattedAddress = fomattedAddress
        this.havename = false
        if (name) {
            this.name = name
            this.havename = true
        }
        else if (addressLine) {
            this.name = addressLine
        } else if (locality) {
            this.name = locality
        } else if (adminDistrict2) {
            this.name = adminDistrict2
        } else if (adminDistrict)
            this.name = adminDistrict
        else
            this.name = ""
    }

    getFullName() {
        return this.getAddressLine() + this.getLocality()
            + this.getAdminDistrict2() + this.adminDistrict
    }

    getAddressName() {
        return this.name
    }

    getAddressLine() {
        if (this.addressLine)
            return this.addressLine + ", "
        else
            return ""
    }

    getLocality() {
        if (this.locality)
            return this.locality + ', '
        else
            return ""
    }

    getAdminDistrict2() {
        if (this.adminDistrict2)
            return this.adminDistrict2 + ", "
        else
            return ""
    }

    getQuery() {
        // var query = "?countryRegion=Việt+Nam&maxRes=1&key=ApUQTTD7OuoyaVORYS25t6IzE0p9Pw_IVzQr1rRDycxQRf7vRRTgsOKULj3nvAL3"
        // if (this.adminDistrict)
        //     query = query + `&adminDistrict=${this.adminDistrict.replace(" ", "+")}`
        // if (this.locality)
        //     query = query + `&locality=${this.locality.replace(" ", "+")}`
        // if (this.addressLine)
        //     query = query + `&addressLine=${this.addressLine.replace(" ", "+")}`
        // if (this.adminDistrict2)
        //     query = query + `&adminDistrict2=${this.adminDistrict2.replace(" ", "+")}`
        // if (this.name)
        //     query = query + `&userLocation=${this.name.replace(" ", "+")}`
        if (this.havename)
            return this.name
        else
            return this.fomattedAddress
    }
}