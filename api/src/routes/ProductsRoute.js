import ProductsController from "../controllers/ProductsController";
module.exports = (router) => {
  router.get("/", ProductsController.getProduct);
  router.post("/", ProductsController.insertProduct);
};
