import { createProxyMiddleware } from 'http-proxy-middleware';

module.exports = function (app: any) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://api.github.com',
      changeOrigin: true as const,
      pathRewrite: {
        '^/api': '',
      } as Record<string, string>,
    })
  );
};
