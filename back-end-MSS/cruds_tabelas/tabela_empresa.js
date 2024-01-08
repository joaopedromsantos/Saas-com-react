async function routes(fastify, options) {

    // GET
    fastify.get("/tabela_empresa/get/:id", async (request, reply) => {
        try {
            const result = await fastify.pg.query(
                'SELECT * FROM tabela_empresa WHERE tabela_empresa.id = $1',
                [Number(request.params.id)]
            );
            return result.rows;
        } catch (error) {
            reply.status(500).send(error.message);
        }
    });
    
    // GET LIST
    fastify.get("/tabela_empresa/getlist", async (request, reply) => {
        try {
            const result = await fastify.pg.query("SELECT * FROM tabela_empresa");
            return result.rows;
        } catch (error) {
            reply.status(500).send(error.message);
        }
    });

    // POST
    fastify.post("/tabela_empresa/create", async (request, reply) => {
        try {
            const { nome } = request.body;
    
            const result = await fastify.pg.query(
                "INSERT INTO tabela_empresa (nome) VALUES ($1)",
                [nome]
            );
    
            return result.rows;
        } catch (error) {
            reply.status(500).send(error.message);
        }
    });

    // EDIT
    fastify.put("/tabela_empresa/edit/:id", async (request, reply) => {
        try {
            const { id, nome } = request.body;

            const result = await fastify.pg.query(
                "UPDATE tabela_empresa SET nome = $2 WHERE id = $1 RETURNING *",
                [id, nome]
            );

            return result.rows;
        } catch (error) {
            reply.status(500).send(error.message);
        }
    });

    // DELETE
    fastify.delete("/tabela_empresa/delete/:id", async (request, reply) => {
        try {
            const result = await fastify.pg.query(
                'DELETE FROM tabela_empresa WHERE tabela_empresa.id = $1',
                [Number(request.params.id)]
            );
            return result.rows;
        } catch (error) {
            reply.status(500).send(error.message);
        }
    });

}

module.exports = routes;
