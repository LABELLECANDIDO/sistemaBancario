const fs = require('fs');

let contas = [];

function carregarContas(){
    try{
        const data = fs.readFileSync('contas.json');
        contas = JSON.parse(data);
    } catch (error){
        console.error('erro ao carregar dados ', error);
        contas = [];
    }
}

function salvarConta(){
    fs.writeFile('contas.json', JSON.stringify(contas, null, 2), (err) => {
        if(err){
            console.error('erro  ao salvar dados conta:', err)
        }else{
            console.log('dados foram salvos')
        }
    });
}

carregarContas();

const contasController = {};

contasController.registraConta = (req, res) => {
    const { nome, numeroConta, saldoInicial } = req.body;

    if(!nome || !numeroConta, saldoInicial === undefined){
        return res.status(400).json({error: 'preencha todos os camppos.'});
    }
    if(contas.find(conta => conta.numeroConta === numeroConta)){
        return res.status(400).json({error: 'numero registrado'});
    }
    const novaConta = {
        nome,
        numeroConta,
        saldo: saldoInicial
    };
    contas.push(novaConta);
    salvarConta();

    res.status(201).json({message: 'salva com sucesso', conta: novaConta });
};

contasController.pegarConta = (req, res) => {
    const { nome, numeroConta } = req.query;
    const conta = contas.find(c => c.nome === nome && c.numeroConta === numeroConta);

    if(!conta){
        return res.status(404).json({error: 'conta nao encontrada.'})
    }
    res.status(200).json({message: 'conta encontrada', conta})
};


module.exports = contasController;
