const restrictHTTPMethods = (
  app,
  allowedMethods = ["GET", "POST", "PUT", "DELETE", "PATCH"]
) => {
  app.use((req, res, next) => {
    if (!allowedMethods.includes(req.method)) {
      return res.status(405).json({ message: "Method Not Allowed" });
    }
    next();
  });
};

module.exports = restrictHTTPMethods;
