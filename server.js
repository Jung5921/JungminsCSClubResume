const express = require('express');
const fs = require('fs');
const app = express();
const port = 4000;

// Middleware to parse JSON bodies
app.use(express.json());

// Route to handle tracking visits
app.post('/track-visit', (req, res) => {
    // Read the existing visit data from the JSON file
    fs.readFile('traffic.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading visit data:', err);
            res.status(500).send('Server error');
            return;
        }

        // Parse the data and increment the visit count
        let visitData = JSON.parse(data);
        visitData.page_visits++;

        // Write the updated visit data back to the JSON file
        fs.writeFile('traffic.json', JSON.stringify(visitData), (err) => {
            if (err) {
                console.error('Error saving visit data:', err);
                res.status(500).send('Server error');
                return;
            }

            // Send back the updated count
            res.json(visitData);
        });
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
