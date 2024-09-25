function createImmutableField(model, fieldName) {
  model.addHook('beforeUpdate', (instance, options) => {
    if (instance.changed(fieldName)) {
      instance.setDataValue(fieldName, instance.previous(fieldName));
      
      throw new Error('O campo ${fieldName} não pode ser alterado.')
    }
  });
}

module.exports = { createImmutableField };
