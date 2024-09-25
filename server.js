const app = require("./src/app.js");
const disableExtrasActiveEnvironments = require("./src/helpers/disableExtrasEnvironments.js");

const PORT = 3000;

app.listen(PORT, () => {
  disableExtrasActiveEnvironments()
    .then(() => {
      console.log(
        "Environments extras em relação ao permitido estarão sendo desativados!"
      );
    })
    .catch((error) => {
      console.error("Erro ao tentar desativar environments extras:", error);
    });

  console.log("servidor escutando!");
});
