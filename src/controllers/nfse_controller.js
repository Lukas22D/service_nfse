import nfseServiceBarueri from "../services/nfse_service_barueri";
import nfseServiceSaoPaulo from "../services/nfse_service_saopaulo";

class NfseController {
    
    async create_consult(req, res) {
        try{
            const {cnpj , data_inicio, data_fim } = req.body;
            const result = await nfseServiceSaoPaulo.consultaNFeRecebidas(cnpj ,data_inicio , data_fim);
            return res.status(result.status).json(result.message);
        }catch(error){
            console.log(error);
            return res.status(400).json({ message: 'Erro ao consultar o webservice: ', error });
        }
    }

};

export default new NfseController(); // Exporta a classe NfseController