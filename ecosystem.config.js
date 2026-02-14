module.exports = {
  apps: [
    {
      name: "cuideo-bassil-home",
      script: "node_modules/next/dist/bin/next",
      args: "start",
      instances: 1,
      exec_mode: "fork",
      autorestart: true,
      watch: false,
      max_memory_restart: "450M",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
      },
      node_args: "--max-old-space-size=512",
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
