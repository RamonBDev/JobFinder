import  {DataTypes} from "sequelize";
import db from "../db/connections.js";

const Job = db.define(
  "jobs",
  {
    titulo: DataTypes.STRING,
    descricao: DataTypes.STRING,
    empresa: DataTypes.STRING,
    salario: DataTypes.STRING,
    email: DataTypes.STRING,
    novo: DataTypes.INTEGER,
  },
  {
    timestamps: true,
  }
);

export default Job;
