const axios = require('axios');
const db = require('../db/models');
let url = process.env.FEEDER_URL;
console.log(url);
axios({
  method: 'get',
  url,
}).then(resp => {
  if (Object.keys(resp.data).length <= 0) {
    throw new Error('Invalid data');
  }
  console.log(resp.data);
  const promise = resp.data.data.map(result => {
    return new Promise(resolve => {
      const tempGeoLocation = result.geolocation.replace(/[\[\]']+/g, '');
      const splitData = tempGeoLocation.split(',');
      const geoLocationEntry = { type: 'Point', coordinates: [parseFloat(splitData[0]), parseFloat(splitData[1])] };
      const insertData = {
        first_name: 'kamal',
        last_name: 'sharma',
        address: result.address,
        mobile: result.mobile,
        location: geoLocationEntry,
        latitude: parseFloat(splitData[0]),
        longitude: parseFloat(splitData[1]),
        zipcode: 721301
      }
      resolve(insertData);
    })
  })
  Promise.all(promise).then(async data => {
    await db.leads.bulkCreate(data);
    return true;
  })

}).catch(err => {
  return err;
})