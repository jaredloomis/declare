module.exports = {
    "env": {
        "node": false,
        "browser": true
    },
    "globals": {
        "process": true
    },
    "rules": {
        "react/jsx-uses-react": ["warn"],
        "react/jsx-uses-vars": ["warn"],
    },
    "plugins": ["react", "flowtype"]
}
