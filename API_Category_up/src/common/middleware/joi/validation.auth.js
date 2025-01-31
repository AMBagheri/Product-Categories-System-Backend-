const Joi = require("joi");

const registerSchema = Joi.object({
    email: Joi.string()
        .email({ tlds: { allow: false } }) // بررسی ساختار ایمیل
        .required()
        .messages({
            "string.email": "عزیزم، ایمیل رو درست وارد کن، این‌جوری ایمیل نمی‌فرستن!",
            "string.empty": "خب ایمیل چی شد؟ نامه‌بر هم نیستیم که حدس بزنیم!",
        }),
    password: Joi.string()
        .min(6) // حداقل طول پسورد 6 کاراکتر
        .required()
        .messages({
            "string.min": "پسوردت خیلی کوتاهه، مطمئنی رمز گاوصندوق نمی‌خوای؟",
            "string.empty": "پسورد کجاست؟ لااقل یه چیزی بنویس که هکرها نخندن!",
        }),
}).unknown(false); // جلوگیری از ورود فیلدهای غیرمجاز

const loginSchema = Joi.object({
    email: Joi.string()
        .email({ tlds: { allow: false } })
        .required()
        .messages({
            "string.email": "ایمیل شما معتبر نیست.",
            "string.empty": "لطفاً ایمیل خود را وارد کنید.",
        }),
    password: Joi.string()
        .min(6)
        .required()
        .messages({
            "string.min": "رمز عبور باید حداقل 6 کاراکتر باشد.",
            "string.empty": "لطفاً رمز عبور خود را وارد کنید.",
        }),
}).unknown(false);


module.exports = {
    registerSchema,
    loginSchema
};
