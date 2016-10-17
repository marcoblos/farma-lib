import {BaseModel} from './_base.model';

export class CategoryModel extends BaseModel {
    constructor(properties) {
        super();
        
        this.id = 0;
        this.image = '';
        this.name = '';
        
        super.bind(properties);
    }
}