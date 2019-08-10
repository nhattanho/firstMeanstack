//Note: "function(eventArgs){}" == "(eventArgs) => {}"

// + Raise an event with arguments
//event.emit('mesageLog', 1, 'url');
//event.emit('messageLog', {id: 1, url: 'http://'});

const Logger = require('./logger'); // import class Logger from module logger.js
const logger = new Logger();

logger.on('messageLog', (arg)=> {
	console.log('Listener called...', arg);
});

logger.log('honhattan');
