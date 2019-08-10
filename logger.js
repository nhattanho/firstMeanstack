const EventEmitter = require('events');
const event = new EventEmitter();

var url = 'http://mylogger.io/log';

// + Register a listener for an event with arguments
event.on('messageLog', function(eventArgs){
        console.log('Listener called', eventArgs);
});


function log(message) {
	console.log(message);
	event.emit('messageLog', {id: 1, url: 'http://'});
}

module.exports = log;
