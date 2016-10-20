export class BaseModel {
    bind(params) {
        for(var key in params) {
            if(this.hasOwnProperty(key)) {
                this[key] = params[key]
            }
        }

        return this
    }
}