import {BaseModel} from './_base.model'

import { ProdutoModel } from './produto.model'

export class CotacaoModel extends BaseModel {
    constructor(props) {
        super()

        this.formaPagamento = ''
        this.frete = ''
        this.freteFormatado = ''
        this.idCotacao = ''
        this.farmacia = ''
        this.telefone = ''
        this.tempoDeEntrega = ''
        this.total = ''
        this.totalFormatado = ''
        this.produtos = new ProdutoModel()


        super.bind(props)
    }
}
