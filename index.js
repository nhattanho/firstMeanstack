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

// eq - equal
// ne - not equal
// gt - greater than
// gte - greater than or equal to
// lt - less than
// lte - less than or equal to
// in
// nin - not in
async function getCourses1(){
    /*Get content at specific page
    const pageNumber =  2;
    const pageSze = 10;*/

    const courses = await Course
        //.find({price: {$gte: 10, $lte: 20}})
        //.find({price: {$in: [10, 15, 20]}})
        
        /*using find with or/and*/
        //.find()
        //.or([{author: 'Nhat'}, {isPublished: true}])
        //.and([{author: 'Nhat'}, {isPublished: true}])
        
        /*Find content starting with Nhat*/
        .find({author: /^Nhat/})
        /*Find content ending with Ho, option i using for case intensitive*/
        .find ({author: /Ho$/i})

        /*Find content having Nhat*/
        .find({author: /.*Nhat.*/i})
        /*.skip((pageNumber-1)*pageSize)*/
        .limit(10)
        .sort({name: 1}) //ascending 
        .select({name: 1, tags: 1})// only get information of name and tags
        .count(); //show how many objects in table of database and didn't show the select courses
    console.log(courses);
}
//createCourse();
//createCourse1();
getCourses1();

//Two ways to update
/* 1.
Approach: Query first
findById()
Modify its properties
save()

2.
Approach: Update first
Update directly
Optionally: get the updated document
*/
/*Implement 1 way with retrieving*/
async function updateCourse (id)
{
    
    const course = await Course.findById(id);
    if(!course) return;
    course.isPublished = true;
    course.author = 'Another Author';
    /*The same as two line above
    course.set({
        isPublished: true,
        author: 'Another Author'
    })
    */
    const result = await course.save();
    console.log(result);
}
//updateCourse('5dae27e0dd30d3208b3a858a');

/*Implement 2 way with retrieving*/
async function updateCourse1 (id)
{
    //const result = await Course.update(
    const result = await Course.findByIdAndUpdate(id,
    {   $set:{
            author: 'Nhat Tan Ho',
            isPublished: true
        }
    }, {new: true});
    if(!result) return;
    console.log(result);
}
updateCourse1('5dae27e0dd30d3208b3a858a');