import "dotenv/config";

import "./src/models/index.js";

import app from "./src/app.js";
import sequelize from "./src/config/database.js";

const port = process.env.PORT || 5000;

try {
  await sequelize.authenticate();
  app.listen(port, () => {
    console.log(`App running on: http://localhost:${port}`);
  });
} catch (error) {
  console.error(error);
  process.exit(1);
}
