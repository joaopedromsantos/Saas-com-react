async function routes(fastify, options) {

    // GET
    fastify.get("/marcacao/get/:id", async (request, reply) => {
        try {
            const result = await fastify.pg.query(
                'SELECT * FROM marcacao WHERE marcacao.id = $1',
                [Number(request.params.id)]
            );
            return result.rows;
        } catch (error) {
            reply.status(500).send(error.message);
        }
    });
    
    // GET LIST
    fastify.get("/marcacao/getlist", async (request, reply) => {
        try {
            const result = await fastify.pg.query(`
                SELECT 
                    m.id,
                    tab_e.nome AS empresa,
                    kg.nome AS kg,
                    tp.nome AS tipo,
                    m.oic,
                    m.data_pedido,
                    m.quantidade,
                    m.cobrado,
                    m.data_cobrado,
                    m.email,
                    m.observacoes                    
                FROM 
                    marcacao m
                JOIN 
                    tabela_empresa tab_e ON m.empresa = tab_e.id
                JOIN
                    tabela_kg kg ON m.kg = kg.id
                JOIN
                    tabela_tipo tp ON m.tipo = tp.id
                ORDER BY m.data_pedido DESC
            `);
            return result.rows;
        } catch (error) {
            reply.status(500).send(error.message);
        }
    });

    fastify.post("/marcacao/create", async (request, reply) => {
        const client = await fastify.pg.connect();
        try {
            const { empresa, tipo, kg, oic, quantidade, cobrado, data_cobrado, observacoes, email } = request.body;
    
            // Iniciar uma transação
            await client.query('BEGIN');
    
            // Inserir na tabela marcacao
            await client.query(
                "INSERT INTO marcacao (empresa, tipo, kg, oic, quantidade, cobrado, data_cobrado, observacoes, email) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)",
                [empresa, tipo, kg, oic, quantidade, cobrado, data_cobrado, observacoes, email]
            );
    
            // Atualizar o estoque
            await client.query(
                "UPDATE estoque_total SET total = total - $1 WHERE empresa = $2 AND tipo = $3 AND kg = $4",
                [quantidade, empresa, tipo, kg]
            );
    
            // Confirmar a transação
            await client.query('COMMIT');
    
            reply.send({ success: true });
        } catch (error) {
            // Reverter a transação em caso de erro
            await client.query('ROLLBACK');
            reply.status(500).send(error.message);
        } finally {
            client.release();
        }
    });
    

    // EDIT
    fastify.put("/marcacao/edit/:id", async (request, reply) => {
        try {
            const { id, empresa, tipo, kg, oic, quantidade, cobrado, data_cobrado } = request.body;

            const result = await fastify.pg.query(
                "UPDATE marcacao SET empresa = $2, tipo = $3, kg = $4, oic = $5, quantidade = $6, cobrado = $7, data_cobrado = $8 WHERE id = $1 RETURNING *",
                [id, empresa, tipo, kg, oic, quantidade, cobrado, data_cobrado]
            );

            return result.rows;
        } catch (error) {
            reply.status(500).send(error.message);
        }
    });

    // DELETE
    fastify.delete("/marcacao/delete/:id", async (request, reply) => {
        const client = await fastify.pg.connect();
        try {
            const { id } = request.params;
    
            // Iniciar uma transação
            await client.query('BEGIN');
    
            // Obter a quantidade e outros detalhes antes de deletar
            const { rows } = await client.query(
                'SELECT empresa, tipo, kg, quantidade FROM marcacao WHERE id = $1',
                [Number(id)]
            );
    
            if (rows.length === 0) {
                throw new Error('Registro não encontrado');
            }
    
            const { empresa, tipo, kg, quantidade } = rows[0];
    
            // Deletar da tabela marcacao
            await client.query(
                'DELETE FROM marcacao WHERE id = $1',
                [Number(id)]
            );
    
            // Atualizar o estoque
            await client.query(
                'UPDATE estoque_total SET total = total + $1 WHERE empresa = $2 AND tipo = $3 AND kg = $4',
                [quantidade, empresa, tipo, kg]
            );
    
            // Confirmar a transação
            await client.query('COMMIT');
    
            reply.send({ success: true });
        } catch (error) {
            // Reverter a transação em caso de erro
            await client.query('ROLLBACK');
            reply.status(500).send(error.message);
        } finally {
            client.release();
        }
    });
    

}

module.exports = routes;
