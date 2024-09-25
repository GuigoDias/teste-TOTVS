const EnvironmentsServices = require('../services/EnvironmentsServices.js');

class EnvironmentsController {
    constructor() {
        this.entidadeService = new EnvironmentsServices();
    }

    async pegarTodos(req, res) {
        try {
            const listaDeRegistro = await this.entidadeService.pegarTodosOsRegistros();
            return res.status(200).json(listaDeRegistro);
        } catch (erro) {
            console.error(erro);
            res.status(500).json({ mensagem: 'Erro na busca.' });
        }
    }

    async pegarPorId(req, res) {
        const { id } = req.params;
        try {
            const registro = await this.entidadeService.pegarRegistroPorId(id);
            return res.status(200).json(registro);
        } catch (erro) {
            console.error(erro);
            res.status(500).json({ mensagem: 'Erro na busca.' });
        }
    }

    async criarNovo(req, res) {
        const dadosParaCriacao = req.body;
        try {
            const novoRegistro = await this.entidadeService.criarRegistro(dadosParaCriacao);
            return res.status(200).json(novoRegistro);
        } catch (erro) {
            console.error(erro);
            res.status(500).json({ mensagem: 'Erro na criação.' });
        }
    }

    async atualizar(req, res) {
        const { id } = req.params;
        const dadosAtualizados = req.body;
        try {
            const foiAtualizado = await this.entidadeService.atualizarRegistro(dadosAtualizados, id);
            if (!foiAtualizado) {
                return res.status(400).json({ mensagem: 'Registro não foi atualizado.' });
            }
            return res.status(200).json({ mensagem: 'Atualizado com sucesso.' });
        } catch (erro) {
            console.error(erro);
            res.status(500).json({ mensagem: 'Erro na atualização.' });
        }
    }

    async excluir(req, res) {
        const { id } = req.params;
        try {
            // sistema de exclusão funcional
            // await this.entidadeService.excluirRegistro(id);
            // return res.status(200).json({ mensagem: `id ${id} deletado` });

            return res.status(500).json({ mensagem: 'A exclusão de dados não está permitida!' });
        } catch (erro) {
            console.error(erro);
        }
    }
}

module.exports = EnvironmentsController;
