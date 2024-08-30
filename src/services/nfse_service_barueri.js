import xml2js from 'xml2js';
import axios from 'axios';
import https from 'https';
import fs from 'fs';
import dotenv from 'dotenv';
import soap, { createClientAsync } from 'soap';

dotenv.config();
/**
 * Serviço para consulta de NFSe de Barueri
 * @class NfseServiceBarueri
 * @method consultarNFeRecebidaPeriodo - Consulta NFSe recebida por período
 * @method consultarNFeRecebidaCompetencia - Consulta NFSe recebida por competência
 * 
 */
class nfseServiceBarueri {
    /**
     * Construtor da classe NfseServiceBarueri
     * @constructor - Construi a autenticação do certificado, com o caminho do certificado e a senha
     * 
     */

    constructor() {
        /*
        try {

          this.certPath = null
            this.passphrase = null
            this.httpsAgent = new https.Agent({
                pfx: fs.readFileSync(this.certPath),
                passphrase: this.passphrase,
                rejectUnauthorized: false
            });

        } catch (error) {
            console.log('Erro ao carregar certificado: ', error);
        } */
    }

    async consultarNFeRecebidaPeriodo(periodo_inicial, periodo_final, cnpj_tomador, cnpj_prestador= null) {
    
        const pfx_path = fs.readFileSync('asap.pfx');
        const passphrase = '123456';
    
        const httpsAgent = new https.Agent({
           pfx: pfx_path,
           passphrase: passphrase,
           rejectUnauthorized: false, // Temporarily disable certificate validation for debugging
        });
    
        const xml_builder = `
            <ConsultaNFeRecebidaPeriodo xmlns="http://www.barueri.sp.gov.br/nfe">
                <CPFCNPJTomador>${cnpj_tomador}</CPFCNPJTomador>
                <DataInicial>${periodo_inicial}</DataInicial>
                <DataFinal>${periodo_final}</DataFinal>
                ${cnpj_prestador ? `<CPFCNPJPrestador>${cnpj_prestador}</CPFCNPJPrestador>` : ''}
                <Pagina>1</Pagina>
            </ConsultaNFeRecebidaPeriodo>
        `;
        const versaoSchema = '1';  // Versão correta baseada no manual
    
        try {
            const response = await axios.post(
                'https://servicos.barueri.sp.gov.br/nfewsxml/wsgeraxml.asmx',
                `<?xml version="1.0" encoding="utf-8"?>
                    <soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">
                        <soap12:Body>
                            <ConsultaNFeRecebidaPeriodo xmlns="http://www.barueri.sp.gov.br/nfe">
                                <VersaoSchema>${versaoSchema}</VersaoSchema>
                                <MensagemXML><![CDATA[${xml_builder}]]></MensagemXML>
                            </ConsultaNFeRecebidaPeriodo>
                        </soap12:Body>
                    </soap12:Envelope>`,
                {
                    httpsAgent: httpsAgent,
                    headers: {
                        'Content-Type': 'application/soap+xml; charset=utf-8',
                        'SOAPAction': 'https://servicos.barueri.sp.gov.br/nfewsxml/wsgeraxml.asmx?op=ConsultaNFeRecebidaPeriodo'
                    }
                }
            );
    

            const result = await xml2js.parseStringPromise(response.data, { explicitArray: false });
            // Processa a resposta
            return { message: JSON.stringify(result), status: 200 };
        } catch (error) {
            console.log(error);
            return { message: error, status: error.response ? error.response.status : 500 };
        }
    }

    async consultarNFeRecebidaCompetencia(cnpj_tomador, competencia, cnpj_prestador = null) {
        const pfx_path = fs.readFileSync('asap.pfx');
        const passphrase = '123456';
    
        const httpsAgent = new https.Agent({
           pfx: pfx_path,
           passphrase: passphrase,
           rejectUnauthorized: false, // Temporarily disable certificate validation for debugging
        });

        const xml_builder = `
            <NFeRecebidaCompetencia xmlns="http://www.barueri.sp.gov.br/nfe">
                <CPFCNPJTomador>${cnpj_tomador}</CPFCNPJTomador>
                <Competencia>${competencia}</Competencia>
                ${cnpj_prestador ? `<CPFCNPJPrestador>${cnpj_prestador}</CPFCNPJPrestador>` : ''}
                <Pagina>1</Pagina>
            </NFeRecebidaCompetencia>
        `;
        const versaoSchema = '1';  // Ajuste de acordo com a versão do schema correta

        try {
            const response = await axios.post(
                'https://servicos.barueri.sp.gov.br/nfewsxml/wsgeraxml.asmx',
                `<?xml version="1.0" encoding="utf-8"?>
                    <soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">
                        <soap12:Body>
                            <ConsultaNFeRecebidaCompetencia xmlns="http://www.barueri.sp.gov.br/nfe">
                                <VersaoSchema>${versaoSchema}</VersaoSchema>
                                <MensagemXML><![CDATA[${xml_builder}]]></MensagemXML>
                            </ConsultaNFeRecebidaCompetencia>
                        </soap12:Body>
                    </soap12:Envelope>`,
                {
                    httpsAgent: httpsAgent,
                    headers: {
                        'Content-Type': 'application/soap+xml; charset=utf-8',
                        'SOAPAction': 'https://servicos.barueri.sp.gov.br/nfewsxml/wsgeraxml.asmx?op=ConsultaNFeRecebidaCompetencia'
                    }
                }
            );

            const result = await xml2js.parseStringPromise(response.data, { explicitArray: false });
            console.log(result);
            return { message: JSON.stringify(result), status: 200 };

        } catch (error) {
            console.log(error);
            return { message: error, status: error.response ? error.response.status : 500 };
        }
    }

};

export default new nfseServiceBarueri;