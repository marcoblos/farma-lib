import {BaseModel} from './_base.model';

export class UserModel extends BaseModel {
    constructor(props) {
        super();

        this.name = '';
        this.email = '';
        this.password = 0;
        this.phone = 0;
        this.cpf = '';

        super.bind(props);
    }
}
