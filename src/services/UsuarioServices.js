const { Model, where } = require('sequelize');
const Services = require('./Services');
const dataSource = require('../models');

class UsuarioServices extends Services {
    constructor() {
        super('Usuario', dataSource);
    }

    async pegarRegistroPorNome(name){
        return dataSource[this.model].findOne( { where: { name }});
    }

    async desativarEnvironmentsExtras(id){
        const usuario = await dataSource[this.model].findOne({
            where: { uuid : id },
            include: [{
                model: dataSource.Environments,
                where: { active: true },
            }],
        });

        if(usuario && usuario.Environments.length > 2){
            const ambientesParaDesativar = usuario.Environments.slice(2);
            await Promise.all(ambientesParaDesativar.map(env =>
                dataSource.Environment.update({ active: false },
                    { where: {id: env.id }})
            ));
        }
    }
}

module.exports = UsuarioServices;