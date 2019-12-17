const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
.then(()=> console.log('Connected to the MongoDB...'))
.catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
    name: String,
    bio: String,
    website: String
});

const Author = mongoose.model('Author',authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
    name: String,
    author: authorSchema
}));

async function createCourse(name, author){
    const course = new Course({
        name, author
    });
    const result = await course.save();
    console.log(result);
}

async function listCourses(){
    const courses = await Course
    .find()
    // populate author link and show infomation of specific author base on id
    //name-_id <=> only show name, exclude id of this author
    //.populate('author');
    //.select('name');//list propeties name and author
    console.log(courses);
}

//createCourse('Nhat Course', new Author({name: 'Nhat'}));
listCourses();