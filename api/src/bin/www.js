import app from "../app";
import http from "http";
const debug = require("debug")("api:server");
import models from "../db/models";
const port = normalizePort(process.env.PORT || "3032");
app.set("port", port);
const server = http.createServer(app);

models.sequelize.sync().then(() => {
  server.listen(port, () => {
    console.log(`Express server listening on port ${server.address().port}`);
  });
});

function normalizePort(val) {
  // eslint-disable-next-line no-shadow
  const port = parseInt(val, 10);

  // eslint-disable-next-line no-restricted-globals
  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}
