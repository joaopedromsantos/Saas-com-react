async function routes(fastify, options) {

    // GET
    fastify.get("/estoque_total/get/:id", async (request, reply) => {
        try {
            const result = await fastify.pg.query(
                'SELECT * FROM estoque_total WHERE estoque_total.id = $1',
                [Number(request.params.id)]
            );
            return result.rows;
        } catch (error) {
            reply.status(500).send(error.message);
        }
    });
    
    // GET LIST
    fastify.get("/estoque_total/getlist", async (request, reply) => {
        try {
            const result = await fastify.pg.query(`
                SELECT 
                    e.id,
                    tab_e.nome AS empresa,
                    kg.nome AS kg,
                    tp.nome AS tipo,
                    e.total
                FROM 
                    estoque_total e
                JOIN 
                    tabela_empresa tab_e ON e.empresa = tab_e.id
                JOIN
                    tabela_kg kg ON e.kg = kg.id
                JOIN
                    tabela_tipo tp ON e.tipo = tp.id
            `);
            return result.rows;
        } catch (error) {
            reply.status(500).send(error.message);
        }
    });

    // POST
    fastify.post("/estoque_total/create", async (request, reply) => {
        try {
            const { empresa, tipo, kg, total } = request.body;
    
            const result = await fastify.pg.query(
                "INSERT INTO estoque_total (empresa, tipo, kg, total) VALUES ($1, $2, $3, $4)",
                [empresa, tipo, kg, total]
            );
    
            return result.rows;
        } catch (error) {
            reply.status(500).send(error.message);
        }
    });

    // EDIT
    fastify.put("/estoque_total/edit/:id", async (request, reply) => {
        try {
            const { id, empresa, tipo, kg, total } = request.body;

            const result = await fastify.pg.query(
                "UPDATE estoque_total SET empresa = $2, tipo = $3, kg = $4, total = $5 WHERE id = $1 RETURNING *",
                [id, empresa, tipo, kg, total]
            );

            return result.rows;
        } catch (error) {
            reply.status(500).send(error.message);
        }
    });

    // DELETE
    fastify.delete("/estoque_total/delete/:id", async (request, reply) => {
        try {
            const result = await fastify.pg.query(
                'DELETE FROM estoque_total WHERE estoque_total.id = $1',
                [Number(request.params.id)]
            );
            return result.rows;
        } catch (error) {
            reply.status(500).send(error.message);
        }
    });

}

module.exports = routes;
