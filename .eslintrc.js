/** @format */

console.log('hi');

// https://eslint.org/docs/user-guide/configuring

// vscode settings: "eslint.run": "onSave"

module.exports = {
	root: true, //tells ESLint that the config file is located in the root directory
	env: {
		browser: true, //recognize browser globals like the window object
		node: true, //recognize node globals
		commonjs: true, //recognize commonJS syntax
		es6: true, //
	},
	extends: ['prettier', 'eslint:recommended', 'plugin:react/recommended'], //inherits rules from base configurations, optional "eslint-config-" prefix omitted
	parser: 'babel-eslint', //uses the babel parser instead of the default Espree parser to lint early-stage syntax
	parserOptions: {
		ecmaVersion: 9, //sets ecmascript version to ES9/ES2018
		sourceType: 'module', //specifies code as module-based vs script-tag based
	},
	plugins: ['babel', 'react'], //installed plugins, optional "eslint-plugin-" prefix removed
	rules: {
		strict: 1,
	},
};
