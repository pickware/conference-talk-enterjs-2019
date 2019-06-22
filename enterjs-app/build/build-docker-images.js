const execSync = require('child_process').execSync;

const run = cmd => execSync(cmd, {
    stdio: 'inherit',
    cwd: `${__dirname}/../`,
});

run('docker build -t enterjs-app:v1 --build-arg APP_VERSION=v1 .');
run('docker build -t enterjs-app:v2 --build-arg APP_VERSION=v2 --build-arg MAIN_JS=lib/versions/main-v2.js .');
run('docker build -t enterjs-app:v3 --build-arg APP_VERSION=v3 --build-arg MAIN_JS=lib/versions/main-v3.js .');
run('docker build -t enterjs-app:v4 --build-arg APP_VERSION=v4 .');
