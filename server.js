const express = require('express');
const fs = require('fs');
const app = express();
const port = 4000;

// Middleware to parse JSON bodies
app.use(express.json());

// Server test
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.use((req, res, next) => {
    // Read the traffic.json file
    fs.readFile('traffic.json', 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading traffic file:', err);
        return next(err);
      }
  
      // Parse the JSON data
      const trafficData = JSON.parse(data);
  
      // Increment the visit count
      trafficData.visits++;

      // Write the updated data back to the file
      fs.writeFile('traffic.json', JSON.stringify(trafficData), (err) => {
        if (err) {
          console.error('Error writing to traffic file:', err);
        }
      });
  
      console.log(`Traffic count updated: ${trafficData.visits} visits`);
    });
    console.log(`Request received: ${req.method} ${req.url}`);
    next();
  });




// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
