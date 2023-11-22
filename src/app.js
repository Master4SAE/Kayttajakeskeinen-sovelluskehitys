import express from 'express';
import path from 'path';
import { promises as fsPromises } from 'fs';
import bodyParser from 'body-parser';
import fs from 'fs/promises';

const hostname = '127.0.0.1';
const app = express();
const port = 3000;
const jsonFilePath = path.join('media', 'allMockData.json');
const data = await fsPromises.readFile(jsonFilePath, 'utf-8');
const jsonData = JSON.parse(data);



app.set('views', 'src/views');
app.set('view engine', 'pug');
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.render('index', {
        title: 'You',
        message: 'made it to front page'
    });
});

// Get all media items Works
app.get('/media', async (req, res) => {
    try {
        res.json(jsonData);
    } catch (error) {
        console.error('Error reading JSON file:', error);
        res.status(500).send('Internal Server Error');
    }
});

//Get one media item by ID
app.get('/media/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    jsonData.forEach(item => {
        if (item.media_id === id){
            res.json(item)
        }
    });

});
app.post('/media', (req, res) => {
    const reqData = req.body;
    // Do something with the data (e.g., save to a database)
    console.log('Received POST data:', reqData);
    jsonData.push(reqData);
    console.log(jsonData);

    // Write the updated data back to the file
    fs.writeFile(jsonFilePath, JSON.stringify(jsonData, null, 2), 'utf-8');

});
app.put('/media/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const reqData = req.body;

    const existingData = await fs.readFile(jsonFilePath, 'utf-8');
    const jsonData = JSON.parse(existingData);

    const indexToUpdate = jsonData.findIndex(item => item.media_id === id);

    if (indexToUpdate !== -1) {
        
        const itemToUpdate = jsonData[indexToUpdate];
        itemToUpdate.media_id = reqData.media_id || itemToUpdate.media_id;
        itemToUpdate.filename = reqData.filename || itemToUpdate.filename;
        itemToUpdate.filesize = reqData.filesize| itemToUpdate.filesize;
        itemToUpdate.title = reqData.title || itemToUpdate.title;
        itemToUpdate.description = reqData.description || itemToUpdate.description;
        itemToUpdate.user_id = reqData.user_id || itemToUpdate.user_id;
        itemToUpdate.media_type = reqData.media_type || itemToUpdate.media_type;
        itemToUpdate.created_at = reqData.created_at || itemToUpdate.created_at;

        // Write the updated data back to the file
        await fs.writeFile(jsonFilePath, JSON.stringify(jsonData, null, 2), 'utf-8');
    }
    console.log(jsonData);
});
app.delete('/media/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const existingData = await fs.readFile(jsonFilePath, 'utf-8');
    const jsonData = JSON.parse(existingData);

    const indexToUpdate = jsonData.findIndex(item => item.media_id === id);

    if (indexToUpdate !== -1) {
        
        jsonData.splice(indexToUpdate,1)

        // Write the updated data back to the file
        await fs.writeFile(jsonFilePath, JSON.stringify(jsonData, null, 2), 'utf-8');
    }
    console.log(jsonData);
});

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
