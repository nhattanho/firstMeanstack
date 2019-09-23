console.log('Before');

const user = getUser(1, user=>{
	getRepo(user.gitHubUsername, (respons)=>{
		console.log("Response", respons);
	});
});

console.log('After');

function getUser(id, callback) {
	setTimeout(()=>{
		console.log('Reading a user from a database..');
		callback({id: id, gitHubUsername: 'Nhat Ho'});
	},2000);
}

function getRepo(id, callback){
	setTimeout( ()=> {
		console.log('Calling GitHub API....');
		callback (['repo1', 'repo2', 'repo3']);
	});
}