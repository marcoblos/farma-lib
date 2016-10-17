import {BaseModel} from './_base.model';

export class HttpRequestSettingsModel extends BaseModel {
    constructor(properties) {
        super();

        this.useRawUrl = false;
        this.contentType = 'application/json';

        super.bind(properties);
    }
}
