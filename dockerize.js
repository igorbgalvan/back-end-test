const exec = require('await-exec')

require('dotenv').config()
 
async function dockerize () {
    await exec('docker build -t postgres-image -f Dockerfile.postgres .');
    console.log('postgres-image criado.');

    await exec('docker run -d --rm --name postgres-container postgres-image');
    console.log('postgres-container criado.');

    await exec('docker build -t node-image -f Dockerfile.node .');
    console.log('node-image criado.');

    await exec('docker run -d -p 4000:4000 --rm --name node-container node-image');
    console.log('node-container criado.');

    await exec('docker exec -i node-container yarn sequelize db:migrate');
    console.log('migrations executado.');
    
    await exec('docker exec -i node-container yarn sequelize db:seed:all');
    console.log('seeds de teste executado.');
    
    console.log('app rodando na porta ' + process.env.APP_PORT);
}
 
dockerize()