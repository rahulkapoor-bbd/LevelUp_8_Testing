const express = require('express');
const path = require('path');
const app = express();
const port = 3000; // You can change this to any port you prefer

// Define the directory where your static files (including index.html) are located
app.use(express.static(path.join(__dirname, 'public')));

// Define a route to handle requests to the root URL "/"
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
