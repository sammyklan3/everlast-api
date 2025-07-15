import sequelize from "../config/database.js";
import { Op } from "sequelize";

import User from "../models/user.js";
import Payment from "../models/payment.js";
import Shipment from "../models/shipment.js";
import Invoice from "../models/invoice.js";
import Document from "../models/document.js";

// Admin dashboard stats
async function getAdminStats() {
  const [users, payments, shipments, invoices, documents] = await Promise.all([
    User.findAll(),
    Payment.findAll(),
    Shipment.findAll(),
    Invoice.findAll(),
    Document.findAll(),
  ]);

  const clients = users.filter((user) => user.role === "client");
  const staff = users.filter((user) => user.role === "staff");

  const totalRevenue = payments.reduce(
    (sum, p) => sum + parseFloat(p.amount || 0),
    0
  );

  // Recent 5 users
  const recentUsers = await User.findAll({
    order: [["createdAt", "DESC"]],
    limit: 5,
    attributes: ["id", "name", "email", "role", "createdAt"],
  });

  // Shipments over time (last 14 days)
  const shipmentsOverTime = await Shipment.findAll({
    attributes: [
      [sequelize.fn("DATE", sequelize.col("createdAt")), "date"],
      [sequelize.fn("COUNT", sequelize.col("id")), "count"],
    ],
    where: {
      createdAt: {
        [Op.gte]: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000), // last 14 days
      },
    },
    group: ["date"],
    order: [[sequelize.fn("DATE", sequelize.col("createdAt")), "ASC"]],
    raw: true,
  });

  // Revenue trend (group by month)
  const revenueTrend = await Payment.findAll({
    attributes: [
      [sequelize.fn("to_char", sequelize.col("createdAt"), "YYYY-MM"), "month"],
      [sequelize.fn("SUM", sequelize.col("amount")), "amount"],
    ],
    group: ["month"],
    order: [["month", "ASC"]],
    raw: true,
  });

  // Invoice status counts
  const invoiceStatusSummary = {
    paid: invoices.filter((i) => i.status === "paid").length,
    unpaid: invoices.filter((i) => i.status === "unpaid").length,
    overdue: invoices.filter((i) => i.status === "overdue").length,
  };

  // Recent activity log (mock for now)
  const recentActivities = [
    {
      type: "shipment_cleared",
      description: "Shipment #SH001 cleared by John Doe",
      timestamp: new Date(),
    },
    {
      type: "invoice_paid",
      description: "Invoice INV-203 paid by Alice",
      timestamp: new Date(Date.now() - 60 * 60 * 1000),
    },
    {
      type: "document_uploaded",
      description: "Jane uploaded KRA Certificate",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    },
  ];

  return {
    metrics: {
      totalUsers: users.length,
      totalClients: clients.length,
      totalStaff: staff.length,

      totalShipments: shipments.length,
      inProgressShipments: shipments.filter((s) => s.status === "in_progress")
        .length,
      completedShipments: shipments.filter((s) => s.status === "delivered")
        .length,
      delayedShipments: shipments.filter((s) => s.status === "delayed").length,

      totalPayments: payments.length,
      totalRevenue,

      totalInvoices: invoices.length,
      unpaidInvoices: invoiceStatusSummary.unpaid,
      paidInvoices: invoiceStatusSummary.paid,
      overdueInvoices: invoiceStatusSummary.overdue,

      totalDocuments: documents.length,
    },
    recentUsers,
    shipmentsOverTime,
    revenueTrend,
    invoiceStatusSummary,
    recentActivities,
  };
}

// Staff dashboard stats
async function getStaffStats(staffId) {
  const shipments = await Shipment.findAll({ where: { assignedTo: staffId } });
  const invoices = await Invoice.findAll(); // No direct link unless we store who generated them
  const documents = await Document.findAll({ where: { uploadedBy: staffId } });

  return {
    totalAssignedShipments: shipments.length,
    inProgress: shipments.filter((s) => s.status === "in_progress").length,
    completed: shipments.filter((s) => s.status === "delivered").length,
    delayed: shipments.filter((s) => s.status === "delayed").length,

    documentsUploaded: documents.length,
  };
}

// Client dashboard stats
async function getUserStats(clientId) {
  const shipments = await Shipment.findAll({ where: { clientId } });
  const payments = await Payment.findAll({ where: { paidBy: clientId } });
  const invoices = await Invoice.findAll({ where: { issuedTo: clientId } });
  const documents = await Document.findAll({ where: { uploadedBy: clientId } });

  const totalPaid = payments.reduce(
    (sum, p) => sum + parseFloat(p.amount || 0),
    0
  );

  return {
    myShipments: shipments.length,
    inTransit: shipments.filter((s) => s.status === "in_transit").length,
    cleared: shipments.filter((s) => s.status === "cleared").length,
    delivered: shipments.filter((s) => s.status === "delivered").length,

    totalPayments: payments.length,
    totalPaid,

    totalInvoices: invoices.length,
    unpaidInvoices: invoices.filter((i) => i.status === "unpaid").length,
    paidInvoices: invoices.filter((i) => i.status === "paid").length,
    overdueInvoices: invoices.filter((i) => i.status === "overdue").length,

    myDocuments: documents.length,
  };
}

// Get stats for dashboards according to user role
const getDashboardStats = async (userId, role) => {
  if (role === "admin") {
    return await getAdminStats();
  } else if (role === "staff") {
    return await getStaffStats(userId);
  } else if (role === "client") {
    return await getUserStats(userId);
  } else {
    throw new Error("Invalid user role");
  }
};

export default getDashboardStats;
