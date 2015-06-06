var bus_marker;
var map;

function initialize() {
    var mapOptions = {
        center: {
            lat: 37.227992,
            lng: -80.421507
        },
        zoom: 15,

        panControl: true,
        zoomControl: true,
        mapTypeControl: false,
        scaleControl: true,
        streetViewControl: false,
        overviewMapControl: false,
        scrollwheel: false,

        mapTypeId: google.maps.MapTypeId.ROADMAP,

        styles: [{
            "featureType": "water",
            "stylers": [{
                "saturation": 43
            }, {
                "lightness": -11
            }, {
                "hue": "#0088ff"
            }]
        }, {
            "featureType": "road",
            "elementType": "geometry.fill",
            "stylers": [{
                "hue": "#ff0000"
            }, {
                "saturation": -100
            }, {
                "lightness": 99
            }]
        }, {
            "featureType": "road",
            "elementType": "geometry.stroke",
            "stylers": [{
                "color": "#808080"
            }, {
                "lightness": 54
            }]
        }, {
            "featureType": "landscape.man_made",
            "elementType": "geometry.fill",
            "stylers": [{
                "color": "#ece2d9"
            }]
        }, {
            "featureType": "poi.park",
            "elementType": "geometry.fill",
            "stylers": [{
                "color": "#ccdca1"
            }]
        }, {
            "featureType": "road",
            "elementType": "labels.text.fill",
            "stylers": [{
                "color": "#767676"
            }]
        }, {
            "featureType": "road",
            "elementType": "labels.text.stroke",
            "stylers": [{
                "color": "#ffffff"
            }]
        }, {
            "featureType": "poi",
            "stylers": [{
                "visibility": "off"
            }]
        }, {
            "featureType": "landscape.natural",
            "elementType": "geometry.fill",
            "stylers": [{
                "visibility": "on"
            }, {
                "color": "#b8cb93"
            }]
        }, {
            "featureType": "poi.park",
            "stylers": [{
                "visibility": "on"
            }]
        }, {
            "featureType": "poi.sports_complex",
            "stylers": [{
                "visibility": "on"
            }]
        }, {
            "featureType": "poi.medical",
            "stylers": [{
                "visibility": "on"
            }]
        }, {
            "featureType": "poi.business",
            "stylers": [{
                "visibility": "simplified"
            }]
        }]
    };

    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

}

google.maps.event.addDomListener(window, 'load', initialize);

getRouteData();

function getRouteData() {
    var data_request = new XMLHttpRequest();
    data_request.onreadystatechange = function() {
        if (data_request.readyState == 4 && data_request.status == 200) {

            createRoutes(JSON.parse(data_request.responseText));
        }
    }

    data_request.open("GET", "/currentRoutes", true);
    data_request.send();
}

function createRoutes(json) {
    var element = document.getElementById("routes");
    var routes = json['DocumentElement']['CurrentRoutes']

    for (var i = 0; i < routes.length; i++) {

        var route_label = document.createElement('label');
        var route_input = document.createElement('input');
        route_input.value = routes[i]['RouteShortName'][0];
        route_input.type = "checkbox";

        route_label.appendChild(route_input);

        route_label.innerHTML += routes[i]['RouteName'][0];

        element.appendChild(route_label);
    }

}

getBusData();

function getBusData() {

    var data_request = new XMLHttpRequest();
    data_request.onreadystatechange = function() {
        if (data_request.readyState == 4 && data_request.status == 200) {

            plotBuses(JSON.parse(data_request.responseText));
        }
    }

    data_request.open("GET", "/currentBuses", true);
    data_request.send();

}

function plotBuses(json) {
    var buses = json['DocumentElement']['LatestInfoTable'];

    for (var i = 0; i < buses.length; i++) {
        var location = new google.maps.LatLng(buses[i]['Latitude'][0], buses[i]['Longitude'][0]);

        var marker = new RichMarker({
            position : location,
            map : map,
            content : '<div class="' + "bus" + '"></div>',
        });
    }

    console.log(buses);
}