const cron = require('node-cron');
const { Client } = require('pg')

// schedule tasks to be run on the server
export const updateLeads = cron.schedule("0 0 */2 * * * *", async () => {
    let results = [];
    console.log('Cron job start-------------------');
    const client = new Client({
        host: 'ec2-54-221-214-183.compute-1.amazonaws.com',
        database: 'dbqblutelakqvb',
        username: 'yabsfadlkljrel',
        password: '8c433220f06437ee6bdf203bcccb9821acda9901546ce0a36e5c1ff7be00f17c',
    });
    client.query("SELECT * FROM leads").then(resp => {
        console.log('query response', resp);
        if (Object.keys(resp).length <= 0) {
          throw new Error('Invalid data');
        }
        if(resp.length) {
            results = resp.map((lead) => {
                client.query(`UPDATE LEADS set Location = ST_Point(${lead.latitude}, ${lead.longitude}) where Location IS NULL`);
            });
        }
        console.log('Cron job end---------------------');
    });
},{
    scheduled: true,
});



