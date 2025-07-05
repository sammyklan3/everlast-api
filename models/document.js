"use strict";

import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Document = sequelize.define("Document", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  fileName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fileType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fileUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  shipmentId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  uploadedBy: {
    type: DataTypes.UUID,
    allowNull: false,
  },
});

export default Document;
