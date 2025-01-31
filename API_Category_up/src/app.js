// Import dependencies
const express = require("express");
const dotenv = require("dotenv");
const path = require("path");

/// Middleware setup functions
// Performance-related middleware
const setupCompression = require("./common/middleware/performance/compression.middleware");

// Security-related middleware
const setupSecurityHeaders = require("./common/middleware/security/security.middleware");
const setupRateLimiter = require("./common/middleware/security/rateLimiter.middleware");

// Request-related middleware
const setupCORS = require("./common/middleware/request/cors.middleware");
const setupBodyParsers = require("./common/middleware/request/bodyParsers.middleware");
const restrictHTTPMethods = require("./common/middleware/request/httpMethods.middleware");

// Route handlers and configuration
const { mainRouter } = require("./app.routes");
const swaggerConfig = require("./config/swagger.config");
const NotFoundHandler = require("./common/exception/not-found.handler");
const AllExceptionHandler = require("./common/exception/all-exception.handler");

// Load environment variables from .env file
dotenv.config();

class Server {
  constructor() {
    this.app = express();
    this.port =  3005;


    this.initializeMiddlewares();
    this.connectToDatabase();
    this.initializeRoutes();
    this.initializeSwagger();
    this.initializeErrorHandling();
  }

  // Connect to the database
  connectToDatabase() {
    require("./config/mongoose.config");
  }

  // Initialize all middleware functions
  initializeMiddlewares() {
    // Performance-related middleware
    setupCompression(this.app); // Compress responses
    // setupCaching(this.app); // Cache responses

    // Security-related middleware
    setupSecurityHeaders(this.app); // Set security headers
    setupRateLimiter(this.app); // Limit request rates

    // Request-related middleware
    setupCORS(this.app); // Setup Cross-Origin Resource Sharing
    setupBodyParsers(this.app); // Parse incoming request bodies
    restrictHTTPMethods(this.app); // Restrict allowed HTTP methods

    this.app.disable("x-powered-by"); // Disable X-Powered-By header
  }

  // Initialize all routes
  initializeRoutes() {
    this.app.use(mainRouter); // Mount main router
    this.app.use(
      "/uploads",
      express.static(path.join(__dirname, "../uploads"))
    ); // Serve static files from 'uploads' directory
  }

  // Initialize Swagger for API documentation
  initializeSwagger() {
    swaggerConfig(this.app);
  }

  // Initialize error handling middleware
  initializeErrorHandling() {
    NotFoundHandler(this.app); // Handle 404 errors
    AllExceptionHandler(this.app); // Handle all other exceptions
  }

  // Start the server
  start() {
    this.app.listen(this.port, () => {
      console.log(`Server is running on Port ${this.port}`);
    });
  }
}

module.exports = Server;
