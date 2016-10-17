import {HttpService} from './http-service';
import {ProductDetailModel} from 'sz-models';

export class ProductsService {
    constructor() {
        this.httpService = new HttpService();
    }

    getProductDetail(id) {
        return this.httpService.get('/product-detail/' + id)
            .then((response) => {
                return this._convertToProductDetail(response);
            });
    }

    getProductList(page = 1) {
        return this.httpService.get('/product-list/' + page)
            .then((response) => {
                return response.map((p) => {
                    return this._convertToProductDetail(p);
                });
            });
    }

    _convertToProductDetail(responseData) {
        let productDetail = new ProductDetailModel();
        productDetail.id = Number(responseData.id);
        productDetail.name = responseData.name;
        productDetail.price = Number(responseData.price);
        productDetail.installment = responseData.installment;
        productDetail.availableSizes = responseData.availableSizes;
        productDetail.images = responseData.images;
        productDetail.liked = responseData.liked;

        return productDetail;
    }
}