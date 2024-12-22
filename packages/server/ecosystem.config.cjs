const path = require("path")

module.exports = {
    apps: [
        {
            name: "kinkinko-bot",
            script: "node ./dist/index.js",
            env: {
                NODE_ENV: "production",
            },
            cwd: path.resolve(__dirname, "./"),
        },
    ],
}
