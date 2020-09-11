async function checkBranch(context, branch) {
    const config = await context.config('merge-ff.yml');

    if(!config || !config.branches) {
        console.log("no config, enabled for all branches")
        return true;
    }
    console.log(branch)
    if (config.branches.includes(branch)) {
        return true
    } else {
        return false;
    }

}

module.exports = checkBranch