function isAfterCreation(expirationDate, instance) {
    const createdAt = new Date(instance._previousDataValues.createdAt); // Data de criação original
    const newExpirationDate = new Date(expirationDate);
  
    if (newExpirationDate < createdAt) {
      throw new Error('A data de expiração não pode ser anterior à data de criação.');
    }
  }
  

module.exports = { isAfterCreation };