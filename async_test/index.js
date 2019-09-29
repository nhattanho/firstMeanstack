console.log('Before');

//Asynchronous ==> nested ==> Callback Hell problem
const user = getUser(1, getRepo1);

//Replace callback function by specific functions
//In fact, creating timeout to simulation a real case and proving the asynchronous of nodejs 
function getUser(id, callback) {
	console.log('In getUser function');
	setTimeout(()=>{
		console.log('Reading a user from a database..');
		callback({id: id, gitHubUsername: 'Nhat Ho'});
	},2000);
}

function getRepo1(user)
{
	console.log('In getRepo1 function');
	console.log('user id: ', user.id);
	getRepo(user.id, (getCommits1));
}

function getRepo(id, callback){
	console.log('In getRepo2 function.')
	setTimeout( ()=> {
		console.log('Calling GitHub API....');
		callback({repo1: 'repo1', repo2: 'repo2', repo3: 'repo3'});
	});
}

function getCommits1(respons)
{
	console.log('In getCommits1');
	console.log('respons name:', respons.repo1);
	getCommits(respons.repo1, displayCommits);
}

function getCommits(repo, callback)
{
	console.log('In function getCommits and value of repo is', repo);
	console.log('Get commits...');
	callback(["This commit for callback hell function in asynchronous!"]);
}

function displayCommits(commits)
{
	console.log('Commits are: ' + commits);
}

//=====================================================
console.log('After');