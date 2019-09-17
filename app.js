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
/*
const http = require('http');
const server = http.createServer((req, res)=>
{
        if(req.url === '/'){
                res.write('Hello word');
                res.end();
        }
        if(req.url === '/api/courses')
        {
                res.write(JSON.stringify([1, 2, 3]));
                res.end();
        }

});

server.listen(3000); //waiting a raising event on port 3000

console.log('Listening on port 3000...');
*/
const config = require('config');
const morgan = require('morgan');
const helmet = require('helmet');
const log = require('./logger');
const Joi = require('joi');
const express = require('express');
const app = express();
//parsing the body of request to json 
app.use(express.json());
app.use(helmet());
app.set('view engine', 'pug');
app.set('views', './views');

//Seperate by using the routers
const courses = require('./routes/courses');
app.use('/api/courses', courses);

//Using home router
const home = require('./routers/home');
app.use('/', home);

//Using for logging any request of client on cosole or log file in two ways
//1) By using app.get('env') 
console.log(`app: ${app.get('env')}`);//default value of app.get('env') is development

if(app.get('env') === 'development'){
	app.use(morgan('tiny'));//tiny is kind of font
	console.log('Morgan enabled...');
}
else if(app.get('env') === 'production')//export NODE_ENV=production
{
	console.log('Morgan disabled');
}

//2) By creating a variable 
console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
//if the NODE_ENV is exported, the process.env.NODE will have the value of NODE_ENV
//if not, it is undefined while node_env is the default value "development" of ${app.get('env')}
const node_env = process.env.NODE_ENV || `${app.get('env')}`;

if(node_env === 'development')
{
	app.use(morgan('tiny'));
	console.log('Morgan enanbled');
}
else if(node_env == 'production') //export NODE_ENV=production
{
	console.log('Morgan disabled');
}

//Using for app.post with urlencoded form
app.use(express.urlencoded({ extended: true }));
//Using for making a file can be accessed or opened by directly url 
//Accessing by typing an url like http://localhost:3000/readme.txt
app.use(express.static('public'));

//PORT
const port = process.env.PORT || 3000;
app.listen(port, ()=>{
        console.log(`listening on port ${port}...`);
});

