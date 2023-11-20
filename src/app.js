import express from 'express'
import fs from 'fs'

const app = express()
const port = 3000

app.set('view engine', 'pug');

app.set('views', 'src/views');


app.get('/', (req, res) => {
    res.render('index', { title: 'My Pug Page', message: 'Welcome to Pug!' });

});
//Get all
app.get('/api/media', (req, res) => {
    fs.readFile('api/media/allMockData.json', 'utf8', (err, data) => {
      if (err) {
        res.status(500).send('Error reading the JSON file');
      } else {
        const jsonData = JSON.parse(data);
        res.json(jsonData);
      }
    });
  });

app.get('/api/media/:id', (req, res) => {
    const id = parseInt(req.params.id)
    console.log(id);
    
    fs.readFile('api/media/allMockData.json', 'utf8', (err, data) => {
        if (err) {
          res.status(500).send('Error reading the JSON file');
        } else {
            const jsonData = JSON.parse(data);

            let matchFound = false;
            jsonData.forEach(element => {
                if (element.media_id === id){
                    res.send(element);
                    matchFound = true;
                }
            });
            if (!matchFound) {
                res.status(404).send('No matching data found');
              }
          
        }
      });

});

app.post('/api/media/submit', (req, res) => {
  // Access data from the request body
  const formData = req.body;

  res.render('submitForm');

  // Process the data (you can replace this with your own logic)
  console.log('Form data received:', formData);

  // Send a response back to the client
  res.send('Form submitted successfully!');
});



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})