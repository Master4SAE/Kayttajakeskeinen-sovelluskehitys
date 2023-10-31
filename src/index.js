// index.js
import http from 'http';
import bodyParser from "body-parser";
import fs from 'fs';

const customerData = {
  name: 'Sohaib',
  Lastname: 'Ebrahimi',
  age: 20,
  studentOf: 'Metropolia',
}

const hostname = '127.0.0.1';
const port = 65535;

const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/data') {
    const responseData = customerData;
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 200;
    res.end(JSON.stringify(responseData));
  } else if (req.method === 'GET' && req.url === '/') {
    // Serve the index.html file as the default page
    // this is the extra i made for assignment
    
    fs.readFile('src/index.html', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Internal Server Error');
      } else {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.end(data);
      }
    });
  } else {
    res.statusCode = 404; 
    res.setHeader('Content-Type', 'text/plain');
    res.end('Resource not found');
  }
});

server.on('request', (req, res) => {
  if (req.method === 'POST' && req.url === '/data') {
    let requestBody = '';

    req.on('data', (chunk) => {
      requestBody += chunk.toString();
    });

    req.on('end', () => {
      const receivedData = JSON.parse(requestBody);
    
      res.setHeader('Content-Type', 'application/json');
      res.statusCode = 201;
      res.end(JSON.stringify({ message: 'Data received' }));
    });
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

