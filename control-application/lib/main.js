const express = require('express');
const bodyParser = require('body-parser');

const asyncHelper = require('./async-helper.js');

const app = express();
const port = 8000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/dashboard', asyncHelper(require('./routes/dashboard.js')));

app.post('/default-deployment', asyncHelper(require('./routes/create-deployment.js')));
app.post('/create-blue-green-deployment', require('./routes/create-blue-green-deployment.js'));
app.post('/prepare-canary-deployment', require('./routes/prepare-canary-deployment.js'));
app.post('/add-canary-deployment', require('./routes/add-canary-deployment.js'));

app.delete('/deployments/:name', asyncHelper(require('./routes/delete-deployment.js')));
app.post('/deployments/:name/scale/:scale', asyncHelper(require('./routes/scale-deployment.js')));
app.post(
    '/deployments/:name/container/:container/image/:image',
    asyncHelper(require('./routes/update-deployment-image.js'))
);
app.delete('/services/:name', asyncHelper(require('./routes/delete-service.js')));
app.post('/services/:name/selector/:selector', asyncHelper(require('./routes/update-service-selector.js')));
app.delete('/ingresses/:name', asyncHelper(require('./routes/delete-ingress.js')));

// Error handler
app.use((err, req, res, next) => {
    console.error('Caught error:', err);
    next(err);
});

app.listen(port, () => console.log(`Control app listening on port ${port}!`));
