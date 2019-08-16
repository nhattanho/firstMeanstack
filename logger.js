function log(req, res, next){
	console.log('Logging...'); // req.body
	next();
}

const EventEmitter = require('events');

var url = 'http://mylogger.io/log';

class Logger extends EventEmitter
{
	log(message) 
	{
		console.log(message);
		// Raise an event
		this.emit('messageLog', {id: 1, url: 'http://'});
	}
}

// export a class named Logger
module.exports = Logger;
module.exports = log;
