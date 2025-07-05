"use strict";

import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Shipment = sequelize.define("Shipment", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  trackingNumber: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  shippingCompanyId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  origin: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  destination: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  portOfEntryId: {
    type: DataTypes.UUID,
    allowNull: true,
  },
  weight: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  weightUnit: {
    type: DataTypes.ENUM("kg", "lb"),
    defaultValue: "kg",
  },
  status: {
    type: DataTypes.ENUM(
      "pending",
      "in_transit",
      "at_port",
      "clearing",
      "cleared",
      "delivered",
      "cancelled"
    ),
    defaultValue: "pending",
  },
  clientId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  transitType: {
    type: DataTypes.ENUM("domestic", "transit", "export"),
    defaultValue: "domestic",
  },
  borderExitPoint: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  assignedTo: {
    type: DataTypes.UUID, // staff user responsible
    allowNull: true,
  },
  expectedDeliveryDate: {
    type: DataTypes.DATE,
  },
  actualDeliveryDate: {
    type: DataTypes.DATE,
  },
  notes: {
    type: DataTypes.TEXT,
  },
});

export default Shipment;
