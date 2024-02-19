async function routes(fastify, options) {

    // Atualizar o estoque total com base no fluxo_estoque
    fastify.post('/api/atualizar_estoque_total', async (solicitação, resposta) => {
        try {

            // Parametrização
            const { param1, param2, param3, param4, param5 } = request.body;

            // Buscar e calcular os dados do estoque total
            const resultado = await fastify.pg.query(`
                INSERT INTO estoque_total (empresa, kg, tipo, total)
                SELECT
                    e.empresa,
                    e.kg,
                    e.tipo,
                    SUM(e.quantidade) AS total
                FROM
                    fluxo_estoque e
                GROUP BY
                    e.empresa, e.kg, e.tipo
                ON CONFLICT (empresa, kg, tipo) DO UPDATE
                SET
                    total = EXCLUDED.total;
                `);

            resposta.send({ status: 'ok', mensagem: 'Estoque total atualizado com sucesso!' });
        } catch (erro) {
            resposta.status(500).send(erro.message);
        }
    });

}

module.exports = routes;
