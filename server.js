import dotenv from "dotenv";
import app from "./app.js";
import syncDatabase from "./models/index.js";

dotenv.config();

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  syncDatabase();
  console.log(`Server running on port ${PORT}`);
});
