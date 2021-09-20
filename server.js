// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
  console.log({greeting: 'hello API'});
});

//empty request
app.get("/api", (req, res) => {
  var currentDate = new Date();
  res.json({
    "unix": currentDate.getTime(),
    "utc": currentDate.toUTCString()
  });

});

app.get("/api/:date", (req, res) => {

  let date = req.params.date;
  // to handle get with an integer 
  if(parseInt(date) > 10000){
    let unix = new Date(parseInt(date));
    res.json({
      "unix": unix.getTime(),
      "utc": unix.toUTCString()

    });
  }
  let passedValue = new Date(date);
  console.log(date);

  if (passedValue == "Invalid Date"){
     res.json({"error" : "Invalid Date" });
  }else{
    res.json({
      "unix": passedValue.getTime(),
      "utc": passedValue.toUTCString()
    })
  }
  
  
});

// listen for requests :)
const listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});