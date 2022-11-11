import LeadsController from '../controllers/leadsController';
import isAuth from '../middleware/isAuth';

module.exports = router => {
  router.post('/get-leads', LeadsController.getGeometricalData);
  router.get('/get-zip-code', LeadsController.getZipCode);
  router.post('/download-leads', isAuth,LeadsController.downloadsLeads);
  router.get('/download-leads', LeadsController.forceDownloadsLeads);
};
