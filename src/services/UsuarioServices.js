const { Op , fn , col } = require('sequelize');
const { Usuario, Environments , sequelize } = require('../models');


class UsuarioServices {
    constructor() {
        this.model = Usuario;
    }

    async pegarTodosOsRegistros(options = {}) {
        return this.model.findAll(options);
    }

    async topCincoAreasComEnvironments() {
        return this.model.findAll({
            attributes: ['squad', [fn('SUM', col('activeEnvironments')), 'totalActiveEnvironments']],
            where: {
                active: true,
                activeEnvironments: { [Op.gt]: 0 }
            },
            group: ['squad'],
            order: [[sequelize.fn('SUM', sequelize.col('activeEnvironments')), 'DESC']],
            limit: 5,
            raw: true
        });
    }

    async pegarRegistroPorId(uuid) {
        return this.model.findByPk(uuid);
    }

    async criarRegistro(dadosDoRegistro) {
        return this.model.create(dadosDoRegistro);
    }

    async atualizarRegistro(dadosAtualizados, uuid) {
        const ListaDeRegistrosAtualizados = await this.model.update(dadosAtualizados, {
            where: { uuid: uuid }
        });
        if (ListaDeRegistrosAtualizados[0] === 0) {
            throw new Error('Usuário não encontrado.')
        }
        return true;
    }

    async excluirRegistro(uuid) {
        return this.model.destroy({ where: { uuid: uuid } });
    }

    async atualizarActiveEnvironments(uuid) {
        const contagemEnvironmentsAtivos = await Environments.count({
            where: {
                usuario_id: uuid,
                active: true
            }
        });
        await this.model.update(
            { activeEnvironments: contagemEnvironmentsAtivos },
            { where: { uuid: uuid } }
        );
    }
}

module.exports = UsuarioServices;
