import express from "express";
import cors from "cors";

import globalErrorHandler from "./middlewares/GlobalError.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use(globalErrorHandler);

export default app;
