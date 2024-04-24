const transacoesController ={};

transacoesController.deposito = (req, res) =>
 {
    const {numeroConta, valor} = req.body;
    const conta = contas.find(c => c.numeroConta == numeroConta);
    if(!conta){
        return res.status(404).json({error: 'conta nao encontrada'});
    }
    conta.saldo += valor;
    salvarConta();
    res.status(200).json({message: 'deposito ok', saldoAtual:conta.saldo});

};