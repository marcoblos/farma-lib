import { HttpService } from './http-service'

import { UserModel } from 'fa-models'

export class AuthService {
  constructor() {
    this.httpService = new HttpService()
    this.userService = new UserService(this.httpService)
  }

  createUser(user) {
    return this.userService.createUser(user)
  }

  doLogin(data) {
    return this.userService.doLogin(data)
  }
}

class UserService {
  constructor(httpServiceInstance) {
    this.httpService = httpServiceInstance
  }

  createUser() {
    const settings = new HttpRequestSettingsModel({
      contentType: 'application/x-www-form-urlencoded',
    })

    return this.httpService.post('/customers/current/addresses', data, settings)
      .then((response) => {
        return this.convertToUserModel(response)
      })
      .catch((error) => {
        throw new ErrorModel({
          message: 'Não foi possível criar o endereço.',
          error,
        })
      })
  }

  doLogin(data) {
    return this.httpService.post('/DoLogin', data)
      .then((response) => {
        return response
      })
      .catch((error) => {
        console.error(error)
      })
  }

  convertToUserModel(response) {
    return new UserModel({
      name: response.name,
      email: response.email,
      password: response.password,
      phone: response.phone,
      cpf: response.cpf,
    })
  }
}
