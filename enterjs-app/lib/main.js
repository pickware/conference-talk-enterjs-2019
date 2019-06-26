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
    <link 
        rel="stylesheet" 
        href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" asfsadf
        crossorigin="anonymous">
    <style type="text/css" media="screen">
        body {
            min-height: 100vh;
            font-size: 200%;
        }
    </style>
</head>
<body class="d-flex flex-column justify-content-center">
    <div class="container-fluid d-flex flex-column">
        <div class="jumbotron text-center py-5">
            <h1 class="display-1">${name ? `Hello ${name}!` : 'Hello World!'}</h1>
        
            <form class="pt-4 w-25 mx-auto" method="post">
                <div class="form-group">
                    <label for="nameInput">What's your name?</label>
                    <input type="text" class="form-control" name="name" id="nameInput"/>
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>
    </div>
    <p class="text-muted text-center w-100">
        Server
        <span class="text-primary">${serverName}</span> 
        running version
        <span class="text-success">${version}</span>.
    </p>
</body>
</html>
`;

app.get('/', (req, res) => res.send(indexTemplate()));

app.post('/', (req, res) => res.send(indexTemplate(req.body.name)));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
