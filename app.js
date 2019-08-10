// Commit: Test export and path module
var object_logger = require('./logger');
console.log(object_logger);
console.log(module);

const path = require('path');
console.log(path.parse(__filename));

// Commit: Test events module
const EventEmitter = require('events');
const event = new EventEmitter();

// + Register a listener for an event
event.on('messageLog', function(){
	console.log('Listener called');
});

// + Raise an event
event.emit('messageLog');

