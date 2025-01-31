const rateLimit = require("express-rate-limit");

const setupRateLimiter = (app, routesToProtect = []) => {
  const limiter = rateLimit({
    windowMs: process.env.RATE_LIMIT_WINDOW_MS || 15 * 60 * 1000, // مدت زمان محدودیت
    max: process.env.RATE_LIMIT_MAX || 100, // حداکثر تعداد درخواست‌ها
    message:
        process.env.RATE_LIMIT_MESSAGE ||
        "تعداد درخواست‌های بیش از حد از این IP، لطفا بعدا تلاش کنید",
    handler: (req, res) => {
      // نمایش هشدار در کنسول
      console.warn("تعداد درخواست‌های بیش از حد", {
        ip: req.ip,
        method: req.method,
        url: req.originalUrl,
      });
      res.status(429).json({
        success: false,
        message:
            "تعداد درخواست‌های شما بیش از حد مجاز است، لطفا بعدا دوباره تلاش کنید.",
      });
    },
    standardHeaders: true, // نمایش اطلاعات محدودیت در هدرهای استاندارد
    legacyHeaders: false, // عدم نمایش هدرهای قدیمی
  });

  // اعمال محدودیت برای مسیرهای مشخص‌شده
  routesToProtect.forEach((route) => {

    app.use(route, limiter);
  });

  // غیرفعال کردن محدودیت برای '/uploads'
  app.use("/uploads", (req, res, next) => {
    next(); // ادامه درخواست بدون محدودیت
  });
};

module.exports = setupRateLimiter;
