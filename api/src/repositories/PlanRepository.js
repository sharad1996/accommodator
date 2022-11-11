import db from '../db/models';

export default class PlanRepository {
  constructor() {
    this.db = db;
  }

  save(args) {
    return this.db.product_plans.create(args, {
      attributes: ['id'],
    });
  }

  findOne(condition = {}) {
    return this.db.product_plans.findOne({
      where: {
        ...condition
      },
    });
  }

  update(value, condition) {
    return this.db.product_plans.update(value, {
      where: condition,
    });
  }

  findAll(args = {}) {
    return this.db.product_plans.findAll({
      where: args,
      order: [['amount', 'ASC']]
    });
  }
}
