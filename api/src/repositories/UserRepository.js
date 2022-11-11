import { Sequelize } from 'sequelize';
import db from '../db/models';

const { Op } = Sequelize;

export default class UserRepository {
  constructor() {
    this.db = db;
  }

  save(args) {
    return this.db.user.create(args, {
      attributes: ['uuid', 'firstName', 'lastName', 'email', 'createdAt', 'updatedAt'],
    });
  }

  findOne(condition = {}) {
    return this.db.user.findOne({
      where: { ...condition, isDeleted: false },
    });
  }

  update(value, condition) {
    return this.db.user.update(value, {
      where: condition,
    });
  }

  findAll(args) {
    return this.db.user.findAll({
      where: {
        isDeleted: false,
        uuid: {
          [Op.ne]: args.uuid,
        },
      },
      order: [['updatedAt', 'DESC']],
      attributes: ['uuid', 'firstName', 'lastName', 'email', 'createdAt', 'updatedAt'],
    });
  }
}
