const dotenv = require('dotenv');
dotenv.config();

// variaveis necessárias
const Fastify = require("fastify");
const fastify = Fastify({
    logger: false
});

// Configuração do CORS necessário 
const cors = require('@fastify/cors')
fastify.register(cors, { 
  origin: "*",
  allowedHeaders: [
    "Origin",
    "X-Requested-With",
    "Accept",
    "Content-type",
    "Authorization",
  ],
  methods: ["GET", "PUT", "PATCH", "POST", "DELETE"],
})

// Conexão com o banco
fastify.register(require('@fastify/postgres'), {
    connectionString: process.env.DATABASE_URL
});

// Importe os arquivos de cada tabela
const tabelaEmpresa = require('./cruds_tabelas/tabela_empresa');
const marcacao = require('./cruds_tabelas/marcacao');
const tabela_kg = require('./cruds_tabelas/tabela_kg');
const estoque_total = require('./cruds_tabelas/estoque_total');
const tabela_tipo = require('./cruds_tabelas/tabela_tipo');
const fluxo_estoque = require('./cruds_tabelas/fluxo_estoque');

// APIS
const APIS_estoque = require('./apis/estoque');

// Registre as rotas de cada tabela
fastify.register(tabelaEmpresa);
fastify.register(marcacao);
fastify.register(tabela_kg);
fastify.register(estoque_total);
fastify.register(tabela_tipo);
fastify.register(fluxo_estoque);

fastify.register(APIS_estoque);

const start = async () => {
    try {
      await fastify.listen({ port: process.env.PORT, host: '0.0.0.0' });
      console.log(`Server started successfully on port ${process.env.PORT}!`);
    } catch (err) {
      console.error(err);
      process.exit(1);
    }
  };
  
  start();
