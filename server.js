var express = require('express');
var http = require('http');
var path = require('path');

var app = express();

app.use(express.static(__dirname + '/'));

app.get('/', function(req, res) {
    console.log('called page!')

});

app.get('/currentRoutes', function(req, res) {
    // Make the API calls
    var options = {
        host: 'www.bt4u.org',
        path: '/webservices/bt4u_webservice.asmx/GetCurrentRoutes'
    };

    // Append the recieved chunks to the output String
    callback = function(response) {
        var str = '';

        response.on('data', function(chunk) {
            str += chunk;
        });

        // Print the whole responce
        response.on('end', function() {
            console.log("Request: /currentRoutes")

            var parseString = require('xml2js').parseString;
            parseString(str, function(err, result) {
                res.send(result);
            });

        });
    }

    http.request(options, callback).end();

});

app.get('/currentBuses', function(req, res) {
    // Make the API calls
    var options = {
        host: 'www.bt4u.org',
        path: '/webservices/bt4u_webservice.asmx/GetCurrentBusInfo'
    };

    // Append the recieved chunks to the output String
    callback = function(response) {
        var str = '';

        response.on('data', function(chunk) {
            str += chunk;
        });

        // Print the whole responce
        response.on('end', function() {
            console.log("Request: /currentBuses")

            var parseString = require('xml2js').parseString;
            parseString(str, function(err, result) {
                res.send(result);
            });

        });
    }

    http.request(options, callback).end();

});

var server = app.listen(8080, function() {

    console.log("Server successfully started!");
});