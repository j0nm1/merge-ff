const checkBranch = require("./check-branch")

const description = `
🚀 This pull request can be merged with fast-forward/update-ref. 🚀

- Will keep the commit hashes for a linear history
- To merge this pull request, comment with "/merge-ff"
`

async function comment(context) {
    const { github, payload} = context

    const head = await checkBranch(context, payload.pull_request.head.ref)
    const base = await checkBranch(context, payload.pull_request.base.ref)

    if(!head || !base) {
        console.log("config does not match branches")
        return
    }

    console.log(payload)

    const comment = context.issue({ body: description })

    return github.issues.createComment(comment)
}

module.exports = comment