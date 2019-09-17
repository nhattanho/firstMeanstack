console.log('Before');
setTimeout(()=> {
	console.log('Reading a user from a database...');
},2000);
console.log('After');
//The result to show the phenomenon of asynchronous
//Before
//After
//Reading a user from a database....
