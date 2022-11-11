import LeadService from '../service/LeadService';


export default class LeadsController {
  static async getGeometricalData(req, res, next) {
    try {
      const {
        body
      } = req;
      const leadsService = new LeadService();
      const leads = await leadsService.getLeads(body);
      sendResponse(res, leads);
    } catch (err) {
      next(err);
    }
  }

  static async getZipCode(req, res, next) {
    try {
      const leadsService = new LeadService();
      const zipCode = await leadsService.getZipCode();
      sendResponse(res, zipCode);
    } catch (err) {
      next(err);
    }
  }

  static async downloadsLeads(req, res, next) {
    try {
      const {
        body,user
      } = req;
      const leadsService = new LeadService();
      const leads = await leadsService.getLeads(body);
      const {
        leadsData
      } = leads.data;
      const path = await leadsService.downloadsLeads(leadsData,user);
      sendResponse(res, path);

    } catch (err) {
      next(err);
    }
  }

  static async forceDownloadsLeads (req, res) {
    const {query} = req;
    const path = `${__dirname}/../../public/csv/${query.file}`;
    res.download(path);
  }
}
