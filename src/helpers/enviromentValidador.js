const { Environments } = require('../models');

const validateAndUpdateEnvironments = async (sequelize, usuarioId) => {
  const count = await Environments.count({
    where: { usuario_id: usuarioId, active: true }
  });

  if (count >= 2) {
    throw new Error('O usuário já tem o máximo de 2 ambientes ativos.');
  }
};

const deactivateOldEnvironments = async (sequelize, usuarioId) => {
  const activeEnvs = await Environments.findAll({
    where: { usuario_id: usuarioId, active: true },
    order: [['createdAt', 'ASC']]
  });

  if (activeEnvs.length > 2) {
    const environmentsToDeactivate = activeEnvs.slice(0, activeEnvs.length - 2);
    
    for (const env of environmentsToDeactivate) {
      env.active = false;
      await env.save();
    }
  }
};

module.exports = {
  validateAndUpdateEnvironments,
  deactivateOldEnvironments
};
