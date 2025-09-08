module.exports = {
  apps: [
    {
      name: "micromax-backend",
      script: "backend/server.js",
      interpreter: "node",
      env: {
        NODE_ENV: "development",
        PORT: 5000,
      },
    },
    {
      name: "micromax-frontend",
      script: "node_modules/react-scripts/scripts/start.js",
      cwd: "./frontend",
      interpreter: "node",
      env: {
        BROWSER: "none",
        HOST: "0.0.0.0",
        PORT: 3000,
        DANGEROUSLY_DISABLE_HOST_CHECK: "true",
        NODE_OPTIONS: "--max_old_space_size=4096",
      },
    },
  ],
};
