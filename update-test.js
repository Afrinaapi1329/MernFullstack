const http = require('http');
const data = JSON.stringify({ address: 'new city' });
const options = {
  hostname: 'localhost',
  port: 8000,
  path: '/api/update/user/69a4662f6d7cc925653eb3c6',
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
};
const req = http.request(options, res => {
  console.log('status', res.statusCode);
  res.on('data', d => process.stdout.write(d));
});
req.on('error', e => console.error('error', e));
req.write(data);
req.end();
