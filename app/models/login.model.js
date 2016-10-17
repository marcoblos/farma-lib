import {BaseModel} from './_base.model';

export class LoginModel extends BaseModel {
    constructor(properties) {
        super();

        this.userName = '';
        this.password = '';

        super.bind(properties);
    }
}
