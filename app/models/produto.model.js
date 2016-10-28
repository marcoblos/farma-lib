import { BaseModel } from './_base.model'

export class ProdutoModel extends BaseModel {
  constructor(props) {
    super()

    this.generico = ''
    this.similares = ''
    this.nome = ''
    this.desejaFotos = ''
    this.obs = ''
    this.id = ''
    this.valor = ''
    this.valorFormatado = ''
    this.quantidade = ''
    this.unidade = ''
    this.imagens = []
    this.aceito = 1

    super.bind(props)
  }
}
