const adjectiveAnimal = require('adjective-animal');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 8080;
const serverName = adjectiveAnimal.generateName();

app.use(bodyParser.urlencoded({extended: true}));

let indexTemplate = name => `
<!DOCTYPE html>
<html>

<head>
    <title>${serverName}</title>
</head>

<h1>
${name ? `Hello ${name} from ${serverName}!` : `Hello World from ${serverName}!`}
</h1>
    
<form method="post">
    <label>
        What's your name?
        <input type="text" name="name"/>
    </label>
    <input type="submit"/>
</form>

</html>
`;

app.get('/', (req, res) => res.send(indexTemplate()));

app.post('/', (req, res) => res.send(indexTemplate(req.body.name)));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
