async function routes(fastify, options) {

    // GET
    fastify.get("/cobrar/get/:id", async (request, reply) => {
        try {
            const result = await fastify.pg.query(
                'SELECT * FROM cobrar WHERE cobrar.id = $1',
                [Number(request.params.id)]
            );
            return result.rows;
        } catch (error) {
            reply.status(500).send(error.message);
        }
    });
    
    // GET LIST
    fastify.get("/cobrar/getlist", async (request, reply) => {
        try {
            const result = await fastify.pg.query("SELECT * FROM cobrar");
            return result.rows;
        } catch (error) {
            reply.status(500).send(error.message);
        }
    });

    // POST
    fastify.post("/cobrar/create", async (request, reply) => {
        try {
            const { empresa, tipo, kg, oic, quantidade, cobrado, data_cobrado } = request.body;
    
            const result = await fastify.pg.query(
                "INSERT INTO cobrar (empresa, tipo, kg, oic, quantidade, cobrado, data_cobrado) VALUES ($1, $2, $3, $4, $5, $6, $7)",
                [empresa, tipo, kg, oic, quantidade, cobrado, data_cobrado]
            );
    
            return result.rows;
        } catch (error) {
            reply.status(500).send(error.message);
        }
    });

    // EDIT
    fastify.put("/cobrar/edit/:id", async (request, reply) => {
        try {
            const { id, empresa, tipo, kg, oic, quantidade, cobrado, data_cobrado } = request.body;

            const result = await fastify.pg.query(
                "UPDATE cobrar SET empresa = $2, tipo = $3, kg = $4, oic = $5, quantidade = $6, cobrado = $7, data_cobrado = $8 WHERE id = $1 RETURNING *",
                [id, empresa, tipo, kg, oic, quantidade, cobrado, data_cobrado]
            );

            return result.rows;
        } catch (error) {
            reply.status(500).send(error.message);
        }
    });

    // DELETE
    fastify.delete("/cobrar/delete/:id", async (request, reply) => {
        try {
            const result = await fastify.pg.query(
                'DELETE FROM cobrar WHERE cobrar.id = $1',
                [Number(request.params.id)]
            );
            return result.rows;
        } catch (error) {
            reply.status(500).send(error.message);
        }
    });

}

module.exports = routes;
