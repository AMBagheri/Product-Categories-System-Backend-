/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product management API
 */

/**
 * @swagger
 * /product:
 *   get:
 *     summary: Retrieve all products with pagination
 *     tags:
 *       - Products
 *     parameters:
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: integer
 *           default: 1
 *         description: The page number to retrieve (default is 1)
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: integer
 *           default: 10
 *         description: The number of items per page (default is 10)
 *     responses:
 *       200:
 *         description: A list of products with pagination
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "محصولات با موفقیت یافت شد! آمادهٔ مشاهدهٔ بهترین‌ها باش!"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "64ad3f88a3c93c47a1c8f8b1"
 *                       name:
 *                         type: string
 *                         example: "Sample Product"
 *                       price:
 *                         type: number
 *                         example: 99.99
 *                       description:
 *                         type: string
 *                         example: "This is a sample product description."
 *                       category:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                             example: "64ad3f88a3c93c47a1c8f8b2"
 *                           name:
 *                             type: string
 *                             example: "Sample Category"
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: integer
 *                       example: 100
 *                     page:
 *                       type: integer
 *                       example: 1
 *                     limit:
 *                       type: integer
 *                       example: 10
 *                     totalPages:
 *                       type: integer
 *                       example: 10
 *                     hasNextPage:
 *                       type: boolean
 *                       example: true
 *                     hasPrevPage:
 *                       type: boolean
 *                       example: false
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "خطای داخلی سرور! لطفاً بعداً دوباره امتحان کنید."
 */

/**
 * @swagger
 * /product:
 *   post:
 *     summary: Add a new product
 *     tags:
 *       - Products
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "New Product"
 *               price:
 *                 type: number
 *                 example: 199.99
 *               description:
 *                 type: string
 *                 example: "This is a new product description."
 *               category:
 *                 type: string
 *                 example: "64ad3f88a3c93c47a1c8f8b1"
 *     responses:
 *       201:
 *         description: Product successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "محصول جدید با موفقیت ساخته شد! دستت درد نکنه."
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "64ad3f88a3c93c47a1c8f8b1"
 *                     name:
 *                       type: string
 *                       example: "New Product"
 *                     price:
 *                       type: number
 *                       example: 199.99
 *                     description:
 *                       type: string
 *                       example: "This is a new product description."
 *                     category:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                           example: "64ad3f88a3c93c47a1c8f8b1"
 *                         name:
 *                           type: string
 *                           example: "Sample Category"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "خطای داخلی سرور! لطفاً بعداً دوباره امتحان کنید."
 */

/**
 * @swagger
 * /product/{productId}/upload:
 *   post:
 *     summary: آپلود تصاویر برای یک محصول خاص
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: آیدی محصول برای افزودن تصاویر
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       200:
 *         description: تصاویر با موفقیت آپلود شدند.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "تصاویر با موفقیت آپلود شدند."
 *                 data:
 *                   type: object
 *                   properties:
 *                     imagePaths:
 *                       type: array
 *                       items:
 *                         type: string
 *                         example: "uploads/img/1678459823_sample.jpg"
 *       400:
 *         description: هیچ فایلی ارسال نشده یا آیدی محصول نامعتبر است.
 *       404:
 *         description: محصول یافت نشد.
 *       500:
 *         description: خطای داخلی سرور.
 */

/**
 * @swagger
 * /product/{id}:
 *   delete:
 *     summary: حذف یک محصول با استفاده از ID
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: شناسه محصول برای حذف
 *     responses:
 *       200:
 *         description: محصول با موفقیت حذف شد
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "محصول با موفقیت حذف شد."
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "64ad3f88a3c93c47a1c8f8b1"
 *                     name:
 *                       type: string
 *                       example: "Sample Product"
 *                     price:
 *                       type: number
 *                       example: 99.99
 *                     description:
 *                       type: string
 *                       example: "This is a sample product description."
 *       404:
 *         description: محصول یافت نشد
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "محصول یافت نشد."
 *       500:
 *         description: خطای داخلی سرور
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "خطای داخلی سرور."
 */

/**
 * @swagger
 * /product/{id}:
 *   patch:
 *     summary: ویرایش اطلاعات یک محصول
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: شناسه محصول برای ویرایش
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "محصول جدید"
 *               price:
 *                 type: number
 *                 example: 120.5
 *               description:
 *                 type: string
 *                 example: "توضیحات به‌روزرسانی‌شده برای محصول"
 *               category:
 *                 type: string
 *                 example: "64ad3f88a3c93c47a1c8f8b1"
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   example: "uploads/img/sample.jpg"
 *     responses:
 *       200:
 *         description: محصول با موفقیت به‌روزرسانی شد
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "محصول با موفقیت به‌روزرسانی شد."
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "64ad3f88a3c93c47a1c8f8b1"
 *                     name:
 *                       type: string
 *                       example: "محصول جدید"
 *                     price:
 *                       type: number
 *                       example: 120.5
 *                     description:
 *                       type: string
 *                       example: "توضیحات به‌روزرسانی‌شده برای محصول"
 *                     category:
 *                       type: string
 *                       example: "64ad3f88a3c93c47a1c8f8b1"
 *                     images:
 *                       type: array
 *                       items:
 *                         type: string
 *                         example: "uploads/img/sample.jpg"
 *       404:
 *         description: محصول یافت نشد
 *       500:
 *         description: خطای داخلی سرور
 */
