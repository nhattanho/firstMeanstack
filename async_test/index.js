console.log('Before');

//Asynchronous ==> nested ==> Callback Hell problem
const user = getUser(1, user=>{
	getRepo(user.gitHubUsername, (respons)=>{
		getCommits(respons.repo1, (commits)=> {
			console.log('Commits are: ' + commits);
		});
	});
});

/*
//Synchronous
console.logog('Before');
const user = getUser(1);
const repos = getRepo(user.gitHubUsername);
const commits = getCommits(reppos[0]);
console.logog('After');
*/


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

function getCommits(repo, callback)
{
	console.log('Get commits...');
	callback(["This commit for callback hell function in asynchronous!"]);
}