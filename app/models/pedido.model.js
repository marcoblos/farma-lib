import {BaseModel} from './_base.model'

export class PedidoModel extends BaseModel {
    constructor(props) {
        super()

        this.idPedido = ''
        this.horaPedido = ''
        this.status = ''
        this.formaPagamento = ''
        this.cartao = ''
        this.trocoPara = ''
        this.outroPagamento = ''
        this.contato = ''
        this.dataPedido = ''
        this.endereco = []
        this.produtos = []
        this.cotacoes = []

        super.bind(props)
    }
}
