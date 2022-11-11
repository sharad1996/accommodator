import ProductRepository from "../repositories/ProductRepository";
export default class ProductService {
  constructor() {
    this.productRepo = new ProductRepository();
  }
  /**
   * @method getProduct
   * @param {*} args
   * @returns
   * @memberof ProductService
   */

  async getProduct(args) {
    const product = await this.productRepo.findAll(args);
    return buildResponseData({
      data: product,
      message: "success",
    });
  }

  async insertProduct(args) {
    const insertedProduct = await this.productRepo.save(args);
    return buildResponseData({
      data: insertedProduct,
      message: "success",
    });
  }

  async update(updateData, condition) {
    try {
      if (Object.keys(condition).length <= 0) {
        throw new Error("invalid data");
      }
      await this.productRepo.update(updateData, condition);
      return buildResponseData({
        data: updateData,
        message: "success",
      });
    } catch (err) {
      throw new Error(err.message);
    }
  }
}
