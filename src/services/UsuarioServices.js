const { Op, fn, col } = require("sequelize");
const { Usuario, sequelize } = require("../models");

class UsuarioServices {
  constructor() {
    this.model = Usuario;
  }

  async pegarTodosOsRegistros(options = {}) {
    return this.model.findAll(options);
  }

  async topCincoAreasComEnvironments() {
    return this.model.findAll({
      attributes: [
        "squad",
        [fn("SUM", col("activeEnvironments")), "totalActiveEnvironments"],
      ],
      where: {
        active: true,
        activeEnvironments: { [Op.gt]: 0 },
      },
      group: ["squad"],
      order: [
        [sequelize.fn("SUM", sequelize.col("activeEnvironments")), "DESC"],
      ],
      limit: 5,
      raw: true,
    });
  }

  async pegarRegistroPorId(uuid) {
    return this.model.findByPk(uuid);
  }

  async criarRegistro(dadosDoRegistro) {
    return this.model.create(dadosDoRegistro);
  }

  async atualizarUsuario(uuid, dadosAtualizacao) {
    const usuario = await this.model.findByPk(uuid);

    if (!usuario) {
      throw new Error("Usuário não encontrado");
    }

    return usuario.update(dadosAtualizacao);
  }

  async excluirRegistro(uuid) {
    return this.model.destroy({ where: { uuid: uuid } });
  }
}

module.exports = UsuarioServices;
