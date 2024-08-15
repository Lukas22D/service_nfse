import { Router } from "express";


/**
* Class responsabilidade de criar as rotas da aplicação
* @class routes
* @methodo routes - Responsável por criar as rotas da aplicação
*/
class routes {
  constructor() {
    this.router = Router(); // Inicializa o router
    this.routes(); // Chama a função routes
  }

  routes() {
    // Rota inicial
    this.router.get("/", (req, res) => { 
      return res.json({ message: "ON!" });
    });

    // Rota de teste
    this.router.post("/teste", (req, res) => {
      if(req.is("application/xml")){
        return res.json({ message: "XML!"});
      }else{
        return res.status(400).json({ message:'d' });
      }
    });
  }
}

export default new routes(); // Exporta a classe routes e o router