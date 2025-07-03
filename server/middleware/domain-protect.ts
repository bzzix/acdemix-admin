import { defineEventHandler } from 'h3';

export default defineEventHandler((event) => {
  const allowedHosts = (process.env.ALLOWED_HOSTS || 'admin.acdemix.com,www.admin.acdemix.com,127.0.0.1,localhost')
    .split(',')
    .map(h => h.trim());
  const host = event.node.req.headers.host?.split(':')[0];
  if (!host || !allowedHosts.includes(host)) {
    event.node.res.statusCode = 403;
    event.node.res.end('Forbidden');
  }
});
