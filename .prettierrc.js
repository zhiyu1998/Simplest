module.exports = {
	semi: false, // 行位是否使用分号，默认为true
	trailingComma: 'es5', // 是否使用尾逗号，有三个可选值"<none|es5|all>"
	singleQuote: true, // 字符串是否使用单引号，默认为false，使用双引号
	printWidth: 100, // 一行的字符数，如果超过会进行换行，默认为80
	tabWidth: 4, // 一个tab代表几个空格数
	useTabs: true, // 启用tab缩进
	bracketSpacing: true, // 对象大括号直接是否有空格，默认为true，效果：{ foo: bar }
	endOfLine: 'crlf', // 结尾符号
	bracketSameLine: false, // 是否将HTML '<>' 中的 '>'单独放一行出来 -- false 单独放
}
