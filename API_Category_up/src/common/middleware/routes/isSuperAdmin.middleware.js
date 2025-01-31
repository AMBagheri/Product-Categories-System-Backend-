const createHttpError = require("http-errors");
const AuthorizationMessage = require("../../messages/products.message");
const UserModel = require("../../../modules/user/user.model");

module.exports = async (req, res, next) => {
  try {
    const user = req.user; // کاربری که درخواست را ارسال کرده است

    if (!user) {
      throw new createHttpError.Unauthorized(AuthorizationMessage.Login);
    }

    // پیدا کردن کاربر هدف که قرار است ویرایش یا حذف شود
    const targetUser = await UserModel.findById(req.params.id);
    if (!targetUser) {
      throw new createHttpError.NotFound(AuthorizationMessage.UserNotFound);
    }

    // اگر کاربر درخواست‌دهنده "admin" است و کاربر هدف نیز "admin" یا "superAdmin" باشد، اجازه نمی‌دهیم
    if (
      user.role === "admin" &&
      (targetUser.role === "admin" || targetUser.role === "superAdmin")
    ) {
      throw new createHttpError.Forbidden(
        "شما مجاز به تغییر یا حذف این کاربر نیستید."
      );
    }

    next(); // اگر هیچ مشکلی نبود، ادامه دهید
  } catch (ex) {
    next(ex);
  }
};
