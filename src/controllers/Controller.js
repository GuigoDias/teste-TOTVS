const usuario = require("../models/usuario");

class Controller {
    constructor (entidadeService) {
        this.entidadeService = entidadeService;
    }

    async pegarTodos(req, res) {
        try {
            const listaDeRegistro = await this.entidadeService.pegarTodosOsRegistros();

            return res.status(200).json(listaDeRegistro);
        } catch(erro){
            console.error(erro);
            res.status(500).json({ mensagem: 'Erro na busca.'});
        }
    }

    async pegarPorId(req, res){
        const { id } = req.params;
        try{
            const registro = await this.entidadeService.pegarRegistroPorId(id);

            return res.status(200).json(registro);
        } catch(erro){
            console.error(erro);
            res.status(500).json({ mensagem: 'Erro na busca.'});
        }
    }

    async criarNovo(req, res) {
        const dadosParaCriacao = req.body;
        try {
            const novoRegistro = await this.entidadeService.criarRegistro(dadosParaCriacao);
            return res.status(200).json(novoRegistro);
        } catch(erro){
            console.error(erro);
            res.status(500).json({ mensagem: 'Erro na criação.'});
        }
    }

    async atualizar(req, res) {
        const { id } = req.params;
        const dadosAtualizados = req.body;
        try{
            const foiAtualizado = await this.entidadeService.atualizarRegistro(dadosAtualizados,id);
            if (!foiAtualizado) {
                return res.status(400).json({ mensagem: 'registro não foi atualizado.'});
            }
            return res.status(200).json({ mensagem: 'Atualizado com sucessso.'})
        } catch( erro ){
            console.error(erro);
            res.status(500).json({ mensagem: 'Erro na atualização.'});
        }
    }

    async excluir(req, res){
        const { id } = req.params;
        try{
            await this.entidadeService.excluirRegistro(id);
            return res.status(200).json({ mensagem: 'id ${id} deletado'})
        } catch(erro){
            console.error(erro);
        }
    }

    
}

module.exports = Controller;