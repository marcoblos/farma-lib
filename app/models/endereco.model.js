import {BaseModel} from './_base.model';

export class EnderecoModel extends BaseModel {
    constructor(props) {
        super();

        this.id = '';
        this.cep = '';
        this.cidade = '';
        this.bairro = '';
        this.rua = '';
        this.numero = '';
        this.complemento = '';
        this.uf = '';

        super.bind(props);
    }
}
