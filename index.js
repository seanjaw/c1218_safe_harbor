const express = require('express');
const cors = require('cors');
const PORT = process.env.PORT || 9000;
const ENV = process.env.NODE_ENV || 'development';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/test', async (req, res) => {
    //
    // const sql = 'SELECT * FROM `test`';
    //
    // const users = await db.query(sql);

    const users = 'I think itll work just saying text';

    res.send({
        success: true,
        users: users
    });
});

app.post('/api/test', async (req, res) => {
    const users = 'You did it';

    res.send({
        success: true,
        users: users
    });
});

app.listen(PORT, () => {
    console.log('Server Running at localhost:' + PORT);
}).on('error', (err) => {
    console.log('Server listen error, you probably already have a server on PORT:' + PORT)
});