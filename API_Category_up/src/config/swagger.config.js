const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const basicAuth = require("express-basic-auth");
const dotenv = require("dotenv");

dotenv.config();

function swaggerConfig(app) {
  const swaggerJSDocOptions = {
    swaggerDefinition: {
      openapi: "3.0.0",
      info: {
        title: "API Category",
        version: "2.0.0",
      },
      components: {
        securitySchemes: {
          bearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
          },
        },
      },
      security: [
        {
          bearerAuth: [],
        },
      ],
    },
    apis: [process.cwd() + "/src/modules/**/*.swagger.js"],
  };

  const swaggerSpec = swaggerJSDoc(swaggerJSDocOptions);

  // Basic Authentication Middleware for Swagger UI
  app.use(
    "/api-docs",
    basicAuth({
      users: {
        [process.env.USER_NAME_SWAGGER]: process.env.PASSWORD_SWAGGER,
      },
      challenge: true, // Request username and password from the user
      realm: "Swagger UI Authentication",
    }),
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, {
      swaggerOptions: {
        docExpansion: "none", // Default setting for document expansion
      },
    })
  );
}

module.exports = swaggerConfig;
