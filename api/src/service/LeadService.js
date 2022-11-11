import LeadsRepository from '../repositories/LeadsRepository';
import SubscriptionRepository from '../repositories/SubscriptionRepository';
const json2csv = require('json2csv').parse;
import fs from 'fs';

import _ from 'lodash';
import {
  Sequelize
} from 'sequelize';
const {
  Op
} = Sequelize;

export default class LeadService {
  async getLeads(query) {
    const dataLimit = process.appConfig.fetchDataLimit;
    let leadsData;
    let lat;
    let lng;
    let leadsCount = 0;
    let leadsPage = 0;
    const leadRepo = new LeadsRepository();
    if (query.hasOwnProperty('shape') && query.shape === 'circle') {
      if (!_.has(query, 'lat') || !_.has(query, 'lng') || !_.has(query, 'radius') || !_.isNumber(query.lat) || !_.isNumber(query.lng) || !_.isNumber(query.radius)) {
        throw new Error('Invalid coordinates');
      }
      lat = parseFloat(query.lat);
      lng = parseFloat(query.lng);
      const radius = parseFloat(query.radius);
      if (query.hasOwnProperty('page')) {
        const countData = await leadRepo.radialSearchCount(lat, lng, radius);
        leadsCount = countData[0].get('total_leads');
        const offset = (query.page-1) *dataLimit;
        leadsPage = Math.ceil(parseFloat(leadsCount/ dataLimit,10));
        leadsData = await leadRepo.findRadialSearch(lat, lng, radius,offset,dataLimit);
      } else {
        leadsData = await leadRepo.findRadialSearch(lat, lng, radius,0,99999999999);
      }
    } else if (query.hasOwnProperty('shape') && query.shape === 'polygon') {
      const finalData = query.latLng.map(data => {
        return (data.join(' '));
      });

      finalData.push(finalData[0])
      const boundingBox = finalData.join(',');
      if (query.hasOwnProperty('page')) {
        const countData = await leadRepo.polygonSearchCount(boundingBox);
        leadsCount = countData[0].get('total_leads');
        const offset = (query.page-1) *dataLimit;
        leadsPage = Math.ceil(parseFloat(leadsCount/ dataLimit,10));
        leadsData = await leadRepo.findPolygonSearch(boundingBox,offset,dataLimit);
      } else {
        leadsData = await leadRepo.findPolygonSearchFull.findPolygonSearchFull(boundingBox);
      }
    } else if (query.hasOwnProperty('zipcode')) {
      if (query.hasOwnProperty('page')) {
        const countData = await leadRepo.leadCount({
          zipcode: query.zipcode
        });
        const offset = (query.page-1) *dataLimit;
        leadsCount = countData[0].total_leads;
        leadsPage = Math.ceil(parseFloat(leadsCount/ dataLimit,10));
        leadsData = await leadRepo.findAll({
          zipcode: query.zipcode
        }, dataLimit, offset);

      } else {
        //handled DownloadData;
        leadsData = await leadRepo.findAll({
          zipcode: query.zipcode
        },999999999999999999,1);
      }
    } else {
      throw new Error('Invalid Data');
    }
    return buildResponseData({
      data: {
        leadsData:leadsData,
        leadsCount,
        leadsPage
      },
      message: 'success'
    });
  }

  async getZipCode() {
    const leadRepo = new LeadsRepository();
    const zipData = await leadRepo.findAllGroupBy({}, ['zipcode'], ['zipcode']);
    return buildResponseData({
      data: zipData,
      message: 'success'
    });
  }

  async downloadsLeads(leadsData, user) {
    try {
      const leadRepo = new LeadsRepository();
      const subscriptionRepo = new SubscriptionRepository();
      let path;
      let csvData = [];
      const getDownloadedData = await leadRepo.getDownloadedData({
        users_id: user.uuid
      });
      const getSubscribedData = await subscriptionRepo.findAll({
        users_id: user.uuid,
        subscription_status: true,
        payment_status: true
      });
      let downloadedDataCount = 0;
      let subscribedDataCount = 0;
      for (let k = 0; k < getDownloadedData.length; k++) {
        downloadedDataCount += parseInt(getDownloadedData[k].download_count);
      }
      for (let m = 0; m < getSubscribedData.length; m++) {
        subscribedDataCount += parseInt(getSubscribedData[m].product_detail.get('leads_count'));
      }
      const finalCountData = subscribedDataCount - downloadedDataCount;
      if (finalCountData <= 0) {
        throw new Error('Your subscription leads lapse. Please recharge to enjoy')
      }
      const fields = ['firstName', 'last_name', 'address', 'zipcode', 'mobile'];
      if (leadsData.length <= 0) {
        throw new Error('Invalid data');
      }
      leadsData.map(leads => {
        const data = {
          firstName: leads.first_name,
          last_name: leads.last_name,
          address: leads.address,
          zipcode: leads.zipcode,
          mobile: leads.mobile

        };
        csvData.push(data);
      });
      const dir = `${__dirname}/../../public/csv/`;
      if (!fs.existsSync(dir)) {
        const publicDir = `${__dirname}/../../public/`;
        if (!fs.existsSync(publicDir)) {
          fs.mkdirSync(publicDir);
        }
        fs.mkdirSync(`${publicDir}csv`);
      }
      const fileName = `file${Date.now()}_leads.csv`;
      path = `${dir}${fileName}`;
      const csv = json2csv(csvData, fields);
      fs.writeFileSync(path, csv);
      const finalUrl = `${process.appConfig.apiURL}/leads/download-leads?file=${fileName}`;
      await leadRepo.createDownloadedData({
        users_id: user.uuid,
        download_file: finalUrl,
        download_count: csvData.length
      });
      return buildResponseData({
        data: finalUrl,
        message: 'success'
      });
    } catch (err) {
      throw new Error(err.message);
    }
  }
}
