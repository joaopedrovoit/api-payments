# Teste Técnico - Aplicação de Agendamento de Pagamentos

> **Objetivo**: Desenvolver uma API RESTful usando Node.js, Express, Mongoose e Joi, que permita aos usuários gerenciar carteiras e agendar pagamentos.

A descrição detalhada pode ser encontrada [aqui](https://rbr-digital.notion.site/Teste-T-cnico-Aplica-o-de-Agendamento-de-Pagamentos-fa84321aec16409995f1472141307f20).

## Build

Para fazer a solução foi utilizada Node v20.9.0.

Para instalar e compilar o projeto, basta:

```bash
npm install # instalar os pacotes

npm run build # transpilar o projeto (destino ./dist)

npm run start # iniciar o projeto

npm run test # rodar os testes

npm run dev # executar o servidor em modo de desenvolvimento
```

É importe se atentar ao arquivo ```.env```, que contém a porta que o servidor vai ouvir, a conexão com o mongodb e o timestamp para execução do job que executa os *scheduled payments*.

## Rotas

### Create User

Essa rota não é um requisito, mas é importante para testar usuários novos e inserir um montante inicial de dinheiro.

**URL**: ```/user```

**Method**: ```POST```

**Body**

```json
{
    "name": "[string containing name]",
    "email": "[string containing email]",
    "wallet": "[valid string formated as number]"
}
```

**Example**

```HTTP
POST /user HTTP/1.1
Host: localhost:55555
Content-Type: application/json
Content-Length: 88

{
    "name": "Teste",
    "email": "test@gmail.com",
    "wallet": "100000.00"
}
```

### Get User Wallet

Rota para ver o valor da carteira de um usuário. Apesar de ser uma requisição GET, é necessário preencher o corpo.

**URL**: ```/getUserWallet```

**Method**: ```GET```

**Body**

```json
{
    "email": "[string containing email]"
}
```

**Example**

```HTTP
GET /getUserWallet HTTP/1.1
Host: localhost:55555
Content-Type: application/json
Content-Length: 35

{
    "email": "test@gmail.com"
}
```

### Create Instant Payment

Rota para realizar um pagamento instantâneo.

**URL**: ```/CreateInstantPayment```

**Method**: ```POST```

**Body**

```json
{
    "emailFrom": "[string containing email]",
    "emailTo": "[string containing email]",
    "value": "[valid string formated as number]"
}
```

**Example**

```HTTP
POST /CreateInstantPayment HTTP/1.1
Host: localhost:55555
Content-Type: application/json
Content-Length: 96

{
    "emailFrom": "test2@gmail.com",
    "emailTo": "test@gmail.com",
    "value": "0.03"
}
```

### Create Scheduled Payment

Rota para agendar um pagamento.

**URL**: ```/CreateScheduledPayment```

**Method**: ```POST```

**Body**

```json
{
    "emailFrom": "[string containing email]",
    "emailTo": "[string containing email]",
    "dateTime": "[valid string formated as datetime]",
    "value": "[valid string formated as number]"
}
```

**Example**

```HTTP
POST /CreateScheduledPayment HTTP/1.1
Host: localhost:55555
Content-Type: application/json
Content-Length: 142

{
    "emailFrom": "test1@gmail.com",
    "emailTo": "test1@gmail.com",
    "dateTime": "2023-11-21T22:58:00.000Z",
    "value": "20.0"
}
```

### Cancel Scheduled Payment

Rota para cancelar um pagamento agendado.

**URL**: ```/CancelScheduledPayment```

**Method**: ```DELETE```

**Body**

```json
{
    "paymentId": "[string containing valid id]"
}
```

**Example**

```HTTP
DELETE /cancelScheduledPayment HTTP/1.1
Host: localhost:55555
Content-Type: application/json
Content-Length: 49

{
    "paymentId": "655d05a7cc3dc0238705e439"
}
```