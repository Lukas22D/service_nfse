import xml2js from 'xml2js';
import axios from 'axios';
import https from 'https';
import fs from 'fs';


class nfseServiceSaoPaulo {

    constructor() {
        // Criação do certificado digital como assinatura
    }


    async consultaNFe(chave_nfe, chave_rps) {
        // Construção do XML de consulta
        const xmlConsulta = `
                        <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ws="http://ws.servico.nfe/">
                        <soapenv:Header/>
                        <soapenv:Body>
                            <ws:ConsultaNFe>
                                <ChaveNFe>${chave_nfe}</ChaveNFe>
                                <ChaveRPS>${chave_rps}</ChaveRPS>
                            </ws:ConsultaNFe>
                        </soapenv:Body>
                        </soapenv:Envelope>
                        `;

        try {
            const response = await axios.post('https://nfe.prefeitura.sp.gov.br/ws/lotenfe.asmx', xmlConsulta, {
                headers: {
                    'Content-Type': 'text/xml',
                    'SOAPAction': 'http://ws.servico.nfe/ConsultaNFe',

                },
            });

            const result = await xml2js.parseStringPromise(response.data, { explicitArray: false });
            return { message: result.data, status: response.status };
        } catch (error) {
            console.log(error);
            return { message: error.response.data, status: error.response.status };
        }


    }

    async consultaNFeRecebidas(cnpj, data_inicio, data_fim) {
        try {
            // Construção do XML de consulta com os dados
            const dados = {
                versaoSchema: 1,
                mensagemXML: `
                  <PedidoConsultaNFePeriodo xmlns="http://www.prefeitura.sp.gov.br/nfe/ws/">
                    <Cabecalho>
                      <CPFCNPJRemetente>${cnpj}</CPFCNPJRemetente> 
                      <dtInicio>${data_inicio}</dtInicio>
                      <dtFim>${data_fim}</dtFim>
                    </Cabecalho>
                    <Signature xmlns="http://www.w3.org/2000/09/xmldsig#">
                      </Signature>
                  </PedidoConsultaNFePeriodo>
                `
            };
            // Requisição SOAP, com os dados de configuração
            const config = {
                method: 'post',
                url: 'https://nfe.prefeitura.sp.gov.br/ws/lotenfe.asmx', // URL do serviço
                headers: {
                    'Content-Type': 'text/xml;charset=utf-8',
                    'SOAPAction': 'http://www.prefeitura.sp.gov.br/nfe/ws/ConsultaNFeRecebidas'
                },/*
                httpsAgent: new https.Agent({  
                  // ... (Configurações para seu certificado, como rejectUnauthorized: false para testes)
                }),*/
                data: `
                  <?xml version="1.0" encoding="utf-8"?>
                  <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
                    <soap:Body>   
          
                      <ConsultaNFeRecebidas xmlns="http://www.prefeitura.sp.gov.br/nfe/ws/">
                        <VersaoSchema>${dados.versaoSchema}</VersaoSchema>
                        <MensagemXML><![CDATA[${dados.mensagemXML}]]></MensagemXML>
                      </ConsultaNFeRecebidas>
                    </soap:Body>
                  </soap:Envelope>
                `
            };
            const response = await axios(config);
            // Parse do XML de resposta
            const result = await xml2js.parseStringPromise(response.data, { explicitArray: false });
            return { message: result.data, status: response.status };

        } catch (error) {
            console.log(error);
            return { message: error.response.data, status: error.response.status };
        }
    }

}

export default new nfseServiceSaoPaulo(); // Exporta a classe nfseServiceSaoPaulo