require("dotenv").config();
const createHttpError = require("http-errors");
const autoBind = require("auto-bind");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const AuthModel = require("./auth.model");
const {Message} = require("../../common/messages/product.message");
const {registerSchema,loginSchema} = require("../../common/middleware/joi/validation.auth");


class AuthService {
    #model;

    constructor() {
        autoBind(this);
        this.#model = AuthModel;
    }

    async registerUser(email, password) {
        try {
            // ولیدیشن داده‌ها با Joi
            const validatedData = await registerSchema.validateAsync({email, password});

            const {email: validatedEmail, password: validatedPassword} = validatedData;

            // بررسی وجود کاربر بر اساس ایمیل
            const user = await this.#model.findOne({email: validatedEmail});
            if (user) {
                throw new createHttpError(409, Message.DUPLICATE_EMAIL); // پیام مناسب برای ایمیل تکراری
            }

            // هش کردن پسورد
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(validatedPassword, saltRounds);

            // ساخت کاربر جدید با پسورد هش‌شده
            const newUser = await this.#model.create({
                email: validatedEmail.toLowerCase(), // تبدیل ایمیل به حروف کوچک
                password: hashedPassword,
            });

            // تولید توکن JWT
            const tokenPayload = {id: newUser._id, email: newUser.email,role: user.role};
            const token = jwt.sign(tokenPayload, process.env.SECRET_KEY, {expiresIn: "1d"}); // توکن با اعتبار 1 روز

            return {token};

        } catch (error) {
            if (error.isJoi) {
                // خطای ولیدیشن Joi
                throw new createHttpError(400, error.details[0].message);
            }
            if (error instanceof createHttpError.HttpError) {
                throw error; // خطای مشخص (مانند ایمیل یا پسورد نامعتبر)
            }
            throw new createHttpError(500, Message.SERVER_ERROR); // خطای عمومی
        }
    }

    async loginUser(email, password) {
        try {
            // ولیدیشن داده‌ها با Joi
            const validatedData = await loginSchema.validateAsync({ email, password });

            // جستجوی کاربر بر اساس ایمیل
            const user = await this.#model.findOne({ email: validatedData.email.toLowerCase() });
            if (!user) {
                throw new createHttpError(401, Message.USER_NOT_FOUND);
            }

            // اعتبارسنجی رمز عبور
            const isPasswordValid = await bcrypt.compare(validatedData.password, user.password);
            if (!isPasswordValid) {
                throw new createHttpError(401, Message.INVALID_PASSWORD);
            }

            // تولید توکن JWT
            const tokenPayload = { id: user._id, email: user.email,role: user.role, };
            const token = jwt.sign(tokenPayload, process.env.SECRET_KEY, { expiresIn: "1d" });

            return { token };
        } catch (error) {
            if (error.isJoi) {
                throw new createHttpError(400, Message.INVALID_INPUT); // خطای داده‌های ورودی نامعتبر
            }
            if (error instanceof createHttpError.HttpError) {
                throw error; // خطای مشخص (مانند ایمیل یا رمز عبور اشتباه)
            }
            throw new createHttpError(500, Message.SERVER_ERROR); // خطای عمومی
        }
    }
}

module.exports = new AuthService();
