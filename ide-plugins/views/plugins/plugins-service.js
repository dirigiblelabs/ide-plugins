var httpClient = require("http/v4/client");
var response = require("http/v4/response");


let httpResponse = httpClient.get("https://www.dirigible.io/depots.json");
let depots = JSON.parse(httpResponse.text);
depots.forEach(function (depot) {
    httpResponse = httpClient.get(depot.depot);
    let plugins = JSON.parse(httpResponse.text);
    depot.plugins = plugins;
});

response.println(JSON.stringify(depots));
response.flush();
response.close();

