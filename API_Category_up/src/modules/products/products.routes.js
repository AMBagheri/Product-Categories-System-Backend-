const express = require("express");
const productsController = require("./products.controller"); // اطمینان حاصل کنید که مسیر صحیح است
const {upload} = require("../../common/utils/multer");
const roleGuard = require("../../common/gard/auth.gard");
const router = express.Router();

// تعریف مسیرها و توابع مربوطه

router.get("/", productsController.getAllProducts);
router.post("/", roleGuard("admin"), productsController.addProduct);
router.post("/:productId/upload", roleGuard("admin"), upload.array("images", 10), productsController.uploadImages);
router.patch("/:id", roleGuard("admin"), productsController.updateProduct);
router.delete("/:id", roleGuard("admin"), productsController.deleteProduct);

module.exports = {
    productsRoutes: router,
};
