import ProductService from "../service/ProductService";
export default class ProductsController {
  static async getProduct(req, res, next) {
    try {
      const { query } = req;
      const ProductObj = new ProductService();
      const products = await ProductObj.getProduct(query);
      sendResponse(res, products);
    } catch (err) {
      next(err);
    }
  }
  static async insertProduct(req, res, next) {
    try {
      const { body } = req;
      console.log("request", req);
      const ProductObj = new ProductService();
      const products = await ProductObj.insertProduct(body);
      sendResponse(res, products);
    } catch (err) {
      next(err);
    }
  }
}
