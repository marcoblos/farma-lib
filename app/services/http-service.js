import * as axios from 'axios'
import { ConfigSettings } from 'fa-config'
import { HttpRequestSettingsModel } from 'fa-models'
import { StorageService } from 'fa-services'

const DEFAULT_SETTINGS = new HttpRequestSettingsModel()

class UrlRequestResolver {
  constructor(url, settings) {
    this.apiUrl = ConfigSettings.apiUrl()
    this.url = url
    this.settings = settings || DEFAULT_SETTINGS
  }

  resolve() {
    if (this.settings.useRawUrl) {
      return this.url
    }
    return `${this.apiUrl}${this.url}`
  }
}

export class HttpService {

  get(url, data, settings) {
    const resolvedUrl = new UrlRequestResolver(url, settings).resolve()
    return axios.get(resolvedUrl)
          .then(response => {
            return response.data
          }).catch(error => {
            debugger;
            console.error(error)
          })
  }

  post(url, data, settings) {
    const resolvedUrl = new UrlRequestResolver(url, settings).resolve()
    return axios.post(resolvedUrl, data, settings)
        .then(response => {
          return response.data
        }).catch(error => {
          debugger;
          console.error(error)
        })
  }

  _checkStatus(response) {
    if (response.data.ern === 403) {
      StorageService.setString('Usertoken', '')
    }

    if (response.status >= 200 && response.status < 300) {
      return response
    }
    const error = new Error(response.statusText)
    error.response = response
    throw error
  }
}
