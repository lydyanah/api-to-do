const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const { Tarefa } = require('./models');

app.use(bodyParser.json());

app.get('/', (req, res) => {    
    res.send('Running...');
});

////////////////////////Rotas das tarefas

app.post('/tarefas', async (req, res) => {
    const tarefa = await Tarefa.create(req.body);
    res.json(tarefa);
});

app.get('/tarefas', async (req, res) => {
    const tarefas = await Tarefa.findAll();
    res.json(tarefas);
});

app.get('/tarefas/:id', async (req, res) => {
    const tarefa = await Tarefa.findAll({
        where: {
            id: req.params.id
        }
    });
    res.json(...tarefa);
});

app.delete('/tarefas/:id', async (req, res) => {
    const result = await Tarefa.destroy({
        where: {
            id: req.params.id   
        }
    });
    res.json(result);
});

app.put('/tarefas/:id', async (req, res) => {
    const tarefa = await Tarefa.update(req.body,{
        where: {
            id: req.params.id   
        }
    });
    res.json(tarefa);
});

app.listen(4000);