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

    // POST
    fastify.post("/fluxo_estoque/create", async (request, reply) => {
        try {
            const { empresa, tipo, kg, quantidade } = request.body;
    
            const result = await fastify.pg.query(
                "INSERT INTO fluxo_estoque (empresa, tipo, kg, quantidade) VALUES ($1, $2, $3, $4)",
                [empresa, tipo, kg, quantidade]
            );
    
            return result.rows;
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
            const result = await fastify.pg.query(
                'DELETE FROM fluxo_estoque WHERE fluxo_estoque.id = $1',
                [Number(request.params.id)]
            );
            return result.rows;
        } catch (error) {
            reply.status(500).send(error.message);
        }
    });

}

module.exports = routes;
