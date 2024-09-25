const { where } = require('sequelize');
const { Environments } = require('../models');

class EnvironmentsServices {
    constructor() {
        this.model = Environments;
    }

    async pegarTodosOsRegistros() {
  
    }

    async pegarRegistroPorId(id) {
        return this.model.findByPk(id);
    }

    async criarRegistro(dadosDoRegistro) {
        return this.model.create(dadosDoRegistro);
    }

    async atualizarRegistro(dadosAtualizados, id) {
        const ListaDeRegistrosAtualizados = await this.model.update(dadosAtualizados, {
            where: { id: id }
        });
        if (ListaDeRegistrosAtualizados[0] === 0) {
            return false;
        }
        return true;
    }

    async excluirRegistro(id) {
        return this.model.destroy({ where: { id: id } });
    }
}

module.exports = EnvironmentsServices;
