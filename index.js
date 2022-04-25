//javascript.js

//create map

var map = new Microsoft.Maps.Map('#googleMap', {
    credentials: 'ApUQTTD7OuoyaVORYS25t6IzE0p9Pw_IVzQr1rRDycxQRf7vRRTgsOKULj3nvAL3',
    center: new Microsoft.Maps.Location(51.50632, -0.12714),
    mapTypeId: Microsoft.Maps.MapTypeId.aerial,
    zoom: 10
});
//create a DirectionsService object to use the route method and get a result for our request
var directionsService = new Microsoft.Maps.DirectionsService();

//create a DirectionsRenderer object which we will use to display the route
var directionsDisplay = new Microsoft.Maps.DirectionsRenderer();

//bind the DirectionsRenderer to the map
directionsDisplay.setMap(map);


//define calcRoute function
function calcRoute() {
    //create request
    var request = {
        origin: document.getElementById("from").value,
        destination: document.getElementById("to").value,
        travelMode: Microsoft.Maps.TravelMode.DRIVING, //WALKING, BYCYCLING, TRANSIT
        unitSystem: Microsoft.Maps.UnitSystem.IMPERIAL
    }

    //pass the request to the route method
    directionsService.route(request, function (result, status) {
        if (status == Microsoft.Maps.DirectionsStatus.OK) {

            //Get distance and time
            const output = document.querySelector('#output');
            output.innerHTML = "<div class='alert-info'>From: " + document.getElementById("from").value + ".<br />To: " + document.getElementById("to").value + ".<br /> Driving distance <i class='fas fa-road'></i> : " + result.routes[0].legs[0].distance.text + ".<br />Duration <i class='fas fa-hourglass-start'></i> : " + result.routes[0].legs[0].duration.text + ".</div>";

            //display route
            directionsDisplay.setDirections(result);
        } else {
            //delete route from map
            directionsDisplay.setDirections({ routes: [] });
            //center map in London
        

            //show error message
            output.innerHTML = "<div class='alert-danger'><i class='fas fa-exclamation-triangle'></i> Could not retrieve driving distance.</div>";
        }
    });

}



//create autocomplete objects for all inputs
var options = {
    types: ['(cities)']
}

var input1 = document.getElementById("from");
var autocomplete1 = new Microsoft.Maps.places.Autocomplete(input1, options);

var input2 = document.getElementById("to");
var autocomplete2 = new Microsoft.Maps.places.Autocomplete(input2, options);

$(document).ready(function () {
    $("#to").autocomplete({
        source: function (request, response) {
            $.ajax({
                url:"https://dev.virtualearth.net/REST/v1/Locations",
                dataType: "jsonp",
                data: {
                    key: "ApUQTTD7OuoyaVORYS25t6IzE0p9Pw_IVzQr1rRDycxQRf7vRRTgsOKULj3nvAL3",
                    q: request.term
                },
                jsonp: "jsonp",
                success: function (data) {
                    var result = data.resourceSets[0];
                    if (result) {
                        if (result.estimatedTotal > 0) {
                            response($.map(result.resources, 
                               function(item) {
                                return {
                                    data: item,
                                    label: item.name + ' (' + 
                              item.address.countryRegion + ')',
                                    value: item.name
                                }
                            }));
                        }
                    }
                }
            });
        },
        minLength: 1,
        change: function (event, ui) {
            if (!ui.item)
                $("#to").val('');
        },
        select: function (event, ui) {
            displaySelectedItem(ui.item.data);
        }
    })
});