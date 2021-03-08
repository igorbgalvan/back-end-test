const Cliente = require("../database/models/Cliente");

const { isValidCpf } = require('@brazilian-utils/validators');
const { validate } = require('email-validator');

module.exports = {
    async add(req, res) {
        try {
            const { nome, email, cpf } = req.body;

            if (!validate(email)) {
                return res.status(400).send({ error: "Email inválido." });
            }

            if (!isValidCpf(cpf)) {
                return res.status(400).send({ error: "CPF inválido." });
            }
            
            let cliente = await Cliente.findOne({ where: { email: email } });

            if (cliente) {
                return res.status(400).send({ error: "Email já cadastrado." });
            }

            cliente = await Cliente.findOne({ where: { cpf: cpf } });

            if (cliente) {
                return res.status(400).send({ error: "CPF já cadastrado." });
            }
            
            cliente = await Cliente.create({ nome: nome, email: email, cpf: cpf });

            return res.status(200).send(cliente);
        } catch (e) {
            return res.status(500).send({ error: e });
        }
    },

    async listar(req, res) {
        try {
            const clientes = await Cliente.findAll();
            return res.status(200).send(clientes);
        } catch (e) {
            return res.status(500).send({ error: e });
        }
    }, 

    async get(req, res) {
        try {
            const id = req.params.id;
            const cliente = await Cliente.findByPk(id);
            
            if (!cliente) {
                return res.status(400).send({ error: "Cliente não encontrado" });
            }

            return res.status(200).send( cliente );
        } catch (e) {
            return res.status(500).send({ error: e });
        }
    },

    async delete(req, res) {
        try {
            const id = req.params.id;
            const cliente = await Cliente.findByPk(id);
            
            if (!cliente) {
                return res.status(400).send({ error: "Cliente não encontrado" });
            }

            await cliente.destroy();

            return res.status(200).send({ success: 200, msg: "Cliente deletado." });
        } catch (e) {
            return res.status(500).send({ error: e });
        }
    },
};