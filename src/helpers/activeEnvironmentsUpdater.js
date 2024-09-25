async function updateActiveEnvironments(sequelize, usuarioId) {
  const environments = await sequelize.models.Environments.count({
    where: {
      usuario_id: usuarioId,
      active: true,
    },
  });

  await sequelize.models.Usuario.update(
    { activeEnvironments: environments },
    { where: { uuid: usuarioId } }
  );
}

module.exports = { updateActiveEnvironments };
