
import PlanRepository from '../repositories/PlanRepository';
export default class PlanService {
  constructor() {
    this.planRepo = new PlanRepository();
  }
  /**
   * @method getplan
   * @param {*} args
   * @returns
   * @memberof PlanService
   */

  async getPlan(args) {
    const plans = await this.planRepo.findAll(args);
    return buildResponseData({
      data: plans,
      message: 'success'
    });
  }
  async createPlan(args) {
    const plan = await this.planRepo.save(args);
    return buildResponseData({
      data: plan,
      message: 'success'
    })
  }

  async update(updateData, condition) {
    try {
      if (Object.keys(condition).length <= 0) {
        throw new Error('invalid data');
      }
      await this.planRepo.update(updateData, condition);
      return buildResponseData({
        data: updateData,
        message: 'success'
      });
    } catch (err) {
      throw new Error(err.message);
    }
  }
}
