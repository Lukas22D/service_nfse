import xml2js from 'xml2js';
import axios from 'axios';

class NfseServiceBarueri {

    constructor(periodo_inicial, periodo_final, cnpj_tomador, cnpj_prestador = null) {
        this.xml_builder = `
            <NFeRecebidaPeriodo xmlns="http://www.barueri.sp.gov.br/nfe">
                <CPFCNPJTomador>${cnpj_tomador}</CPFCNPJTomador>
                <DataInicial>${periodo_inicial}</DataInicial>
                <DataFinal>${periodo_final}</DataFinal>
                ${cnpj_prestador ? `<CPFCNPJPrestador>${cnpj_prestador}</CPFCNPJPrestador>` : ''}
                <Pagina>1</Pagina>
            </NFeRecebidaPeriodo>
        `;
        this.versaoSchema = '1';  // Ajuste se necessário de acordo com a versão do schema correta
    }

    async consultarNFeRecebidaPeriodo() {
        try {
            const response = await axios.post(
                'https://servicos.barueri.sp.gov.br/nfewsxml/wsgeraxml.asmx',
                `<?xml version="1.0" encoding="utf-8"?>
                    <soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">
                        <soap12:Body>
                            <ConsultaNFeRecebidaPeriodo xmlns="http://www.barueri.sp.gov.br/nfe">
                                <VersaoSchema>${this.versaoSchema}</VersaoSchema>
                                <MensagemXML><![CDATA[${this.xml_builder}]]></MensagemXML>
                            </ConsultaNFeRecebidaPeriodo>
                        </soap12:Body>
                    </soap12:Envelope>`,
                {
                    headers: {
                        'Content-Type': 'application/soap+xml; charset=utf-8',
                        'SOAPAction': 'https://servicos.barueri.sp.gov.br/nfewsxml/wsgeraxml.asmx?op=ConsultaNFeRecebidaPeriodo'
                    }
                }
            );

            const result = await xml2js.parseStringPromise(response.data, { explicitArray: false });
            return {message: JSON.stringify(result) , status: 200};

        } catch (error) {
            console.log(error);
            return { message: error, status: error.response.status };
        }
    }

};

export default NfseServiceBarueri;
