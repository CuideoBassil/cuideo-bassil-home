module.exports = {
  apps: [
    {
      name: "cuideo-bassil-home",
      script: "node_modules/next/dist/bin/next",
      args: "start",
      instances: 1, // Single instance for 1GB RAM
      exec_mode: "cluster",
      autorestart: true,
      watch: false,
      max_memory_restart: "700M", // Restart if memory exceeds 700MB
      env: {
        NODE_ENV: "production",
        PORT: 3000,
      },
      // Memory optimization
      node_args: "--max-old-space-size=768",
      // Logging
      error_file: "./logs/err.log",
      out_file: "./logs/out.log",
      log_date_format: "YYYY-MM-DD HH:mm Z",
      // Restart strategy
      min_uptime: "10s",
      max_restarts: 10,
      restart_delay: 4000,
    },
  ],
};
