const process = require('process');
const adjectiveAnimal = require('adjective-animal');
const express = require('express');
const bodyParser = require('body-parser');

process.on('SIGTERM', () => {
    console.info('SIGTERM signal received.');
    setTimeout(() => process.exit(0), 5000);
});

const app = express();
const port = 8080;
const serverName = adjectiveAnimal.generateName();
const version = process.env.VERSION || 'development';

app.use(bodyParser.urlencoded({ extended: true }));

const indexTemplate = name => `
<!DOCTYPE html>
<html>

<head>
    <title>${serverName}</title>
</head>

<h1>
    ${name ? `Hello ${name}!` : 'Hello World!'}
</h1>

<form method="post">
    <label>
        What's your name?
        <input type="text" name="name"/>
    </label>
    <input type="submit"/>
</form>

<p>
    Server <em>${serverName}</em> running version <em>${version}</em>.
</p>

</html>
`;

app.get('/', (req, res) => res.send(indexTemplate()));

// eslint-disable-next-line no-undef
app.post('/', (req, res) => res.send(indexTemplte(req.body.name)));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
