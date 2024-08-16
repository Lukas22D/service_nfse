import NfseServiceBarueri from "../services/nfse_service_barueri";


class NfseController {
    
    async create_consult(req, res) {
        try{
            const {competencia , cnpj_tomado } = req.body;
            const result = await NfseServiceBarueri.consultarNFeRecebidaCompetencia(cnpj_tomado, competencia);
            return res.status(result.status).json(result.message);
        }catch(error){
            return res.status(400).json({ message: 'Erro ao consultar o webservice: ', error });
        }
    }

};

export default new NfseController(); // Exporta a classe NfseController