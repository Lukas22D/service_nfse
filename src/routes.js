import { Router } from "express";
import nfse_controller from "./controllers/nfse_controller";


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
  /**
   * @method routes
   * Função responsável por criar as rotas da aplicação
   */
  routes() {
    // Rota inicial
    this.router.get("/", (req, res) => { 
      return res.json({ message: "ON!" });
    });

    // Rota de teste
    this.router.post("/teste",  nfse_controller.create_consult);
  }
}

export default new routes(); // Exporta a classe routes e o router