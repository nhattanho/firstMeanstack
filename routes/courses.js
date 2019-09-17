// const express = require('express');
//const app = express.Router();
// The new way to create the router from es6
import { Router } from 'express';
const router = Router();
/*===================================GET METHOD==============================================*/
const courses = [
	{ id: 1, name: 'course1' },
	{ id: 2, name: 'course2' },
	{ id: 3, name: 'course3' }
];

router.get('/', (req, res)=>{
	res.send((courses));
});

//1 parameter
router.get('/:id', (req, res)=>{
	//courses.find(c => c.id === parseInt(req.params.id));
	const course = courses.find(function(element){
		return element.id === parseInt(req.params.id);
	});
	if(!course) return res.status(404).send('The course with given ID was not found');
	res.send(course);
	console.log(course);
});

//2 parameters
router.get('/:year/:month', (req, res)=>{
        res.send(req.params);
});
/*====================================END GET METHOD==========================================*/

/*=====================================POST METHOD============================================*/
//Create an object
router.post('/', (req, res)=>{

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
/*====================================END POST METHOD==========================================*/

/*=======================================PUT METHOD============================================*/
//Update the object
router.put('/:id', (req,res)=>{
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
/*====================================END PUT METHOD==========================================*/

/*======================================DELETE METHOD==========================================*/
router.delete('/:id', (req, res)=>{
	//Look up the course
	const course = courses.find(element => element.id === parseInt(req.params.id));
	if(!course) return res.status(404).send('The course with given ID was not found');

	const index = courses.indexOf(course);
	courses.splice(index,1);

	//res.send(course);
	res.send(courses);
});
/*======================================END DELETE METHOD======================================*/

/*========================================CHILD FUNCTIONS======================================*/
function validateCourse(course)
{
	const schema = {
		name: Joi.string().min(3).required() 
	};
	return Joi.validate(course, schema);
}	
/*========================================END CHILD FUNCTIONS==================================*/
module.exports = router;