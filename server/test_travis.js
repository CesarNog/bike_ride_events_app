var http = require('http');
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello Travis!\n') // this will FAIL travis ci lint
}).listen(3000, '127.0.0.1');
console.log('Server running at http://127.0.0.1:3000/');