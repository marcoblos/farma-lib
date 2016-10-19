import {BaseModel} from './_base.model';

export class UserModel extends BaseModel {
    constructor(props) {
        super();

        this.nome = '';
        this.email = '';
        this.password = '';
        this.celular = '';
        this.cpf = '';

        super.bind(props);
    }
}
