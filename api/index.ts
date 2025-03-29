import express from "express";
import { registerRoutes } from "../server/routes";
import cors from "cors";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Register all API routes
registerRoutes(app);

// Export for Vercel serverless functions
export default app;