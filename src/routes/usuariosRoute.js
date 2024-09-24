const { Router } = require('express');
const UsuarioController = require('../controllers/UsuarioController.js');

const usuarioController = new UsuarioController();

const router = Router();

router.get('/usuarios', (req, res) => usuarioController.pegarTodos(req, res));
router.get('/usuarios/:id', (req, res) => usuarioController.pegarPorId(req, res));
router.post('/usuarios', (req, res) => usuarioController.criarNovo(req, res));
router.put('/usuarios/:id', (req, res) => usuarioController.atualizar(req, res));
router.delete('/usuarios/:id', (req, res) => usuarioController.excluir(req, res));

module.exports = router;