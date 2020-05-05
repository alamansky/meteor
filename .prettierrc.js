/** @format */

// https://prettier.io/docs/en/options.html

// vscode settings: "editor.formatOnSave": true

// intentionally omitted due to conflicts with stylelint: tabWidth: 4

module.exports = {
	printWidth: 120, //page line width
	semi: true, //add semicolons to line endings
	singleQuote: true, //use single quotes for strings
	jsxSingleQuote: true, //enforces above in JSX
	trailingComma: 'all', //use trailing commas for objects
	bracketSpacing: true, // use spaces between the brackets of object literals and the contents therein
	jsxBracketSameLine: false, // ???
	arrowParens: 'always', //use parenthesis around the argument(s) of an arrow function
	useTabs: true, //timeless spaces vs tabs
	requirePragma: false, //will check for the @format tag before formatting
	insertPragma: true, //generates said @format tag
	proseWrap: 'preserve', //default setting
	htmlWhiteSpaceSensitivity: 'ignore', //default setting
	endOfLine: 'auto', //default setting
};
