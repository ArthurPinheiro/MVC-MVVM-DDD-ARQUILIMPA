import { ContaModel } from "../models/ContaModel";
import { Transacao } from "../models/Transacao";

export class ContaViewModel {
    private contaModel: ContaModel;

    constructor(contaModel: ContaModel) {
        this.contaModel = contaModel;
    }

    public realizaDebito(valor: number): boolean {
        return this.contaModel.realizarDebito(valor);
    }

    public realizaCredito(valor: number): void {
        this.contaModel.realizaCredito(valor);
    }

    public definirLimiteCredito(limiteCredito: number): void {
        this.contaModel.definirLimiteCredito(limiteCredito);
    }

    public getSaldo(): number {
        return this.contaModel.getSaldo();
    }

    public getLimiteCredito(): number {
        return this.contaModel.getLimiteCredito();
    }

    public getTransacoes(): Transacao[] {
        return this.contaModel.getTransacoes().map((transacao) => {
            return {
                tipo: transacao.tipo,
                valor: transacao.valor,
                data: new Date(transacao.data.getTime())
            };
        });
    }
}