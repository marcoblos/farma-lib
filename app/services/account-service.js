import { HttpService } from './http-service'
import { UserModel, ProdutoModel, PedidoModel, EnderecoModel, CotacaoModel } from 'fa-models'

export class AccountService {
  constructor() {
    this.httpService = new HttpService()
    this.userService = new userService(this.httpService)
  }

  createUser(user) {
    return this.userService.createUser(user)
  }

  getPedidosLista() {
    return this.userService.getPedidosLista()
  }

  getPedido(data) {
    return this.userService.getPedido(data)
  }

  cancelarPedido(data) {
    return this.userService.cancelarPedido(data)
  }

  cancelarCompra(data) {
    return this.userService.cancelarCompra(data)
  }

  aceitarCotacao(data) {
    return this.userService.aceitarCotacao(data)
  }

  getEnderecos() {
    return this.userService.getEnderecos()
  }

  finalizarPedido(data) {
    return this.userService.finalizarPedido(data)
  }

  removerEndereco(data) {
    return this.userService.removerEndereco(data)
  }

  teste(data) {
    return this.userService.teste(data)
  }

  retornarNotificacoes() {
    return this.userService.retornarNotificacoes()
  }

  getNotificacoesLista() {
    return this.userService.getNotificacoesLista()
  }

  getHistoricoLista() {
    return this.userService.getHistoricoLista()
  }

  getInformacoesUsuario() {
    return this.userService.getInformacoesUsuario()
  }

  createVisitante() {
    return this.userService.createVisitante()
  }

  vincularDevice(data) {
    console.log('DENTRO DO VINCULAR DEVICE')
    return this.httpService.post('/VincularDevice', data)
      .then((response) => {
        console.log('account-service vincular device', response)
        return response
      }, (error) => {
        console.log('Erro URL vincular device', error)
      })
  }
}

class userService {
  constructor(httpServiceInstance) {
    this.httpService = httpServiceInstance
  }

  createUser(user) {
    return this.httpService.post('/SalvarCliente', user)
      .then((response) => {
        return response
      })
  }

  convertToUserModel(response) {
    return new UserModel({
      nome: response.Nome,
      email: response.Email,
      celular: response.Celular,
      token: response.Token,
    })
  }

  getPedidosLista() {
    return this.httpService.post('/RetornaPedidos')
      .then((response) => {
        return response
      })
  }

  // IDPedido
  cancelarPedido(data) {
    return this.httpService.post('/CancelarPedido', data)
      .then(response => {
        return response
      })
  }

  // IDPedido
  cancelarCompra(data) {
    return this.httpService.post('/CancelarCompra', data)
      .then(response => {
        return response
      }).catch(error => {
        console.log(error)
      })
  }

  teste(data) {
    return this.httpService.get('/webapp/teste')
      .then(response => {
        return response
      }).catch(error => {
        console.log(error)
      })
  }

  retornarNotificacoes() {
    return this.httpService.get('/RetornaPainelNotificacoes')
      .then(response => {
        return response
      })
  }

  getNotificacoesLista() {
    return this.httpService.post('/RetornaPedidosNotificados')
      .then(response => {
        return response
      }).catch(error => {
        console.log(error)
      })
  }

  getHistoricoLista() {
    return this.httpService.post('/RetornaPedidosFinalizados')
      .then((response) => {
        return response
      }).catch(error => {
        console.log(error)
      })
  }

  getInformacoesUsuario() {
    return this.httpService.post('/RetornaDadosCliente')
      .then(response => {
        return this.convertToUserModel(response)
      }).catch(error => {
        console.log(error)
      })
  }

  finalizarPedido(data) {
    return this.httpService.post('/mobile/finalizarPedido', data)
      .then(response => {
        return response
      })
  }

  getEnderecos() {
    return this.httpService.post('/RetornaEnderecos')
      .then(response => {
        return this.convertToEnderecoModel(response)
      })
  }

  convertToEnderecoModel(response) {
    const enderecos = []

    if (response && response.length) {
      response.forEach(e => {
        enderecos.push(new EnderecoModel({
          id: e.IDEndereco,
          cep: e.CEP,
          cidade: e.Cidade,
          bairro: e.Bairro,
          rua: e.Rua,
          numero: e.Numero,
          complemento: e.Complemento,
          uf: e.UF,
        }))
      })
    }

    return enderecos
  }

  aceitarCotacao(data) {
    return this.httpService.post('/ComprarCotacao', data)
      .then(response => {
        return response
      })
  }

  removerEndereco(data) {
    return this.httpService.post('/webapp/RemoveEndereco', data)
      .then(response => {
        return response
      })
  }

  createVisitante() {
    return this.httpService.post('/SalvarVisitante')
      .then(response => {
        return this.convertToUserModel(response)
      })
  }

  getPedido(data) {
    return this.httpService.post('/RetornaCotacoesPedido', data)
      .then(response => {
        return this.convertToPedidoModel(response)
      })
  }

  convertToPedidoModel(response) {
    const produtos = []
    const cotacoes = []

    if (response.Pedido.Produtos && response.Pedido.Produtos.length) {
      response.Pedido.Produtos.forEach((p) => {
        produtos.push(new ProdutoModel({
          generico: p.AceitaGenerico,
          similares: p.AceitaSimilares,
          nome: p.Nome,
          desejaFotos: p.DesejaFotos,
          obs: p.Detalhes,
          id: p.IDProduto,
          valor: p.Preco,
          valorFormatado: p.PrecoFormatado,
          quantidade: p.Qtd,
          unidade: p.Un,
          imagens: p.Imagens,
        }))
      })
    }

    if (response.Cotacoes && response.Cotacoes.length) {
      response.Cotacoes.forEach(c => {
        const produtosCotacao = []

        cotacoes.push(new CotacaoModel({
          formaPagamento: c.FormaPagamento,
          frete: c.Frete,
          freteFormatado: c.FreteFormatado,
          idCotacao: c.IDCotacao,
          farmacia: c.Nome,
          telefone: c.Telefone,
          tempoDeEntrega: c.TempoEntrega,
          total: c.Total,
          totalFormatado: c.TotalFormatado,
          produtos: produtosCotacao,
        }))

        if (c.Produtos && c.Produtos.length) {
          c.Produtos.forEach(p => {
            produtosCotacao.push(new ProdutoModel({
              generico: p.AceitaGenerico,
              similares: p.AceitaSimilares,
              nome: p.Nome,
              desejaFotos: p.DesejaFotos,
              obs: p.Detalhes,
              id: p.IDProduto,
              valor: p.Preco,
              valorFormatado: p.PrecoFormatado,
              quantidade: p.Qtd,
              unidade: p.Un,
            }))
          })
        }
      })
    }

    return new PedidoModel({
      idPedido: response.Pedido.IDPedido,
      horaPedido: response.Pedido.HoraPedido,
      status: response.Pedido.Status,
      formaPagamento: response.Pedido.FormaPagamento,
      cartao: response.Pedido.Cartao,
      trocoPara: response.Pedido.TrocoPara,
      outroPagamento: response.Pedido.OutroPagamento,
      contato: response.Pedido.Contato,
      dataPedido: response.Pedido.DataPedido,
      endereco: new EnderecoModel({
        cep: response.Pedido.CEP,
        cidade: response.Pedido.Cidade,
        bairro: response.Pedido.Bairro,
        rua: response.Pedido.Rua,
        numero: response.Pedido.Numero,
        complemento: response.Pedido.Complemento,
        uf: response.Pedido.UF,
      }),
      produtos,
      cotacoes,
    })
  }

}
