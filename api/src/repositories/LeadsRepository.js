import db from '../db/models';
import { Sequelize } from 'sequelize';
const { Op } = Sequelize;

export default class LeadRepository {

  findRadialSearch(lat, lng, radius,offset,limit) {
    const location = Sequelize.literal(`ST_MakePoint(${lat},${lng})`);
    const distance = Sequelize.fn('ST_Distance_Sphere', Sequelize.col('location'), location);
    return db.leads.findAll({
      where: {
        where: Sequelize.where(distance, { [Op.lte]: radius })
      },
      offset,
      limit,
    });
  }

  radialSearchCount(lat, lng, radius) {
    const location = Sequelize.literal(`ST_MakePoint(${lat},${lng})`);
    const distance = Sequelize.fn('ST_Distance_Sphere', Sequelize.col('location'), location);
    return db.leads.findAll({
      where: {
        where: Sequelize.where(distance, { [Op.lte]: radius })
      },
      attributes:[[Sequelize.fn('COUNT', Sequelize.col('id')), 'total_leads']]
    });
  }

  findPolygonSearch(boundingBox,offset,limit) {
    const geom = `POLYGON((${boundingBox}))`;
    var contains = Sequelize.fn('ST_CONTAINS',
    Sequelize.fn('ST_POLYGONFROMTEXT',geom),
    Sequelize.col('location')
    );

    return db.leads.findAll({
      where: contains,
      offset,
      limit,
    })
  }

  polygonSearchCount(boundingBox) {
    const geom = `POLYGON((${boundingBox}))`;
    var contains = Sequelize.fn('ST_CONTAINS',
    Sequelize.fn('ST_POLYGONFROMTEXT',geom),
    Sequelize.col('location')
    );

    return db.leads.findAll({
      where: contains,
      attributes:[[Sequelize.fn('COUNT', Sequelize.col('id')), 'total_leads']]
    })
  }

  findPolygonSearchFull(boundingBox) {
    const geom = `POLYGON((${boundingBox}))`;
    var contains = Sequelize.fn('ST_CONTAINS',
    Sequelize.fn('ST_POLYGONFROMTEXT',geom),
    Sequelize.col('location')
    );

    return db.leads.findAll({
      where: contains
    })
  }
  findAll(args,limit,offset) {
    return db.leads.findAll({
      where: {
        leads_status: true,
        ...args
      },
      offset: offset,
      limit: limit,
      order: [['id', 'ASC']],
    });
  }

  bulkCreate(args) {
    return db.leads.bulkCreate(args, {
      fields: ["id"]

    })
  }

  findAllGroupBy(args,attr,group) {
    return db.leads.findAll({
      where: {
        leads_status: true,
        ...args
      },
      attributes:attr,
      group
    });
  }
  getDownloadedData(args) {
    return db.downloaded_leads.findAll({
      where: args,
      attributes:['download_count']
    })
  }

  createDownloadedData (args) {
    return db.downloaded_leads.create(args);
  }

  leadCount (args) {
    return db.leads.findAll({
      where: {
        leads_status: true,
        ...args
      },
      attributes:[[Sequelize.fn('COUNT', Sequelize.col('id')), 'total_leads']],
      raw:true
    });
  }
}
