import { HttpService } from './http-service'

export class PedidoService {
  constructor() {
    this.httpService = new HttpService()
  }

  realizarPedido(data) {
    return this.httpService.post('/FazerPedido', data)
    .then((response) => {
      debugger
      return response
    }).catch((error) => {
      debugger
      return error
    })
  }

  historicoPedido() {
    return this.httpService.get('/RetornaPedidosFinalizados')
    .then((response) => {
      return response
    })
  }

  getProducts(text) {
    return this.httpService.get(`/RetornaRemedios/?query=${text}`)
    .then((response) => {
      return response
    })
  }

}
