import { ContaViewModel } from "../viewmodels/ContaViewModel";
import { Request, Response } from "express";

export class ContaView {
    private contaViewModel: ContaViewModel;

    constructor(contaViewModel: ContaViewModel) {
        this.contaViewModel = contaViewModel;
    }

    public renderConta(req: Request, res: Response) {
        const saldo = this.contaViewModel.getSaldo();
        const limiteCredito = this.contaViewModel.getLimiteCredito();
        const transacao = this.contaViewModel.getTransacoes();

        res.json({ saldo, limiteCredito, transacao });
    }

    public realizarTransacao(req: Request, res: Response) {
        const { tipo, valor } = req.body;
        if (tipo === "debito") {
            const sucesso = this.contaViewModel.realizaDebito(valor);
            if (!sucesso) {
                return res.status(400).json({ mensagem: "Saldo insuficiente" });
            }
        } else {
            this.contaViewModel.realizaCredito(valor);
        }

        const saldo = this.contaViewModel.getSaldo();
        const limiteCredito = this.contaViewModel.getLimiteCredito();
        const transacoes = this.contaViewModel.getTransacoes();

        res.json({ saldo, limiteCredito, transacoes });
    }

    public definirLimiteCredito(req: Request, res: Response) {
        const { limiteCredito } = req.body;
        this.contaViewModel.definirLimiteCredito(limiteCredito);
        const saldo = this.contaViewModel.getSaldo();
        const limiteCreditoAtualizado = this.contaViewModel.getLimiteCredito();
        const transacoes = this.contaViewModel.getTransacoes();

        res.json({ saldo, limiteCreditoAtualizado, transacoes });
    }
}