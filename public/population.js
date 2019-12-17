const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
.then(()=> console.log('Connected to the MongoDB...'))
.catch(err => console.error('Could not connect to MongoDB...', err));

const Author = mongoose.model('Author', new mongoose.Schema({
    name: String,
    bio: String,
    website: String
}));

const Course = mongoose.model('Course', new mongoose.Schema({
    name: String,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author' // reference to the Author collection
    }
}));

async function creatAuthor(name, bio, website){
    const author = new Author({
        name, bio, website       
    });
    const result = await author.save();
    console.log(result);
}

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
    // populate author which was linked and showed by specific author having its id
    //name-_id <=> only show name, exclude id of this populated author
    .populate('author', 'name -_id')
    .select('name author');//list propeties name and author
    console.log(courses);
}

//creatAuthor('Nhat Ho', 'CS', 'My Website');

//createCourse('Node Course of Nhat', '5dca1d8c6ee1990ccd7cdce0');

listCourses();
//Example of output
/*
{ _id: 5dc318b4e11b3620d360c36f, name: 'Node Course' }, ==> course 1
  { _id: 5dc31b20e1702421a273359a, ==> course 2
    name: 'Node Course',
    author: { name: 'Mosh' } },
  { _id: 5dca1e6513f1080e5b2f7631, ==> course 3
    name: 'Node Course of Nhat',
    author: { name: 'Nhat Ho' } } ==> because of populate only for author, include name and excluded id
*/
