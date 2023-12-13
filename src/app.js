import express from 'express';
import path from 'path';
import { promises as fsPromises } from 'fs';
import bodyParser from 'body-parser';
import fs from 'fs/promises';
import mediaRouter from './routes/media-router.mjs';
import userRouter from './routes/user-router.mjs';
const hostname = '127.0.0.1';
const app = express();
const port = 3000;


app.set('views', 'src/views');
app.set('view engine', 'pug');

app.get('/', (req, res) => {
    res.render('index', {
        title: 'You',
        message: 'made it to front page'
    });
});

app.use(express.json());
// Get all media item & Post media items
app.use('/media', mediaRouter)

//Get one media item by ID
app.use('/media/:id', mediaRouter)

// Get all users && Post media items
app.use('/user', userRouter)


app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
