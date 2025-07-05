"use client";

import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Port = sequelize.define("Port", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  country: {
    type: DataTypes.STRING,
    defaultValue: "Kenya",
  },
  city: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  type: {
    type: DataTypes.ENUM("sea", "air", "inland"),
    allowNull: false,
  },
});

export default Port;
