import express from "express";
import cors from "cors";
import "reflect-metadata";
import  AppDataSource  from "./config/data-source.js";

import  userRouter  from "./routes/User.routes.js";
import  productRouter  from "./routes/Product.routes.js";
import  movementRouter  from "./routes/Movement.routes.js";
import mid from "./service/mid-auth.js";


const app = express();

app.use(cors());
app.use(express.json());

// Middleware de autenticação coloquei aqui testar se ta funcionando
app.use(mid);

app.use( userRouter);
app.use( productRouter);
app.use( movementRouter);



AppDataSource.initialize()
  .then(() => {
    console.log(" Banco conectado com sucesso!");

    app.listen(process.env.PORT || 3000, () => {
      console.log("🚀 Servidor rodando na porta 3000!");
    });
  })
  .catch((err) => {
    console.error("Erro ao iniciar o Data Source:", err);
  });

export default app;


