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
    // populate author link and show infomation of specific author base on id
    //name-_id <=> only show name, exclude id of this author
    .populate('author', 'name -_id')
    .select('name author');//list propeties name and author
    console.log(courses);
}

//creatAuthor('Mosh', 'My bio', 'My Website');

//reateCourse('Node Course', '5dc317a55c7ec3206a2e2cab');

listCourses();