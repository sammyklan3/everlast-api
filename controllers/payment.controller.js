import {
  createPayment,
  handleStkCallback,
} from "../services/mpesaPayment.service.js";

const initiatePaymentController = async (req, res) => {
  try {
    const payment = await createPayment(req.body);
    res.status(201).json(payment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const handleStkCallbackController = async (req, res) => {
  try {
    await handleStkCallback(req.body);
    res.sendStatus(200);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export { initiatePaymentController, handleStkCallbackController };
