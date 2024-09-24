function isAfterCreation(expirationDate, instance){
    if(new Date(expirationDate) < new Date(instance.createdAt)){
        throw new Error('A data de expiração não pode ser anterior à data de criação.');
    }
};

module.exports = { isAfterCreation };