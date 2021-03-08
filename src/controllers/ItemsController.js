const Item = require("../database/models/Item");

module.exports = {
    async add(req, res) {
        try {
            const { sku, descricao, valor } = req.body;
            
            let item = await Item.findOne({ where: { sku: sku } });

            if (item) {
                return res.status(400).send({ error: "SKU já cadastrado." });
            }
            
            item = await Item.create({ sku: sku, descricao: descricao, valor: valor });

            return res.status(200).send(item);
        } catch (e) {
            return res.status(500).send({ error: e });
        }
    },

    async listar(req, res) {
        try {
            const items = await Item.findAll();
            return res.status(200).send(items);
        } catch (e) {
            return res.status(500).send({ error: e });
        }
    },

    async get(req, res) {
        try {
            const id = req.params.id;
            const item = await Item.findByPk(id);
            
            if (!item) {
                return res.status(400).send({ error: "Item não encontrado" });
            }

            return res.status(200).send( item );
        } catch (e) {
            return res.status(500).send({ error: e });
        }
    },

    async delete(req, res) {
        try {
            const id = req.params.id;
            const item = await Item.findByPk(id);
            
            if (!item) {
                return res.status(400).send({ error: "Item não encontrado" });
            }

            await item.destroy();

            return res.status(200).send({ success: 200, msg: "Item deletado." });
        } catch (e) {
            return res.status(500).send({ error: e });
        }
    },
};