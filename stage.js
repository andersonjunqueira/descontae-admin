const fs = require('fs');
const yargs = require('yargs');

let stageArg = process.argv[2];
let stages = [];

try {
    const stagesFile = fs.readFileSync('stages.json');
    stages = JSON.parse(stagesFile);
} catch(e) {
}

let stageArray = stages.filter((s) => '--' + s.id === stageArg);
if(stageArray.length == 0) {
    stageArray = stages.filter((s) => s.default);
}

if(stageArray.length == 0) {
    console.log('O stage informado é inválido')
}

const stage = stageArray[0];
let app = undefined;

try {

    const appFile = fs.readFileSync('src/app.json');
    app = JSON.parse(appFile);
    app.config = Object.assign(app.config, stage.config);
    fs.writeFileSync('src/app.json', JSON.stringify(app, null, 2));

} catch(e) {
    console.log('Não foi possível carregar o arquivo de configuração src/app.json')
}



