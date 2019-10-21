// File testing for mongooseDB

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/playground')
    .then(() =>console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB...', err ));

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: {type:Date, default: Date.now},
    isPublished: Boolean
});

const Course = mongoose.model('Course', courseSchema);

async function createCourse(){
    const course = new Course({
        name: 'Node.js Course',
        author: 'Nhat Ho',
        tags: ['node', 'backend'],
        isPublished: true
    });

    const result = await course.save();
    console.log(result);
}

async function createCourse1(){
    const course = new Course({
        name: 'Angular Course',
        author: 'Nhat Ho',
        tags: ['angular', 'backend'],
        isPublished: true
    });

    const result = await course.save();
    console.log(result);
}

async function getCourses(){
    const courses = await Course
        .find({author: 'Nhat Ho', isPublished: true})
        .limit(10)
        .sort({name: 1}) //ascending 
        .select({name: 1, tags: 1});// only get information of name and tags
    console.log(courses);
}
//createCourse();
//createCourse1();
getCourses();
