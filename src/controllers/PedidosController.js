const Pedido = require("../database/models/Pedido");
const Cliente = require("../database/models/Cliente");
const Item = require("../database/models/Item");
const PedidoItem = require("../database/models/PedidoItem");

const { isValidCep } = require('@brazilian-utils/validators');

module.exports = {
    async listar(req, res) {
        try {
            const pedidos = await Pedido.findAll();
            return res.status(200).send(pedidos);
        } catch (e) {
            return res.status(500).send({ error: e });
        }
    },

    async get(req, res) {
        try {
            const id = req.params.id;
            const pedido = await Pedido.findByPk(id);

            let todosItens = [];

            if (pedido) {
                const ListaItens = await PedidoItem.findAll({ where: { pedido_id: id } });

                for (let i = 0; i < ListaItens.length; i++) {
                    let itemInfo = await Item.findByPk(ListaItens[i].item_id);
                    todosItens.push(itemInfo);
                }
            }

            return res.status(200).send({ pedido: pedido, pedidoItens: todosItens });
        } catch (e) {
            return res.status(500).send({ error: e });
        }
    },

    async delete(req, res) {
        try {
            const id = req.params.id;
            const pedido = await Pedido.findByPk(id);
            
            if (!pedido) {
                return res.status(400).send({ error: "Pedido não encontrado" });
            }

            await pedido.destroy(id);
            return res.status(200).send({ success: 200, msg: "Pedido deletado." });
        } catch (e) {
            return res.status(500).send({ error: e });
        }
    },

    async add(req, res) {
        try {
            const { clienteId, cep, frete, itens } = req.body;
            
            if (!isValidCep(cep)) {
                return res.status(400).send({ error: "CEP inválido." });
            }

            const cliente = await Cliente.findByPk(clienteId);

            if (!cliente) {
                return res.status(404).send({ error: "Cliente ID: " + clienteId + " não encontrado." });
            }

            let itemList = [];
            let pedidoValor = 0;

            for (let i = 0; i < itens.length; i++) {
                let itemInfo = await Item.findOne({ where: { sku: itens[i].sku } });

                if (!itemInfo) {
                    return res.status(404).send({ error: "Item SKU: " + itens[i].sku + " não encontrado." });
                }

                let valorTotal = await itemInfo.valor * itens[i].quantidade;
                pedidoValor = pedidoValor + valorTotal;

                itemList.push({ id: itemInfo.id, quantidade: itens[i].quantidade, valorTotal: valorTotal });
            }

            const pedido = await Pedido.create({ cliente_id: cliente.id, cep: cep, frete: frete, valor: pedidoValor });

            itemList.forEach(async(item) => {
                await PedidoItem.create({ pedido_id: pedido.id, item_id: item.id, quantidade: item.quantidade, valor: item.valorTotal });
            });

            return res.status(200).send({ success: 200, pedido: pedido });
        } catch (e) {
            return res.status(500).send({ error: e });
        }
    }
};