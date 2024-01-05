async function routes(fastify, options) {

    // GET
    fastify.get("/get/:id", async (request, reply) => {
        try {
            const result = await fastify.pg.query(
                'SELECT * FROM times WHERE times.id = $1',
                [Number(request.params.id)]
            );
            return result.rows;
        } catch (error) {
            reply.status(500).send(error.message);
        }
    });
    
    // GET LIST
    fastify.get("/getlist", async (request, reply) => {
        try {
            const result = await fastify.pg.query("SELECT * FROM tabela_empresa");
            return result.rows;
        } catch (error) {
            reply.status(500).send(error.message);
        }
    });

    // POST
    fastify.post("/create", async (request, reply) => {
        try {
            const { nome, n_jogadores, valor_clube } = request.body;
    
            const result = await fastify.pg.query(
                "INSERT INTO times (nome, n_jogadores, valor_clube) VALUES ($1, $2, $3)",
                [nome, n_jogadores, valor_clube]
            );
    
            return result.rows;
        } catch (error) {
            reply.status(500).send(error.message);
        }
    });

    // EDIT
    fastify.put("/edit/:id", async (request, reply) => {
        try {
            const { id, nome, n_jogadores, valor_clube } = request.body;

            const result = await fastify.pg.query(
                "UPDATE times SET nome = $2, n_jogadores = $3, valor_clube = $4 WHERE id = $1 RETURNING *",
                [id, nome, n_jogadores, valor_clube]
            );

            return result.rows;
        } catch (error) {
            reply.status(500).send(error.message);
        }
    });

    // DELETE
    fastify.delete("/delete/:id", async (request, reply) => {
        try {
            const result = await fastify.pg.query(
                'DELETE FROM times WHERE times.id = $1',
                [Number(request.params.id)]
            );
            return result.rows;
        } catch (error) {
            reply.status(500).send(error.message);
        }
    });

}

module.exports = routes;
