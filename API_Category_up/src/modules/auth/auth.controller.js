const dotenv = require("dotenv");
const autoBind = require("auto-bind");
const authService = require("./auth.service");
const {Message} = require("../../common/messages/product.message");
const createHttpError = require("http-errors");
const {
    loginSchema,
} = require("../../common/middleware/joi/validation.auth");

dotenv.config();

class AuthController {
    #service;

    constructor() {
        autoBind(this);
        this.#service = authService;
    }

    async register(req, res, next) {
        const { email, password } = req.body;

        try {
            const { user, token } = await this.#service.registerUser( email, password ); // ارسال ورودی به سرویس

            // پاسخ به کلاینت
            return res.status(201).json({
                message: Message.REGISTER_SUCCESS,  // پیام موفقیت‌آمیز ثبت‌نام
                token,  // توکن JWT
            });

        } catch (error) {
            next(error);
        }
    }

    async login(req, res, next) {
        const { email, password } = req.body;

        try {
            // لاگین کاربر و دریافت توکن
            const { token } = await this.#service.loginUser(email, password);

            // پاسخ موفقیت‌آمیز به کاربر
            return res.status(200).json({
                message: Message.LOGIN_SUCCESS,
                token,
            });
        } catch (error) {
            // ارسال خطا به هندلر میانی
            next(error);
        }
    }
}

module.exports = new AuthController();
