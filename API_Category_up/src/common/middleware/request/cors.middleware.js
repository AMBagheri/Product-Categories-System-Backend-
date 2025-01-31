const cors = require("cors");

const setupCORS = (app) => {
  app.use(
    cors({
      credentials: true,
      origin: [
        "https://canadaimmigrationconsultants.ca",
        "https://admin.canadaimmigrationconsultants.ca",
        "http://localhost:3000",
        "*", // Optional, use with caution
      ],
      methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
      allowedHeaders: ["Content-Type", "Authorization"],
    })
  );
};

module.exports = setupCORS;
