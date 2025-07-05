"use strict";

import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Payment = sequelize.define("Payment", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  invoiceId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  paidBy: {
    type: DataTypes.UUID, // user ID (client)
    allowNull: false,
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  method: {
    type: DataTypes.ENUM("mpesa", "bank_transfer", "cash", "card"),
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("pending", "completed", "failed", "reversed"),
    defaultValue: "completed",
  },
  paidAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  reference: {
    type: DataTypes.STRING,
    allowNull: true, // e.g., MPesa code or bank transaction ID
  },
  note: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
});

export default Payment;
