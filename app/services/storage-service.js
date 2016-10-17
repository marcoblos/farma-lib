import { AsyncStorage } from 'react-native';

const KEY_PREFIX = '$FA_STORAGE_';

function _buildKey(key) {
    return KEY_PREFIX + key;
}

export class StorageService {
    constructor() {
        throw new Error("StoreService can't be instantiate.");
    }

    static getString(key) {
        return AsyncStorage.getItem(_buildKey(key));
    }

    static setString(key, value) {
        return AsyncStorage.setItem(_buildKey(key), value);
    }

    static getObject(key) {
        return AsyncStorage.getItem(_buildKey(key))
                           .then((result) => {
                               if(!!result) {
                                   return JSON.parse(result);
                               }
                               return null;
                           });
    }

    static setObject(key, value) {
        return AsyncStorage.setItem(_buildKey(key), JSON.stringify(value));
    }

    static remove(key) {
        return AsyncStorage.removeItem(_buildKey(key));
    }
}
