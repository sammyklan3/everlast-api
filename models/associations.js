import User from "./user.js";
import Document from "./document.js";
import Shipment from "./shipment.js";
import Invoice from "./invoice.js";
import ShippingCompany from "./shippingCompany.js";
import Port from "./port.js";
import Payment from "./payment.js";

// Document → User
Document.belongsTo(User, { foreignKey: "uploadedBy", as: "uploader" });
User.hasMany(Document, { foreignKey: "uploadedBy", as: "documents" });

// Shipment → Client & Agent
Shipment.belongsTo(User, { foreignKey: "clientId", as: "client" });
User.hasMany(Shipment, { foreignKey: "clientId", as: "clientShipments" });

Shipment.belongsTo(User, { foreignKey: "assignedTo", as: "agent" });
User.hasMany(Shipment, { foreignKey: "assignedTo", as: "assignedShipments" });

// Shipment → Ports
Shipment.belongsTo(Port, { foreignKey: "portOfEntryId", as: "entryPort" });
Port.hasMany(Shipment, {
  foreignKey: "portOfEntryId",
  as: "enteringShipments",
});

// Shipment → ShippingCompany
Shipment.belongsTo(ShippingCompany, {
  foreignKey: "shippingCompanyId",
  as: "shippingCompany",
});
ShippingCompany.hasMany(Shipment, {
  foreignKey: "shippingCompanyId",
  as: "shipments",
});

// Invoice → Shipment & Client
Invoice.belongsTo(Shipment, { foreignKey: "shipmentId", as: "shipment" });
Shipment.hasOne(Invoice, { foreignKey: "shipmentId", as: "invoice" });

Invoice.belongsTo(User, { foreignKey: "issuedTo", as: "client" });
User.hasMany(Invoice, { foreignKey: "issuedTo", as: "invoices" });

// Payment → Invoice & Payer
Payment.belongsTo(User, { foreignKey: "paidBy", as: "payer" });
User.hasMany(Payment, { foreignKey: "paidBy", as: "payments" });

Payment.belongsTo(Invoice, { foreignKey: "invoiceId", as: "invoice" });
Invoice.hasMany(Payment, { foreignKey: "invoiceId", as: "payments" });
