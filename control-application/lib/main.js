const express = require('express');
const bodyParser = require('body-parser');

const asyncHelper = require('./async-helper.js');

const app = express();
const port = 8000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', asyncHelper(require('./routes/index.js')));
app.post('/default-deployment', asyncHelper(require('./routes/create-deployment.js')));

// Error handler
app.use((err, req, res, next) => {
    console.error('Caught error:', err);
    next(err);
});

app.listen(port, () => console.log(`Control app listening on port ${port}!`));
