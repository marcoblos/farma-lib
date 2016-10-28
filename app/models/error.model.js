import { BaseModel } from './_base.model'

export class ErrorModel extends BaseModel {
  constructor(properties) {
    super()

    this.message = 'Ocorreu um erro inesperado. Por favor, tente mais tarde'
    this.error = new Error()

    super.bind(properties)

    this.isErrorModel = true
  }
}
