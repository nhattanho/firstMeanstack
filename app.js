//Note: "function(eventArgs){}" == "(eventArgs) => {}"

// + Raise an event with arguments
//event.emit('mesageLog', 1, 'url');
//event.emit('messageLog', {id: 1, url: 'http://'});
/*
const Logger = require('./logger'); // import class Logger from module logger.js
const logger = new Logger();

logger.on('messageLog', (arg)=> {
	console.log('Listener called...', arg);
});

logger.log('honhattan');
*/

const http = require('http');
const server = http.createServer();

// Register a event 
server.on('connection', (socket) => {
	console.log('New connection...');
});

server.listen(3000); //waiting a raising event on port 3000

console.log('Listening on port 3000...');
