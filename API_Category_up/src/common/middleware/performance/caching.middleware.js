const apicache = require("apicache");
const cache = apicache.middleware;

const setupCaching = (app) => {
  app.use((req, res, next) => {
    if (req.method === "GET") {
      cache("30 seconds")(req, res, next);
    } else {
      next();
    }
  });
};

module.exports = setupCaching;
