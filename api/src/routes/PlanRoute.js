import PlanController from '../controllers/PlanController';
module.exports = router => {
  router.get('/', PlanController.getPlan);
  router.post('/addplan', PlanController.createPlan);
};
