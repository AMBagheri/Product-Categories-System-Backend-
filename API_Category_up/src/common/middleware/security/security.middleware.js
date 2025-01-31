const helmet = require("helmet");

const setupSecurityHeaders = (app) => {
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: [
            "'self'",
            "data:",
            "blob:",
            "https://canadaimmigrationconsultants.ca",
            "https://admin.canadaimmigrationconsultants.ca",
            "https://api.canadaimmigrationconsultants.ca",
          ],
          scriptSrc: [
            "'self'",
            "'unsafe-inline'",
            "'unsafe-eval'",
            "https://canadaimmigrationconsultants.ca",
            "https://admin.canadaimmigrationconsultants.ca",
            "https://api.canadaimmigrationconsultants.ca",
          ],
          styleSrc: [
            "'self'",
            "'unsafe-inline'",
            "https://api.canadaimmigrationconsultants.ca",
            "https://canadaimmigrationconsultants.ca",
            "https://admin.canadaimmigrationconsultants.ca",
          ],
          imgSrc: [
            "'self'",
            "data:",
            "blob:",
            "https://canadaimmigrationconsultants.ca",
            "https://admin.canadaimmigrationconsultants.ca",
            "https://api.canadaimmigrationconsultants.ca",
          ],
          connectSrc: [
            "'self'",
            "https://canadaimmigrationconsultants.ca",
            "https://admin.canadaimmigrationconsultants.ca",
            "https://api.canadaimmigrationconsultants.ca",
          ],
          fontSrc: [
            "'self'",
            "https://canadaimmigrationconsultants.ca",
            "https://admin.canadaimmigrationconsultants.ca",
          ],
          objectSrc: ["'none'"],
          upgradeInsecureRequests: [],
        },
      },
      hsts: {
        maxAge: 31536000, // یک سال
        includeSubDomains: true,
        preload: true,
      },
      // Disable Cross-Origin-Resource-Policy to allow cross-origin requests
      crossOriginResourcePolicy: false,
    })
  );
};

module.exports = setupSecurityHeaders;
