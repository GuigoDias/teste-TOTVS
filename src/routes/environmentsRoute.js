const { Router } = require('express');
const EnvironmentsController = require('../controllers/EnvironmentsController.js');

const environmentsController = new EnvironmentsController();

const router = Router();

router.get('/environments', (req, res) => environmentsController.pegarTodos(req, res));
router.get('/environments/:id', (req, res) => environmentsController.pegarPorId(req, res));
router.post('/environments', (req, res) => environmentsController.criarNovo(req, res));
router.put('/environments/:id', (req, res) => environmentsController.atualizar(req, res));
router.delete('/environments/:id', (req, res) => environmentsController.excluir(req, res));

module.exports = router;