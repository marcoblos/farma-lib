import { createStore } from 'redux';

function toasterStore(state = null, action) {
    return action.data;
}

function sendEvent(type, message, options) {
    global.toasterStore.dispatch({
        type: type,
        data: {
            type: type,
            message: message,
            options: options
        }
    });
}

global.toasterStore = createStore(toasterStore);

const MESSAGE_TYPES = {
    SUCCESS: 'SUCCESS',
    ERROR: 'ERROR'
}

const EMPTY_FUNCTION = function(){};

export class ToasterService {
    static registerListener(listener) {
        global.toasterStore.subscribe(() => {
            let state = global.toasterStore.getState();
            listener(state);
        });
    }

    static success(type, message, options) {
        sendEvent(MESSAGE_TYPES.SUCCESS, type, message, options);
    }

    static error(type, message, options) {
        sendEvent(MESSAGE_TYPES.ERROR, type, message, options);
    }
}
