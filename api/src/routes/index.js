const changeCase = require('change-case');
import express from 'express';
const routeFileNames = require('require-dir')();
module.exports = app => {
  Object.keys(routeFileNames).forEach(routeFileName => {
    const routeName = routeFileName.replace('Route', '');
    const router = express.Router();
    // eslint-disable-next-line
    require(`./${routeFileName}`)(router);
    app.use(`/${changeCase.paramCase(routeName)}`, router);
  });
};
