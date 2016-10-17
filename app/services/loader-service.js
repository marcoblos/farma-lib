import { createStore } from 'redux';

function loader(state = false, action) {
    switch(action.type) {
        case 'SHOW':
            return true;
        case 'HIDE':
            return false;

        default:
            return false;
    }
}

global.loaderStore = createStore(loader);

export class LoaderService {
    static addListener(listener) {
        global.loaderStore.subscribe(() => {
            let state = global.loaderStore.getState();
            listener(state);
        });
    }

    static show() {
        global.loaderStore.dispatch({ type: 'SHOW' });
    }

    static hide() {
        global.loaderStore.dispatch({ type: 'HIDE' });
    }
}
