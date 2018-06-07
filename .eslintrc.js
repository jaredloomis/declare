const ENV = process.env.NODE_ENV ?
            process.env.NODE_ENV.toLowerCase() : ""

const devRules = {
    "no-debugger": ["warn"]
}

const prodRules = {}

const alwaysRules = {
    "linebreak-style": ["warn", "unix"],
    "semi": ["warn", "never"],
    "no-unused-vars": ["warn"],
    "no-console": ["warn"],
    "eqeqeq": ["warn"],
    "no-shadow": ["warn"],
    "no-var": ["warn"],
    "no-duplicate-imports": ["warn"],
    "object-shorthand": ["warn"],
    "prefer-arrow-callback": ["warn"],
    "prefer-const": ["warn"],
    "prefer-rest-params": ["warn"],
    "prefer-spread": ["warn"],
    "camelcase": ["warn"],
    "brace-style": ["warn", "1tbs"],
    "array-bracket-spacing": ["warn", "never"],
    "no-labels": ["warn"],
    "no-loop-func": ["warn"],
    "yoda": ["warn", "never"],
    "require-await": ["warn"]
}

const rules = Object.assign({},
    alwaysRules,
    ENV.indexOf("prod") === 0 ? prodRules : devRules
)

module.exports = {
    "parser": "babel-eslint",
    "env": {
        "es6": true,
        "node": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": 8,
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true
        }
    },
    rules,
    "plugins": ["react", "flowtype"],
    "globals": {
        "$": false,
        "Materialize": false
    }
}
