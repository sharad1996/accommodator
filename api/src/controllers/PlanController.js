import PlanService from '../service/PlanService';
export default class PlanController {
  static async getPlan(req, res, next) {
    try {
      const {
        query
      } = req;
      const PlanObj = new PlanService();
      const plan = await PlanObj.getPlan(query);
      sendResponse(res, plan);
    } catch (err) {
      next(err);
    }
  }
  static async createPlan(req, res, next) {
    try {
      const {
        body
      } = req;
      const PlanObj = new PlanService();
      const plan = await PlanObj.createPlan(body);
      sendResponse(res, plan);
    } catch (err) {
      next(err);
    }
  }
}
