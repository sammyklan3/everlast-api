"use strict";

import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const ShippingCompany = sequelize.define("ShippingCompany", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  contactInfo: {
    type: DataTypes.JSONB,
    allowNull: true,
  },
});

export default ShippingCompany;
