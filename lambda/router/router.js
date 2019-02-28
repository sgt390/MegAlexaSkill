var http = require("http");

var options = {
    host: "https://m95485wij9.execute-api.us-east-1.amazonaws.com",
    path: "/beta/user/read",
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    }
};

var req = http.request(options, function (res) {
    var responseString = "";

    res.on("data", function (data) {
        responseString += data;
        console.log("response is arrived!");
    });
    res.on("end", function () {
        console.log(responseString); 
        // print to console when response ends
    });
});

var reqBody = "somebody touched my spaghett";
req.write(reqBody);

req.end();