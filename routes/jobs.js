//rotas do jobs

import express from "express";
const Router = express.Router();
import Job from "../models/Job.js";
import { where } from "sequelize";

//teste
Router.get("/teste", (req, res) => {
  res.send("Rota de teste de jobs");
});

//detalhe da vaga
Router.get("/view/:id", (req, res) =>
  Job.findOne({
    where: { id: req.params.id },
  })
    .then((job) => {
      res.render("view", { job });
    })
    .catch((err) => console(log(err)))
);

//add job via get
Router.get("/add", (req, res) => {
  res.render("add");
});

//add job via post
Router.post("/add", (req, res) => {
  let { titulo, descricao, empresa, salario, email, novo } = req.body;
  Job.create({
    titulo,
    descricao,
    empresa,
    salario,
    email,
    novo,
  })
    .then(() => res.redirect("/"))
    .catch((err) => console.log(err));
});

export default Router;
