import {HttpService} from './http-service';
import * as axios from 'axios';

import { StorageService } from 'fa-services';

import {UserModel, LoginModel, HttpRequestSettingsModel, ErrorModel, ProdutoModel, PedidoModel, EnderecoModel, CotacaoModel} from 'fa-models';

export class AccountService {
  constructor() {
    this._httpService = new HttpService();
    this._userService = new UserService(this._httpService);
  }

  createUser(user) {
    return this._userService.createUser(user);
  }

  getPedidosLista() {
    return this._userService.getPedidosLista();
  }

  getPedido(data) {
    return this._userService.getPedido(data);
  }

  cancelarPedido(data) {
    return this._userService.cancelarPedido(data);
  }

  cancelarCompra(data) {
    return this._userService.cancelarCompra(data);
  }

  aceitarCotacao(data) {
    return this._userService.aceitarCotacao(data);
  }

  getEnderecos() {
    return this._userService.getEnderecos();
  }

  finalizarPedido(data) {
    return this._userService.finalizarPedido(data);
  }

  removerEndereco(data) {
    return this._userService.removerEndereco(data);
  }

  teste(data) {

    return this._userService.teste(data);
  }

  retornarNotificacoes() {
    return this._userService.retornarNotificacoes();
  }
}

class UserService {
  constructor(httpServiceInstance) {
    this._httpService = httpServiceInstance;
  }

  createUser(user) {

    let settings = new HttpRequestSettingsModel({
      useRawUrl: true,
      contentType: 'application/json'
    });

    return this._httpService.post('https://farmaexpress-create-user.now.sh', user, settings)
      .then((response) => {
        return this._convertToUserModel(response);
      })
  }

  _convertToUserModel(response) {

    return new UserModel({
      name: response.name,
      email: response.email,
      password: response.password,
      phone: response.phone,
      cpf: response.cpf
    });
  }

  getPedidosLista() {

    return this._httpService.post('/RetornaPedidos')
      .then((response) => {
        return response;
      })
  }

  // IDPedido
  cancelarPedido(data) {

    return this._httpService.post('/CancelarPedido', data)
      .then((response) => {
        return response;
      })
  }

  // IDPedido
  cancelarCompra(data) {

    return this._httpService.post('/CancelarCompra', data)
      .then((response) => {
        return response;
      })
  }

  teste(data) {

    return this._httpService.get('/webapp/teste')
      .then((response) => {
        return response;
      }).catch((error) => {
        debugger;
      })
  }

  retornarNotificacoes() {

    return this._httpService.get('/RetornaPainelNotificacoes')
      .then((response) => {
        return response;
      })
  }

  finalizarPedido(data) {

    return this._httpService.post('/mobile/finalizarPedido', data)
      .then((response) => {
        return response;
      })
  }

  getEnderecos() {

    return this._httpService.post('/RetornaEnderecos')
      .then((response) => {
        return this._convertToEnderecoModel(response);
      })
  }

  _convertToEnderecoModel(response) {

    let enderecos = [];

    if(response && response.length) {
      response.forEach((e) => {
        enderecos.push(new EnderecoModel({
          id: e.IDEndereco,
          cep: e.CEP,
          cidade: e.Cidade,
          bairro: e.Bairro,
          rua: e.Rua,
          numero: e.Numero,
          complemento: e.Complemento,
          uf: e.UF
        }))
      })
    }

    return enderecos;
  }

  aceitarCotacao(data) {

    return this._httpService.post('/ComprarCotacao', data)
      .then((response) => {
        return response;
      })
  }

  removerEndereco(data) {

    return this._httpService.post('/webapp/RemoveEndereco', data)
      .then((response) => {
        return response;
      })
  }

  getPedido(data) {

    return this._httpService.post('/RetornaCotacoesPedido', data)
      .then((response) => {
        return this._convertToPedidoModel(response);
      })
  }

  _convertToPedidoModel(response) {

    let produtos = [];
    let cotacoes = [];

    if(response.Pedido.Produtos && response.Pedido.Produtos.length) {
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
          imagens: p.Imagens
        }))
      })
    }

    if(response.Cotacoes && response.Cotacoes.length) {

      response.Cotacoes.forEach((c) => {

        let produtosCotacao = [];

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
          produtos: produtosCotacao
        }))

        if(c.Produtos && c.Produtos.length) {
          c.Produtos.forEach((p) => {
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
              unidade: p.Un
            }))
          })
        }
      });
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
        uf: response.Pedido.UF
      }),
      produtos: produtos,
      cotacoes: cotacoes
    });
  }

}
