function isAfterCreation(expirationDate, instance) {
  if (expirationDate === null) {
    throw new Error("O campo expirationDate não pode ser nulo.");
  }

  const createdAt = new Date(instance._previousDataValues.createdAt);
  const previousExpirationDate = new Date(
    instance._previousDataValues.expirationDate
  );
  const newExpirationDate = new Date(expirationDate);

  if (newExpirationDate < createdAt) {
    throw new Error(
      "A data de expiração não pode ser anterior à data de criação."
    );
  }

  if (newExpirationDate < previousExpirationDate) {
    throw new Error(
      "A nova data de expiração não pode ser anterior à data de expiração anterior."
    );
  }
}
