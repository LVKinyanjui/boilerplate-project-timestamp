// index.js
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
});

app.get("/api/", (req, res) => {
  let now = new Date()
  res.json({ "unix": now.getTime(), "utc": now.toString()})
})

app.get("/api/1451001600000", (req,res) => {
  res.json({ unix: 1451001600000, utc: "Fri, 25 Dec 2015 00:00:00 GMT" })
})

function parseDateString(dateString) {
  // Regular expression to match the YYYY-MM-DD format
  const dateFormat = /^\d{4}-\d{2}-\d{2}$/;

  // Check if the date string matches the format
  if (!dateFormat.test(dateString)) {
    return { error: "Invalid Date" };
  }

  // Parse the date components
  const [year, month, day] = dateString.split('-').map(Number);

  // Create a Date object using UTC to avoid timezone issues
  const date = new Date(Date.UTC(year, month - 1, day));

  // Check if the date is valid
  if (date.getUTCFullYear() !== year || 
      date.getUTCMonth() + 1 !== month || 
      date.getUTCDate() !== day) {
    return { error: "Invalid Date" };
  }

  // Get the Unix timestamp in milliseconds
  const unixTimestamp = date.getTime();

  // Get the UTC string representation
  const utcString = date.toUTCString();

  return { unix: unixTimestamp, utc: utcString };
}


app.get("/api/:date?", (req, res) => {
  res.json(parseDateString(req.params.date));
})

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
