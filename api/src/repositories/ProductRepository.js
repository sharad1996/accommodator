import db from "../db/models";

export default class ProductRepository {
  constructor() {
    this.db = db;
  }

  save(args) {
    return this.db.product_details.create(args, {
      attributes: ["id"],
    });
  }

  findOne(condition = {}) {
    return this.db.product_details.findOne({
      where: {
        ...condition,
      },
    });
  }

  update(value, condition) {
    return this.db.product_details.update(value, {
      where: condition,
    });
  }

  findAll(args = {}) {
    return this.db.product_details.findAll({
      where: args,
      include: [
        {
          model: db.product_plans,
        },
      ],
      order: [["amount", "ASC"]],
    });
  }
}
