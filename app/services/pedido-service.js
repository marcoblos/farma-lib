import { HttpService } from './http-service'

export class PedidoService {
  constructor() {
    this.httpService = new HttpService()
  }

  realizarPedido(data) {
    return this.httpService.post('/FazerPedido', data)
    .then(response => {
      return response
    }).catch(error => {
      return error
    })
  }

  historicoPedido() {
    return this.httpService.get(`/RetornaPedidosFinalizados`)
    .then(response => {
      return response
    })
  }

  getProducts(text) {
    return this.httpService.get(`/mobile/getRemedio?query=${text}`)
    .then(response => {
      return response
    })
  }

}
