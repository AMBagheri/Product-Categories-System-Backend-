const Server = require("./src/app");

class Application {
  constructor() {
    this.startServer();
  }

  startServer() {
    const server = new Server();
    server.start();
  }
}

new Application();
