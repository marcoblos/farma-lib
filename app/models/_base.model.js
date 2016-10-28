export class BaseModel {
  bind(params) {
    for (const key in params) {
      if (this.hasOwnProperty(key)) {
        this[key] = params[key]
      }
    }

    return this
  }
}
