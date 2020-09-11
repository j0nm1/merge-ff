const checkBranch = require('./check-branch');

async function merge(context) {
	const {github, payload} = context;

	if (payload.comment.body !== '/merge-ff') {
		console.log('not a merge comment');
		return;
	}

	if (!payload.issue.pull_request) {
		console.log('not a pull request');
		return;
	}

	const owner = payload.repository.owner.login;
	const repo = payload.repository.name;
	const pull_number = payload.issue.number;

	const {data} = await github.pulls.get({owner, repo, pull_number});

	const head = await checkBranch(context, data.base.ref);
	const base = await checkBranch(context, data.head.ref);

	if (!head || !base) {
		console.log('config does not match branches');
		return;
	}

	github.git.updateRef({
		owner,
		repo,
		ref: 'heads/' + data.base.ref,
		sha: data.head.sha
	});
}

module.exports = merge;
