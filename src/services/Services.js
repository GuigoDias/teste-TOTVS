const { where } = require('sequelize');
const dataSource = require('../models');

class Services {
    constructor(nomeDoModel){
        this.model = nomeDoModel;
    }

    async pegarTodosOsRegistros(){
        return dataSource[this.model].findAll();
    }

    async pegarRegistroPorId(id){
        return dataSource[this.model].findByPk(id);
    }

    async criarRegistro(dadosDoRegistro){
        return dataSource[this.model].create(dadosDoRegistro);
    }

    async atualizarRegistro(dadosAtualizados, id) {
        const ListaDeRegistrosAtualizados = dataSource[this.model].update(dadosAtualizados,
            {where: { id: id }
        });
        if(ListaDeRegistrosAtualizados[0] === 0) {
            return false;
        }
        return true;
    }

    async excluirRegistro(id){
        return dataSource[this.model].destroy({ where: { id: id }});
    }

    async atualizarActiveEnvironments(id){
        const contagemEnvironmentsAtivos = await dataSource['Environments'].count(
            { where: {
                usuario_id: id,
                active: true
            }
        });
        await dataSource[this.model].update(
            { activeEnvironments: contagemEnvironmentsAtivos },
            { where: { uuid: id } });
    }
}

module.exports = Services;