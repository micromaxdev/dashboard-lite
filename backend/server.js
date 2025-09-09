const express = require("express");
const colors = require("colors");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config({ path: path.resolve(__dirname, "../.env") });
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const cors = require("cors");
const cron = require("node-cron");
const updateCsvs = require("./scheduling/updateCsvs");
const initialiseLogger = require("./config/logger");
const initialiseFileWatcher = require("./config/fileWatcher");

const dynamicModelRouter = require("./routes/dynamicModelRoutes.js");
const kpiRouter = require("./routes/kpiRoutes.js");
const thresholdRouter = require("./routes/thresholdRoutes.js");
const displayRouter = require("./routes/displayRoutes.js");
const fileRouter = require("./routes/fileUploadRoutes.js");
const screenRouter = require("./routes/screenRoutes.js");

const port = process.env.PORT || 5000;
const csvDir = process.env.CSV_DIR;
let debounceTimer;
let databaseConnected = false;

const startServer = async () => {
  try {
    await connectDB();
    databaseConnected = true;

    const app = express();
    // Middleware
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());
    app.use(cors({
      origin: process.env.ALLOWED_ORIGINS?.split(',') || '*',
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      credentials: true,
      exposedHeaders: ['Content-Disposition', 'Content-Length', 'Content-Type']
    }));

    // 4. Setup routes
    app.use("/api/users", require("./routes/userRoutes"));
    app.use("/api/all", require("./routes/allRoutes"));

    // API Routes
    app.use('/api', dynamicModelRouter);
    app.use('/kpi-api', kpiRouter);
    app.use('/threshold-api', thresholdRouter);
    app.use('/display-api', displayRouter);
    app.use('/file-api', fileRouter);
    app.use('/screen-api', screenRouter);

    // 5. Serve static files
    app.use("/uploads", express.static(path.join(__dirname, "../../uploads")));

    // 6. Setup file watcher and logger
    initialiseFileWatcher(csvDir, databaseConnected, updateCsvs);
    initialiseLogger();

    // 7. Serve frontend
    if (process.env.NODE_ENV === "production") {
      app.use(express.static(path.join(__dirname, "../frontend/build")));
      app.get("*", (req, res) =>
        res.sendFile(
          path.resolve(__dirname, "../", "frontend", "build", "index.html")
        )
      );
    } else {
      app.get("/", (req, res) => res.send("Please set to production"));
    }

    app.listen(port, () => console.log(`Server running on port ${port}`));
    app.use(errorHandler);
  } catch (err) {
    console.error("Server startup error:", err);
    process.exit(1);
  }
};

startServer();
