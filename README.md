# NFSe Service Application

Este projeto é uma aplicação Node.js para consulta de NFSe utilizando serviços SOAP das prefeituras de Barueri e São Paulo. A aplicação está estruturada utilizando Express para criação das rotas e oferece endpoints para realizar consultas específicas de NFSe.

## Estrutura do Projeto

- **controllers/**
  - `nfse_controller.js`: Controlador responsável por gerenciar as requisições de consulta de NFSe.
  
- **services/**
  - `nfse_service_barueri.js`: Serviço para realizar consultas de NFSe para a prefeitura de Barueri.
  - `nfse_service_saopaulo.js`: Serviço para realizar consultas de NFSe para a prefeitura de São Paulo.

- **routes.js**: Configuração das rotas da aplicação.
- **app.js**: Configuração do servidor Express e middlewares.

## Instalação

1. **Clone o repositório:**

```bash
   git clone https://github.com/seu-usuario/seu-repositorio.git
 ```
2. **Instale as dependências:**

```bash
cd seu-repositorio
npm install
```
3. **Configuração do ambiente:**

Crie um arquivo .env na raiz do projeto e adicione as seguintes variáveis:
```bash
CERT_PATH=path/to/your/certificate.pfx
PASSPHRASE=your_certificate_password
```
4. **Inicie a aplicação:**

```bash
npm run dev
```
