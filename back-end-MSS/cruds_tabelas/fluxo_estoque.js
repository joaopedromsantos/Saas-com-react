async function routes(fastify, options) {

    // GET
    fastify.get("/fluxo_estoque/get/:id", async (request, reply) => {
        try {
            const result = await fastify.pg.query(
                'SELECT * FROM fluxo_estoque WHERE fluxo_estoque.id = $1',
                [Number(request.params.id)]
            );
            return result.rows;
        } catch (error) {
            reply.status(500).send(error.message);
        }
    });
    
    // GET LIST
    fastify.get("/fluxo_estoque/getlist", async (request, reply) => {
        try {
            const result = await fastify.pg.query(`
                SELECT 
                    e.id,
                    tab_e.nome AS empresa,
                    kg.nome AS kg,
                    tp.nome AS tipo,
                    e.quantidade,
                    e.data
                FROM 
                    fluxo_estoque e
                JOIN 
                    tabela_empresa tab_e ON e.empresa = tab_e.id
                JOIN
                    tabela_kg kg ON e.kg = kg.id
                JOIN
                    tabela_tipo tp ON e.tipo = tp.id
                ORDER BY e.data DESC
            `);
            return result.rows;
        } catch (error) {
            reply.status(500).send(error.message);
        }
    });

    fastify.post("/fluxo_estoque/create", async (request, reply) => {
        try {
            const { quantidade, empresa, tipo, kg } = request.body;

            // Primeiro, insira o item no fluxo_estoque
            await fastify.pg.query(
                'INSERT INTO fluxo_estoque (quantidade, empresa, tipo, kg) VALUES ($1, $2, $3, $4)', [quantidade, empresa, tipo, kg]
            );

            // Em seguida, verifique se o item já existe no estoque_total
            const { rows } = await fastify.pg.query(
                'SELECT * FROM estoque_total WHERE empresa = $1 AND tipo = $2 AND kg = $3', [empresa, tipo, kg]
            );

            if (rows.length > 0) {
                // Se o item existir, atualize a quantidade total
                await fastify.pg.query(
                    `UPDATE estoque_total 
                    SET total = total + $1 
                    WHERE empresa = $2 AND tipo = $3 AND kg = $4`, [quantidade, empresa, tipo, kg]
                );
            } else {
                // Se o item não existir, crie um novo
                await fastify.pg.query(
                    'INSERT INTO estoque_total (empresa, tipo, kg, total) VALUES ($1, $2, $3, $4)', [empresa, tipo, kg, quantidade]
                );
            }

            return { success: true };
        } catch (error) {
            reply.status(500).send(error.message);
        }
    });

    // EDIT
    fastify.put("/fluxo_estoque/edit/:id", async (request, reply) => {
        try {
            const { id, empresa, tipo, kg, quantidade } = request.body;

            const result = await fastify.pg.query(
                "UPDATE fluxo_estoque SET empresa = $2, tipo = $3, kg = $4, quantidade = $5 WHERE id = $1 RETURNING *",
                [id, empresa, tipo, kg, quantidade]
            );

            return result.rows;
        } catch (error) {
            reply.status(500).send(error.message);
        }
    });

    // DELETE
    fastify.delete("/fluxo_estoque/delete/:id", async (request, reply) => {
        try {
            const id = Number(request.params.id);
    
            // Primeiro, obtenha a quantidade e os detalhes do item que está sendo excluído
            const { rows } = await fastify.pg.query(
                'SELECT quantidade, empresa, tipo, kg FROM fluxo_estoque WHERE id = $1', [id]
            );
            const { quantidade, empresa, tipo, kg } = rows[0];
    
            // Em seguida, exclua o item do fluxo_estoque
            await fastify.pg.query(
                'DELETE FROM fluxo_estoque WHERE id = $1', [id]
            );
    
            // Finalmente, atualize a quantidade total no estoque
            await fastify.pg.query(
                `UPDATE estoque_total 
                 SET total = total - $1 
                 WHERE empresa = $2 AND tipo = $3 AND kg = $4`, [quantidade, empresa, tipo, kg]
            );
    
            return { success: true };
        } catch (error) {
            reply.status(500).send(error.message);
        }
    });

}

module.exports = routes;
