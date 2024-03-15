const express = require('express');
const redis = require('redis');
const port = 6000;
const app = express();

const client = redis.createClient();
client.on('error', (err) => console.log('Redis Client Error'));
client.on('connect', () => {
    console.log('Redis plugged in.');
});

const subscriber = client.duplicate();
subscriber.on('error', (err) => console.error(err));

(async () => {
    await client.connect();
    await subscriber.connect();
})();

subscriber.subscribe('PRODUCT', (message, channel) => {
    createOrder = {};
    const order = JSON.parse(message);
    createOrder = order;
});

app.use(express.json());
let createOrder = {};

app.get('/buy', async (req, res) => {
    const products = [
        {
            productId: 1,
            price: 1000,
        },
        {
            productId: 2,
            price: 2000,
        },
    ];
    await client.publish('ORDER', JSON.stringify(products));
    setTimeout(() => {
        return res.status(200).json(createOrder);
    }, 700);
});

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
