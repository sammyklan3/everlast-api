import sequelize from "../config/database.js";
import User from "./user.js";
import Document from "./document.js";
import Shipment from "./shipment.js";
import Invoice from "./invoice.js";
import ShippingCompany from "./shippingCompany.js";
import Port from "./port.js";
import Payment from "./payment.js";

import "./associations.js";

async function syncDatabase() {
  try {
    await sequelize.sync({ alter: true });
    console.log("All models were synchronized successfully.");
  } catch (error) {
    console.error("Unable to sync tables:", error);
  }
}

export default syncDatabase;
