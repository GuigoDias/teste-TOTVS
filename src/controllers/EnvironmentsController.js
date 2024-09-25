const EnvironmentsServices = require("../services/EnvironmentsServices.js");

class EnvironmentsController {
  constructor() {
    this.entidadeService = new EnvironmentsServices();
  }

  async pegarTodos(req, res) {
    try {
      const listaDeRegistro =
        await this.entidadeService.pegarTodosOsRegistros();
      return res.status(200).json(listaDeRegistro);
    } catch (erro) {
      console.error(erro);
      res.status(500).json({ mensagem: "Erro na busca." });
    }
  }

  async pegarPorId(req, res) {
    const { id } = req.params;
    try {
      const registro = await this.entidadeService.pegarRegistroPorId(id);
      return res.status(200).json(registro);
    } catch (erro) {
      console.error(erro);
      res.status(500).json({ mensagem: "Erro na busca." });
    }
  }

  async criarNovo(req, res) {
    const dadosParaCriacao = req.body;
    const tiposPermitidos = ["erp", "sgbd"];
    if (
      dadosParaCriacao.softwareType &&
      !tiposPermitidos.includes(dadosParaCriacao.softwareType)
    ) {
      return res.status(400).json({
        mensagem: 'Tipo de software inválido. Deve ser "erp" ou "sgbd".',
      });
    }
    try {
      const novoRegistro = await this.entidadeService.criarRegistro(
        dadosParaCriacao
      );
      return res.status(200).json(novoRegistro);
    } catch (erro) {
      console.error(erro);
      res.status(500).json({ mensagem: "Erro na criação." });
    }
  }

  async atualizar(req, res) {
    const { id } = req.params;
    const dadosAtualizacao = req.body;

    const camposPermitidos = ["active", "softwareType", "expirationDate"];
    const dadosFiltrados = {};

    for (const campo of camposPermitidos) {
      if (dadosAtualizacao[campo] !== undefined) {
        if (
          campo === "active" &&
          typeof dadosAtualizacao[campo] !== "boolean"
        ) {
          return res
            .status(400)
            .json({ mensagem: 'O campo "active" deve ser true ou false.' });
        }
        dadosFiltrados[campo] = dadosAtualizacao[campo];
      }
    }

    try {
      const environmentAtualizado =
        await this.entidadeService.atualizarEnvironments(id, dadosFiltrados);
      return res.status(200).json(environmentAtualizado);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async excluir(req, res) {
    const { id } = req.params;
    try {
      // sistema de exclusão funcional
      // await this.entidadeService.excluirRegistro(id);
      // return res.status(200).json({ mensagem: `id ${id} deletado` });

      return res
        .status(500)
        .json({ mensagem: "A exclusão de dados não está permitida!" });
    } catch (erro) {
      console.error(erro);
    }
  }
}

module.exports = EnvironmentsController;
