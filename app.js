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
//if not, it is undefined, and node_env is the default value "development" of ${app.get('env')}
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

const courses = [
	{ id: 1, name: 'course1' },
	{ id: 2, name: 'course2' },
	{ id: 3, name: 'course3' }
];

app.get('/', (req,res)=>{
	res.send('hello word');
});

app.get('/api/list', (req, res)=>{
	res.send((courses));
});

//1 parameter
app.get('/api/courses/:id', (req, res)=>{
	//courses.find(c => c.id === parseInt(req.params.id));
	const course = courses.find(function(element){
		return element.id === parseInt(req.params.id);
	});
	if(!course) return res.status(404).send('The course with given ID was not found');
	res.send(course);
	console.log(course);
});

//2 parameters
app.get('/api/posts/:year/:month', (req, res)=>{
        res.send(req.params);
});

//Create an object
app.post('/api/courses', (req, res)=>{

	/*
	const schema = {
		name: Joi.string().min(3).required()
	};

	const result = Joi.validate(req.body, schema);
	if(result.error){
		res.status(400).send(result.error.details[0].message);
		return;
	}
	*/
	
	const {error} = validateCourse(req.body);
	if(error) return res.status(400).send(error.details[0].message);

	const course = {
		id: courses.length + 1,
		name: req.body.name
	};
	courses.push(course);
	//res.send(course);
	res.send(courses);
});

//Update the object
app.put('/api/courses/:id', (req,res)=>{
	//Look up the course, if not existing -> return 404
	const course = courses.find(element => element.id === parseInt(req.params.id));
	if(!course) return res.status(404).send('The course with given ID was not found');
	
	/*
	//Validate, if invalid, return 400 - bad request
	const schema = {
		name: Joi.string().min(3).required()
	};
	const result = Joi.validate(req.body, schema);
	if(result.error){
		res.status(400).send(result.error.details[0].message);
                return;
        }
	*/
	
	// { error }: the way to get the property of result of validate function
	const {error} = validateCourse(req.body);// const result = ... =>result.error...
	if(error) return res.status(400).send(error.details[0].message);

	//Update course
	course.name = req.body.name;
	//Return the updated course
	res.send(course);
});

function validateCourse(course)
{
	const schema = {
		name: Joi.string().min(3).required() 
	};
	return Joi.validate(course, schema);
}	

app.delete('/api/courses/:id', (req, res)=>{
	//Look up the course
	const course = courses.find(element => element.id === parseInt(req.params.id));
	if(!course) return res.status(404).send('The course with given ID was not found');

	const index = courses.indexOf(course);
	courses.splice(index,1);

	//res.send(course);
	res.send(courses);
});

//PORT
const port = process.env.PORT || 3000;
app.listen(port, ()=>{
        console.log(`listening on port ${port}...`);
});

