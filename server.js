const express = require('express');
const app = express();
require('dotenv').config()

// enable CORS
const cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// load static files
app.use(express.static('public'));

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint...
app.get('/api/hello', function(req, res) {
	res.json({ greeting: 'Hello API' });
});

// get timestamp endpoint
app.get('/api/:date', function(req, res) {
  let dateString = req.params.date
 
  // process date in ISO Date Format
  if (isNaN(Number(dateString))) {
    let date = new Date(dateString)

    if (date ==  "Invalid Date") {
      res.json({error: 'Invalid Date'})
      return
    }
    res.json({"unix": date.valueOf(), "utc": date.toUTCString()})
    return 
  }

  // process date in millisecond
  let date =  new Date(Number(dateString))
  res.json({"unix": date.valueOf(), "utc": date.toUTCString()})
})

// get current time endpoint
app.get('/api/', function(req, res) {
  let date = new Date()
  res.json({unix: date.valueOf(), utc: date.toUTCString()})
})

// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
	console.log('Your app is listening on port ' + listener.address().port);
});
