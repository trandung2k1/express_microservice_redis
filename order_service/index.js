const express = require('express');
const redis = require('redis');
const { v4: uuidv4 } = require('uuid');
const port = 5000;
const app = express();
const client = redis.createClient();

client.on('error', (err) => console.log('Redis Client Error'));
client.on('connect', () => {
    console.log('Redis plugged in.');
});
const subscriber = client.duplicate();

subscriber.subscribe('ORDER', async (message, channel) => {
    const products = JSON.parse(message);
    const totalPrice = products?.reduce((prev, curr) => prev + curr.price, 0);
    const id = uuidv4();
    const order = {
        products: products,
        id,
        totalPrice,
    };
    console.log(order);
    await client.publish('PRODUCT', JSON.stringify(order));
});

(async () => {
    await client.connect();
    await subscriber.connect();
})();

app.use(express.json());
app.get('/', (req, res) => {
    return res.status(200).json({ message: 'Order service' });
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
