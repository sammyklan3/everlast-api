import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

let connectionString = "";

if (process.env.NODE_ENV !== "production") {
  connectionString = `postgres://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
} else {
  connectionString = process.env.DATABASE_URL;
}

// Passing connection as URI
const sequelize = new Sequelize(connectionString);

// Testing the connection
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    process.exit(1);
  }
}

testConnection();

export default sequelize;
