const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const routerTarefa = require('./routes/tarefas');

app.use(bodyParser.json());

app.get('/', (req, res) => {    
    res.status(200).send('Running...');
});

////////////////////////Rotas das tarefas
app.use('/tarefas', routerTarefa)

app.listen(4000);