import express from "express";
import dotenv from "dotenv";
import expenseRoutes from "./routes/expenseRoutes.js";

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 5000;

app.use(express.json());

// Mount expense routes
app.use("/expenses", expenseRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
