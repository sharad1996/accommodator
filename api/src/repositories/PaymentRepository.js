import db from '../db/models';

export default class PaymentRepository {
  constructor() {
    this.db = db;
  }

  save(args) {
    return this.db.payments.create(args, {
      attributes: ['users_id', 'id'],
    });
  }

  findOne(condition = {}) {
    return this.db.payments.findOne({
      where: {
        ...condition
      },
    });
  }

  update(value, condition) {
    return this.db.payments.update(value, {
      where: condition,
    });
  }

  findAll(args = {}) {
    return this.db.payments.findAll({
      where: args,
    });
  }
}
