const fs = require('fs');
const yargs = require('yargs');

const package = require('./package.json');
const stages = require('./stages.json');

let stageArg = process.argv[2];

let stageArray = stages.filter((s) => '--' + s.id === stageArg);
if(stageArray.length == 0) {
    stageArray = stages.filter((s) => s.default);
}

if(stageArray.length == 0) {
    console.log('O stage informado é inválido');
}

const stage = stageArray[0];
stage.config.version = package.version;

try {
    
    const appFile = fs.readFileSync('src/app.json');
    let app = JSON.parse(appFile);
    app.config = Object.assign(app.config, stage.config);
    fs.writeFileSync('src/app.json', JSON.stringify(app, null, 2));

} catch(e) {
    console.log('Não foi possível carregar o arquivo de configuração src/app.json')
}



