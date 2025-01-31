const dotenv = require("dotenv");
const autoBind = require("auto-bind");
const authService = require("./products.service");
const {Message} = require("../../common/messages/product.message");
const createHttpError = require("http-errors");
const {
    loginSchema,
} = require("../../common/middleware/joi/validation.auth");

dotenv.config();

class ProductsController {
    #service;

    constructor() {
        autoBind(this);
        this.#service = authService;
    }

    async getAllProducts(req, res, next) {
        try {
            // دریافت پارامترهای صفحه‌بندی از درخواست (با مقادیر پیش‌فرض)
            const { page = 1, limit = 10 } = req.query;

            // تبدیل مقادیر به عدد و اطمینان از مثبت بودن
            const pageNumber = Math.max(Number(page), 1);
            const limitNumber = Math.max(Number(limit), 1);
            const skip = (pageNumber - 1) * limitNumber;

            // فراخوانی سرویس و دریافت داده‌ها
            const result = await this.#service.getAllProducts({ page: pageNumber, limit: limitNumber });

            // ارسال پاسخ موفق
            res.status(result.data.length ? 200 : 404).json({
                message: result.data.length ? Message.DISPLAY_SUCCESS : Message.EMPTY_PRODUCT,
                data: result.data,
                pagination: result.pagination,
            });
        } catch (error) {
            next(error);
        }
    }

    async addProduct(req, res, next) {
        try {
            const {name, price, description, category} = req.body;

            // بررسی اینکه تمامی مقادیر ضروری ارسال شده‌اند
            if (!name || !price || !description || !category) {
                throw new createHttpError(400, Message.REQUIRED_FIELDS);
            }

            // ساخت محصول جدید
            const product = await this.#service.addProduct(req.body);

            // پاسخ موفقیت
            return res.status(201).json({
                message: Message.CREATE_SUCCESS,
            });
        } catch (error) {

            next(error);
        }
    }

    async uploadImages(req, res, next) {
        try {
            const {productId} = req.params;

            // بررسی وجود محصول
            const product = await this.#service.findProductById(productId);
            if (!product) {
                throw new createHttpError(404, Message.INVALID_ID);
            }

            // بررسی وجود فایل‌ها
            if (!req.files || req.files.length === 0) {
                throw new createHttpError(400, Message.BAD_REQUEST);
            }

            // ذخیره تصاویر و به‌روزرسانی محصول
            await this.#service.saveImages(req.files, productId);
            res.status(200).json({

                message: Message.CREATE_SUCCESS,

            });
        } catch (error) {
            next(error);
        }
    }

    async deleteProduct(req, res, next) {
        try {
            const {id} = req.params;

            // حذف محصول از سرویس
            await this.#service.deleteProductById(id);

            res.status(200).json({
                message: Message.DELETE_SUCCESS,
            });
        } catch (error) {
            next(error);
        }
    }

    async updateProduct(req, res, next) {
        try {
            const {id} = req.params;
            const productData = req.body;

            // ویرایش محصول از طریق سرویس
            await this.#service.updateProductById(id, productData);

            res.status(200).json({
                message: Message.UPDATE_SUCCESS,
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new ProductsController();
