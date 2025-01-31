const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const UserSchema = new Schema(
    {
        firstName: { type: String,  maxlength: 50 }, // نام
        lastName: { type: String, maxlength: 50 },  // نام خانوادگی
        email: { type: String, required: true, unique: true, lowercase: true }, // ایمیل
        password: { type: String, required: true }, // رمز عبور
        role: { type: String, enum: ["admin", "user"], default: "user" }, // نقش
        isActive: { type: Boolean, default: true }, // وضعیت فعال بودن
        profilePicture: { type: String, default: null }, // عکس پروفایل
    },
    {
        timestamps: true, // تاریخ‌های ایجاد و بروزرسانی خودکار
        versionKey: false,
        toJSON: { virtuals: true },
    }
);

module.exports = model("User", UserSchema);
