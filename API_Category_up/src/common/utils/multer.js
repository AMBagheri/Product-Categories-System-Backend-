const path = require("path");
const multer = require("multer");
const fs = require("fs");

// تابعی برای اطمینان از وجود پوشه
const ensureDirectoryExistence = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

// تنظیمات ذخیره‌سازی عمومی
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.resolve(__dirname, "../../../uploads/img");
    ensureDirectoryExistence(uploadPath);
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

// تنظیمات Multer عمومی
const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 2 }, // محدودیت حجم فایل به 2 مگابایت
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );

    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error("فایل مجاز نیست"));
  },
});

// تنظیمات ذخیره‌سازی برای بخش جدید (media) با پشتیبانی از ویدیوها
const newSectionStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const newSectionPath = path.resolve(__dirname, "../../../uploads/media");
    ensureDirectoryExistence(newSectionPath);
    cb(null, newSectionPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

// تنظیمات Multer برای بخش جدید با پشتیبانی از ویدیوها
const newSectionUpload = multer({
  storage: newSectionStorage,
  limits: { fileSize: 1024 * 1024 * 70 }, // افزایش محدودیت حجم فایل به 70 مگابایت
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|pdf|docx|mp4|avi|mov/; // اضافه کردن فرمت‌های ویدیو
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );

    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error("فایل مجاز نیست"));
  },
});

module.exports = { upload, newSectionUpload };
