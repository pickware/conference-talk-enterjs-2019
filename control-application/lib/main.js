const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 8000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', require('./routes/index.js'));

app.listen(port, () => console.log(`Control app listening on port ${port}!`));
