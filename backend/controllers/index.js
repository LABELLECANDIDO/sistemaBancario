
const express = require('express');
const bodyParser = require('body-parser');
const contasRouter = require('./contasController');
const transacoesRouter = require('./transacoes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use('/contas', contasRouter);
app.use('/transacoes', transacoesRouter);

app.listen(PORT, () => {
    console.log(`Servidor iniciado na porta ${PORT}`);
});