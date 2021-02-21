const express = require('express');
const path = require('path');
const app = express();

// The Express app is exported so that it can be used by serverless Functions.

app.use(express.static(__dirname + '/dist/spaceXApp/browser'));

app.get('/*', function(req, res) {
    res.sendfile(path.join(__dirname + '/dist/spaceXApp/browser/index.html'))  
});

const port = process.env.PORT || 3000;
  // Start up the Node server
app.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
});
