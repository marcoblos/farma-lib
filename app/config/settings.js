// const API_URL = 'https://www.farmaexpress.com.br/pedido_teste/index.php'
const API_URL = 'https://criacaodesites.info/pedido_app/index.php'
const GCM_SENDER_ID = ''

export class ConfigSettings {
    static apiUrl(){
        return API_URL
    }

    static apiAuthUrl() {
        return API_URL
    }

    static getGCMSenderId() {
        return GCM_SENDER_ID
    }

    static getUsertoken() {
      return '37399709-9593-45fc-9d8c-8192ebcf2255'
    }
}
