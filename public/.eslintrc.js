module.exports = {
    "globals": {
        "Materialize": true
    },
//    "extends": ["eslint:recommended", "plugin:react/recommended"],
    "env": {
        "node": false,
        "browser": true
    },
    "rules": {
        "react/jsx-uses-react": ["warn"],
        "react/jsx-uses-vars": ["warn"],
    },
    "plugins": ["react", "flowtype"]
}
