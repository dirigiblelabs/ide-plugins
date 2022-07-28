var httpClient = require("http/v4/client");
var request = require("http/v4/request");
var response = require("http/v4/response");

let url = request.getParameter("url");
if (url) {
    let httpResponse = httpClient.get(url);
    response.println(httpResponse.text);
    response.flush();
    response.close();
}
