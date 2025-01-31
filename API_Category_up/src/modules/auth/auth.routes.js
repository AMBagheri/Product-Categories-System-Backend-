const express = require("express");
const authController = require("./auth.controller"); // اطمینان حاصل کنید که مسیر صحیح است


const router = express.Router();

// تعریف مسیرها و توابع مربوطه


router.post("/register", authController.register);
router.post("/login", authController.login);

module.exports = {
    authRoutes: router,
};
