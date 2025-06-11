import  Sequelize  from "sequelize";

const db = new Sequelize({
  dialect: "sqlite",
  storage: "./db/script.db"
});

export default db;