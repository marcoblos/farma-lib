import * as axios from 'axios';
import {ConfigSettings} from 'fa-config';
import {HttpRequestSettingsModel} from 'fa-models';
import { StorageService } from 'fa-services';

const DEFAULT_SETTINGS = new HttpRequestSettingsModel();

export class HttpService {

    get(url, data, settings) {
      let resolvedUrl = new UrlRequestResolver(url, settings).resolve();
      return axios.get(resolvedUrl)
          .then(this._checkStatus)
          .then((response) => {
            debugger;
              return response.data;
          });
    }

    post(url, data, settings) {

      let resolvedUrl = new UrlRequestResolver(url, settings).resolve();
      return axios.post(resolvedUrl, data, settings)
        .then((response) => {
          // debugger;
          if(response.headers.authtoken) {
            StorageService.setString('Authtoken', response.headers.authtoken.toString());
            axios.defaults.headers.common['Authtoken'] = response.headers.authtoken.toString();
          }
          return response.data;
        });
    }

    _checkStatus(response) {

        if(response.data.ern === 403) {
          StorageService.setString('Usertoken', '');
        }

        if (response.status >= 200 && response.status < 300) {
          return response;
        } else {
          let error = new Error(response.statusText);
          error.response = response;
          throw error;
        }
    }
}

class UrlRequestResolver {
    constructor(url, settings) {
      this._apiUrl = ConfigSettings.apiUrl();
      this._url = url;
      this._settings = settings || DEFAULT_SETTINGS;
    }

    resolve() {
        if (this._settings.useRawUrl) {
            return this._url;
        }
        else {
            return `${this._apiUrl}${this._url}`;
        }
    }
}
