import getDashboardStats from "../services/stats.service.js";

async function statsController(req, res) {
  try {
    const userId = req.user.id;
    const role = req.user.role;

    const stats = await getDashboardStats(userId, role);
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export default statsController;
