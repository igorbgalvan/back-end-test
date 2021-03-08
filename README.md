# Implantação

Utilizando docker, na raiz do projeto executar:
```sh
node dockerize
```
OU
```sh
docker build -t postgres-image -f Dockerfile.postgres .
docker run -d --rm --name postgres-container postgres-image
docker build -t node-image -f Dockerfile.node .
docker run -d -p 4000:4000 --rm --name node-container node-image
docker exec -i node-container yarn sequelize db:migrate
docker exec -i node-container yarn sequelize db:seed:all
```

# Documentação

## Clientes

| HTTP Request | Endpoint | Body | Descrição |
| ------ | ------ | ------ | ------ |
| POST | /clientes | { "nome", "email", "cpf" } | Cria novo cliente
| GET | /clientes | - | Lista todos os clientes
| GET | /clientes:id | - | Informações de cliente específico
| DELETE | /clientes:id | - | Deleta cliente específico

## Itens

| HTTP Request | Endpoint | Body | Descrição |
| ------ | ------ | ------ | ------ |
| POST | /itens | { "sku", "descricao", "valor" } | Cria novo item
| GET | /itens | - | Lista todos os items
| GET | /itens:id | - | Informações de item específico
| DELETE | /itens:id | - | Deleta item específico

## Pedidos

| HTTP Request | Endpoint | Body | Descrição |
| ------ | ------ | ------ | ------ |
| POST | /pedidos | { "clienteId", "cep", "frete", "itens": [{ "sku", "quantidade" }] } | Cria novo pedido
| GET | /pedidos | - | Lista todos os pedidos
| GET | /pedidos:id | - | Informações de pedido específico detalhado
| DELETE | /pedidos:id | - | Deleta pedido específico
