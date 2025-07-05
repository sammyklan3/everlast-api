// config/swagger.js
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Everlast API Docs",
    version: "1.0.0",
    description: "API documentation for the Everlast cargo system",
  },
  servers: [
    {
      url: "http://localhost:4000", // Update this in production
      description: "Local server",
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ["./routes/*.js", "./models/*.js"], // Path to the API docs (can add controller paths too)
};

const swaggerSpec = swaggerJSDoc(options);

export { swaggerSpec, swaggerUi };
