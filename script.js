import express from "express";
import db from "./db/connections.js";
import jobsRoutes from "./routes/jobs.js";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import { engine } from "express-handlebars";
import Job from "./models/Job.js";
import { Op } from "sequelize";
await db.sync();
const app = express();
const PORT = 3000;

//inniciando arquivos json
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//testanto servidor
app.listen(PORT, () => {
  console.log("Server is running on port 3000");
});

//conecaxao db
db.authenticate()
  .then(() => {
    console.log(
      "Connection to the database has been established successfully."
    );
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

//rota inicial da pagina
app.get("/", (req, res) => {
  let search = req.query.job;
  let query = '%'+search+'%';

  if (!search) {
    Job.findAll({ order: [["createdAt", "DESC"]] }).then((jobs) => {
      res.render("index", { jobs });
    })
     .catch(err => console.log(err));
   
  } else {
    Job.findAll({ where:{titulo:{[Op.like]: query }} ,order: [["createdAt", "DESC"]] }).then((jobs) => {
      res.render("index", { jobs, search });
    })
     .catch(err => console.log(err));
  }
});

//carregando as rotas do jobs
app.use("/jobs", jobsRoutes);

//static folder
app.use(express.static(path.join(__dirname, "public")));

// handle bars
app.engine("handlebars", engine({ defaultLayout: "main" })); //definindo o layout usado em todas as pag, como main
app.set("view engine", "handlebars"); //carregando o handlebars
app.set("views", path.join(__dirname, "views"));
