const { where } = require("sequelize");
const { Environments } = require("../models");

class EnvironmentsServices {
  constructor() {
    this.model = Environments;
  }

  async pegarTodosOsRegistros() {}

  async pegarRegistroPorId(id) {
    return this.model.findByPk(id);
  }

  async criarRegistro(dadosDoRegistro) {
    return this.model.create(dadosDoRegistro);
  }

  async atualizarEnvironments(id, dadosAtualizacao) {
    const environment = await this.model.findByPk(id);

    if (!environment) {
      throw new Error("Ambiente não encontrado");
    }

    return environment.update(dadosAtualizacao);
  }

  async excluirRegistro(id) {
    return this.model.destroy({ where: { id: id } });
  }
}

module.exports = EnvironmentsServices;
