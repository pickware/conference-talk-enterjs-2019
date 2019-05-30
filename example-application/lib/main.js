const adjectiveAnimal = require('adjective-animal');
const express = require('express');

const app = express();
const port = 3000;

const serverName = adjectiveAnimal.generateName();

app.get('/', (req, res) => res.send(`
<h1>Hello World from ${serverName}!</h1>
`));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
