"use strict";

import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Invoice = sequelize.define("Invoice", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },

  shipmentId: {
    type: DataTypes.UUID,
    allowNull: false,
  },

  issuedTo: {
    type: DataTypes.UUID,
    allowNull: false,
  },

  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },

  currency: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "USD",
  },
  status: {
    type: DataTypes.ENUM("unpaid", "paid", "overdue", "cancelled"),
    defaultValue: "unpaid",
  },
  dueDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  paidAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
});

export default Invoice;
