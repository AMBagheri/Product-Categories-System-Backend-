const autoBind = require("auto-bind");
const ProductModel = require("./product.model");
const createHttpError = require("http-errors");
const {Message} = require("../../common/messages/product.message");
const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");

dotenv.config();

class ProductsService {
    #model;

    constructor() {
        autoBind(this);
        this.#model = ProductModel;
    }

    async getAllProducts({ page = 1, limit = 10 } = {}) {
        try {
            const skip = (page - 1) * limit;

            // بهینه‌سازی: فقط فیلدهای مورد نیاز رو انتخاب کن
            const projection = { name: 1, price: 1, category: 1 }; // به عنوان مثال

            const [products, totalProducts] = await Promise.all([
                this.#model.find().select(projection).skip(skip).limit(limit).lean(),
                this.#model.estimatedDocumentCount(), // برای کارایی بهتر
            ]);

            const totalPages = Math.ceil(totalProducts / limit);

            return {
                data: products,
                pagination: {
                    total: totalProducts,
                    page,
                    limit,
                    totalPages,
                    hasNextPage: page < totalPages,
                    hasPrevPage: page > 1,
                },
            };
        } catch (error) {
            throw new createHttpError(500, Message.SERVER_ERROR);
        }
    }

    async addProduct(productData) {
        try {
            // ایجاد محصول جدید
            const product = new this.#model(productData);

            // ذخیره در پایگاه داده
            await product.save();

            // بازگرداندن محصول ذخیره‌شده
            return product;
        } catch (error) {
            throw new createHttpError(500, Message.SERVER_ERROR);
        }
    }

    async findProductById(productId) {
        try {
            return await this.#model.findById(productId);
        } catch (error) {
            throw new createHttpError(500, Message.SERVER_ERROR);
        }
    }

    async saveImages(files, productId) {
        try {
            const uploadDir = path.resolve(__dirname, "../../../uploads/img");

            // بررسی وجود پوشه و ایجاد آن در صورت نیاز
            if (!fs.existsSync(uploadDir)) {
                fs.mkdirSync(uploadDir, {recursive: true});
            }

            const imagePaths = files.map((file) => {
                return path.join("uploads/img", file.filename);
            });

            // به‌روزرسانی محصول با مسیر تصاویر
            const product = await this.findProductById(productId);
            product.images = [...(product.images || []), ...imagePaths];
            await product.save();

            return imagePaths;
        } catch (error) {
            throw new Error(Message.CREATE_FAILED);
        }
    }

    async deleteProductById(id) {
        try {
            const product = await this.#model.findByIdAndDelete(id);

            if (!product) {
                throw new createHttpError(404, Message.NOT_FOUND);
            }

            return product;
        } catch (error) {
            throw new createHttpError(500, Message.SERVER_ERROR);
        }
    }

    async updateProductById(id, productData) {
        try {
            const updatedProduct = await this.#model.findByIdAndUpdate(id, productData, {
                new: true, // بازگرداندن محصول به‌روزرسانی‌شده
                runValidators: true, // اجرای اعتبارسنجی مدل
            });

            if (!updatedProduct) {
                throw new createHttpError(404, Message.NOT_FOUND);
            }

            return updatedProduct;
        } catch (error) {
            throw new createHttpError(500, Message.SERVER_ERROR);
        }
    }
}

module.exports = new ProductsService();
