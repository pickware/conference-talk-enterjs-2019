const execSync = require('child_process').execSync;

const run = cmd => execSync(cmd, {
    stdio: 'inherit',
    cwd: `${__dirname}/../`,
});

run('docker build -t example-application:v1 .');
run('docker build -t example-application:v2 --build-arg MAIN_JS=lib/versions/main-v2.js .');
run('docker build -t example-application:v3 --build-arg MAIN_JS=lib/versions/main-v3.js .');
run('docker build -t example-application:v4 .');
