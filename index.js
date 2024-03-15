const express = require('express');
const port = 3000;
const app = express();
const { createProxyMiddleware } = require('http-proxy-middleware');
const morgan = require('morgan');
app.use(express.json());
app.use(morgan('combined'));
app.use(
    '/auth-service',
    createProxyMiddleware({
        target: 'http://localhost:5000',
        changeOrigin: true,
        pathRewrite: { '/auth-service': '' },
    }),
);

app.listen(port, async () => {
    try {
        console.log(`Server listening on http://localhost:${port}`);
    } catch (error) {
        console.log(error);
    }
}).on('error', (e) => {
    console.log(e);
    process.exit(1);
});
