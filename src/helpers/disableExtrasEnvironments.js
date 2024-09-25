const { Usuario } = require("../models");

async function disableExtrasActiveEnvironments() {
  const usuarios = await Usuario.findAll();

  for (const usuario of usuarios) {
    const activeEnvironmentsCount = await usuario.countEnvironments({
      where: { active: true },
    });

    if (activeEnvironmentsCount > 2) {
      const extraEnvironments = await usuario.getEnvironments({
        where: { active: true },
        order: [["createdAt", "ASC"]],
      });

      const extraCount = activeEnvironmentsCount - 2;
      for (let i = 0; i < extraCount; i++) {
        if (extraEnvironments[i]) {
          await extraEnvironments[i].update({ active: false });
        }
      }
    }
  }
}

module.exports = disableExtrasActiveEnvironments;
