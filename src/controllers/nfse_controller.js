import nfseServiceBarueri from "../services/nfse_service_barueri";
import nfseServiceSaoPaulo from "../services/nfse_service_saopaulo";

class NfseController {
    
    async create_consult(req, res) {
        try{
           // const {cnpj_tomador , periodo_inicial, periodo_final } = req.body;
            const result = await nfseServiceBarueri.consultarNFeRecebidaPeriodo('2021-01-01', '2021-01-31', '00000000000000');
            return res.status(result.status).json(result.message);
        }catch(error){
            console.log(error);
            return res.status(400).json({ message: 'Erro ao consultar o webservice: ', error });
        }
    }

};

export default new NfseController(); // Exporta a classe NfseController