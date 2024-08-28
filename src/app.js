import express from "express";
import cors from "cors";

const app = express();

// Middlewares
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

export default app;
