const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const { Tarefa } = require('./models');

app.use(bodyParser.json());

app.get('/', (req, res) => {    
    res.status(200).send('Running...');
});

////////////////////////Rotas das tarefas

app.post('/tarefas', async (req, res) => {

    try {
        const tarefa = await Tarefa.create(req.body);
        res.status(201).json(tarefa);        
    } catch (error) {
        res.status(500).json({message: 'Erro interno no servidor'}); 
    }

});

app.get('/tarefas', async (req, res) => {

    try {
        const tarefas = await Tarefa.findAll();
        res.status(200).json(tarefas);
    } catch (error) {
        res.status(500).json({message: 'Erro interno no servidor'});
    }
  
});

app.get('/tarefas/:id', async (req, res) => {

    try {
        const tarefa = await Tarefa.findAll({
        where: {
            id: req.params.id
        }
        });
        if (tarefa.length == 0) {
            res.status(404).json({ message: 'Tarefa não encontrada' });  
        }
        res.status(200).json(...tarefa);
    } catch (error) {
        res.status(500).json({message: 'Erro interno no servidor'});
    }
    
});

app.delete('/tarefas/:id', async (req, res) => {

    try {
        const result = await Tarefa.destroy({
            where: {
                id: req.params.id   
            }
        });
        if (result == 0) {
            res.status(404).json({ message: 'Tarefa não encontrada' });  
        }
        res.status(200).json({message:'Tarefa removida com sucesso'});   
    } catch (error) {
        res.status(500).json({message: 'Erro interno no servidor'});
    }
    
});

app.put('/tarefas/:id', async (req, res) => {

    try {
        const result = await Tarefa.update(req.body,{
            where: {
                id: req.params.id   
            }
        });
        if (result[0] == 0) {
            res.status(404).json({ message: 'Tarefa não encontrada' });  
        }
        res.status(200).json('Tarefa atualizada com sucesso!');        
    } catch (error) {
        res.status(500).json({message: 'Erro interno no servidor'});
    }

});

app.listen(4000);