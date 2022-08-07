const express = require('express');
const http = require('http');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/dist/online-shop'));

app.get('/*', (req, res) => res.sendFile(path.join(__dirname+ '/dist/online-shop/index.html')));
const server = http.createServer(app);

server.listen(port, ()=> console.log('server is running on port ' + port));
