const server = require('./api/sever.js');

const port = 5000;
server.listen(port, () => console.log(' server is running...'));