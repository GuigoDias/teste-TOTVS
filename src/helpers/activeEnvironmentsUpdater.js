const updateActiveEnvironments = async (sequelize, usuarioId) => {
    const Environments = sequelize.models.Environments;
    const Usuario = sequelize.models.Usuario;
  
    const totalAtivos = await Environments.count({
      where: {
        usuario_id: usuarioId,
        active: true
      }
    });
  
    const usuario = await Usuario.findByPk(usuarioId);
    if (usuario) {
      await usuario.update({ activeEnvironments: totalAtivos });
    }
  };
  
  module.exports = updateActiveEnvironments;
  