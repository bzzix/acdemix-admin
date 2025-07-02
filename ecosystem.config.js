module.exports = {
  apps: [
    {
      name: 'acdemix-admin',
      port: '3000',
      exec_mode: 'cluster',
      instances: 'max', // أو رقم محدد حسب موارد الخادم
      script: './.output/server/index.mjs',
      cwd: '/home/bzzix/public_html/acdemix/portal-admin',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
        NITRO_HOST: '0.0.0.0',
        NITRO_PORT: 3000
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 3000
      },
      log_date_format: 'YYYY-MM-DD HH:mm Z',
      error_file: './logs/err.log',
      out_file: './logs/out.log',
      log_file: './logs/combined.log',
      time: true,
      autorestart: true,
      max_restarts: 10,
      min_uptime: '10s',
      max_memory_restart: '1G',
      node_args: '--max-old-space-size=1024',
      watch: false, // تعطيل في الإنتاج
      ignore_watch: ['node_modules', 'logs'],
      merge_logs: true
    }
  ]
};