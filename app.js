/*
// Commit: Test export and path module
var object_logger = require('./logger');
console.log(object_logger);
console.log(module);

const path = require('path');
console.log(path.parse(__filename));
*/

// Commit: Test events module
const EventEmitter = require('events');
const event = new EventEmitter();

// + Register a listener for an event with arguments
event.on('messageLog', function(eventArgs){
	console.log('Listener called', eventArgs);
});

// + Raise an event with arguments
//event.emit('mesageLog', 1, 'url');
event.emit('messageLog', {id: 1, url: 'http://'});

