import express from 'express';
import cors from 'cors';
import routes from './routes';
import bodyParser from 'body-parser';
import xml2js from 'xml2js';



class app{
    constructor(){
        this.server = express(); // Inicializa o express, servidor
        this.middlewares(); // Chama a função middlewares(recebe os dados em json e permite acesso de qualquer origem)
        this.routes();
    }

    middlewares(){
        this.server.use(express.json()); // Permite que a aplicação receba dados em formato json
        this.server.use(bodyParser.text({type: 'application/xml'})); // Permite que a aplicação receba dados em formato texto/xml
        this.server.use(cors()); // Permite que a aplicação seja acessada por qualquer origem
    }

    routes(){
        this.server.use(routes.router); // Inicializa as rotas);
    }
}

export default new app().server; // Exporta a classe app e o servidor