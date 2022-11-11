import db from '../db/models';

export default class SubscriptionRepository {
  constructor() {
    this.db = db;
  }

  save(args) {
    return this.db.subscription.create(args, {
      attributes: ['users_id', 'id'],
    });
  }

  findOne(condition = {}) {
    return this.db.subscription.findOne({
      where: {
        ...condition
      },
    });
  }

  update(value, condition) {
    return this.db.subscription.update(value, {
      where: condition,
    });
  }

  findAll(args = {}) {
    return this.db.subscription.findAll({
      where: args,
      include:[{
        model:db.product_details,
        include:[{
          model:db.product_plans
        }]
      }]
    });
  }
}
