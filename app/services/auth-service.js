import {HttpService} from './http-service'

import {UserModel, LoginModel} from 'fa-models'

export class AuthService {
  constructor() {
    this._httpService = new HttpService()
    this._userService = new UserService(this._httpService)
  }

  createUser(user) {
    return this._userService.createUser(user)
  }

  doLogin(data) {
    return this._userService.doLogin(data)
  }
}

class UserService {
  constructor(httpServiceInstance) {
    this._httpService = httpServiceInstance
  }

  createUser(user) {

    let settings = new HttpRequestSettingsModel({
      contentType: 'application/x-www-form-urlencoded'
    })

    return this._httpService.post('/customers/current/addresses', data, settings)
      .then((response) => {
        return this._convertToUserModel(response)
      })
      .catch((error) => {
        throw new ErrorModel({
          message: 'Não foi possível criar o endereço.',
          error: error
        })
      })
  }

  doLogin(data) {

    return this._httpService.post('/DoLogin', data)
      .then((response) => {
        return response
      })
      .catch((error) => {
        debugger
      })
  }

  _convertToUserModel(response) {

    return new UserModel({
      name: response.name,
      email: response.email,
      password: response.password,
      phone: response.phone,
      cpf: response.cpf
    })
  }
}
