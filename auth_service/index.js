const express = require('express');
const port = 5000;
const app = express();

app.use(express.json());
app.get('/', (req, res) => {
    return res.status(200).json({ message: 'Auth service' });
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
