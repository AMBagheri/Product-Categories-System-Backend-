const createHttpError = require("http-errors");


module.exports = async (req, res, next) => {
  try {
    const user = req.user;

    if (user.role !== "admin" && user.role !== "superAdmin") {
      throw new createHttpError.Forbidden("شما ادمین نیستید");
    }

    next();
  } catch (ex) {
    next(ex);
  }
};
