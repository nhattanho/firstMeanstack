console.log('Before');
const p = getUser(1);
p
.then(user => {
	 getRepositories(user.gitHubUsername)
	.then(repos => getCommits(repos[0])
	 	.then(commits =>{
		console.log(commits.commit)})
		.catch(error => console.log('Error for getCommits')))
	.catch(error => console.log('Error for getRepositories'))
})
.catch(err => console.log('Error for get User'));

console.log('After');

function getUser(id) {
	return new Promise((resolve, reject)=>{
		setTimeout(() => {
			console.log('Reading a user from a database...');
			resolve({ id: 5, gitHubUsername: 'mosh' });
		  }, 2000);
	});
}

function getRepositories(username) {
	return new Promise((resolve, reject)=>{
		setTimeout(() => {
			console.log('Calling GitHub API...');
			resolve(['repo1', 'repo2', 'repo3']);
		  }, 2000);
	});
}

function getCommits(repo) {
	return new Promise((resolve, reject)=>{
		setTimeout(() => {
			console.log('Calling GitHub API in getCommits...');
			resolve({commit: 'This is commit for using promise'});
		  }, 2000);
	}); 
}