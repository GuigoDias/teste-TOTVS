function createImmutableField(model, fieldName) {
    model.addHook('beforeValidate', (instance) => {
      if (instance.changed(fieldName)) {
        throw new Error(`O campo ${fieldName} é imutável e não pode ser alterado.`);
      }
    });
  }

module.exports = { createImmutableField };