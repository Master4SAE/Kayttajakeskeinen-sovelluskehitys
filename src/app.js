import express from 'express'
import path from 'path';
import bodyParser from 'body-parser';
import apiRoutes from './api';

const app = express();
const port = 3000;

// Set Pug as the view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Serve static files from the 'media' folder
app.use('/media', express.static(path.join(__dirname, 'media')));

// Middleware to parse JSON in request body
app.use(bodyParser.json());

// Use API routes
app.use('/api', apiRoutes);

// Render HTML page using Pug
app.get('/', (req, res) => {
    res.render('index', { title: 'Media Sharing API' });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});