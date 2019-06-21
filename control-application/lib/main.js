const express = require('express');
const bodyParser = require('body-parser');

const asyncHelper = require('./async-helper.js');

const app = express();
const port = 8000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', asyncHelper(require('./routes/index.js')));
app.post('/default-deployment', asyncHelper(require('./routes/create-deployment.js')));
app.delete('/deployments/:name', asyncHelper(require('./routes/delete-deployment.js')));
app.delete('/services/:name', asyncHelper(require('./routes/delete-service.js')));
app.delete('/ingresses/:name', asyncHelper(require('./routes/delete-ingress.js')));

app.post('/create-blue-green-deployment', require('./routes/create-blue-green-deployment.js'));
app.post('/fix-blue-green-bug', require('./routes/fix-blue-green-bug.js'));
app.post('/move-green-to-production', require('./routes/move-green-to-production.js'));

// Error handler
app.use((err, req, res, next) => {
    console.error('Caught error:', err);
    next(err);
});

app.listen(port, () => console.log(`Control app listening on port ${port}!`));
