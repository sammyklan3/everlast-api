import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/authorize.middleware.js";
import {
  createShippingCompanyController,
  getAllShippingCompaniesController,
  getShippingCompanyByIdController,
  updateShippingCompanyController,
  deleteShippingCompanyController,
} from "../controllers/company.controller.js";

const router = express.Router();

// Swagger documentation
/**
 * @swagger
 * /api/companies:
 *   post:
 *     summary: Create a new shipping company
 *     description: Creates a new shipping company. Requires authentication via Bearer token.
 *     tags: [Shipping Companies]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: Maersk
 *               contactInfo:
 *                 type: object
 *                 example:
 *                   phone: "+254700000000"
 *                   email: "contact@maersk.com"
 *                   address: "Danish Headquarters"
 *     responses:
 *       201:
 *         description: Shipping company created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: Maersk
 *                 contactInfo:
 *                   type: object
 *                   example:
 *                     phone: "+254700000000"
 *                     email: "contact@maersk.com"
 *                     address: "Danish Headquarters"
 *       400:
 *         description: Validation error or company already exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Shipping company with this name already exists"
 *       401:
 *         description: Unauthorized - missing or invalid token
 *       500:
 *         description: Internal server error
 */

// Shipping Company Routes
router.post(
  "/",
  authMiddleware,
  authorizeRoles("admin"),
  createShippingCompanyController
);
router.get(
  "/",
  authMiddleware,
  authorizeRoles("admin", "staff"),
  getAllShippingCompaniesController
);
router.get(
  "/:id",
  authMiddleware,
  authorizeRoles("admin", "staff"),
  getShippingCompanyByIdController
);
router.put(
  "/:id",
  authMiddleware,
  authorizeRoles("admin"),
  updateShippingCompanyController
);
router.delete(
  "/:id",
  authMiddleware,
  authorizeRoles("admin"),
  deleteShippingCompanyController
);

export default router;
