const express = require("express");

const {productsRoutes} = require("./modules/products/products.routes");
const {authRoutes} = require("./modules/auth/auth.routes");

const router = express.Router();

// Define route groups
const routes = {

    product: productsRoutes,
    auth: authRoutes,

};

// Apply routes to the main router
Object.entries(routes).forEach(([path, route]) => {
    router.use(`/${path}`, route);
});

module.exports = {mainRouter: router};
