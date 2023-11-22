import express from 'express'
import path from 'path';
import bodyParser from 'body-parser';
import apiRoutes from './api';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.render('index', { title: 'Media Sharing API' });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});