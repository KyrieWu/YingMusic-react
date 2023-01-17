module.exports = {
    // 超过最大值换行
    printWidth: 120,
    // 缩进字节数
    tabWidth: 2,
    // 缩进不使用tab, 使用空格
    useTabs: true,
    // 句尾添加分号
    semi: true,
    // 使用单引号代替双引号
    singleQuote: true,
    // 默认值。因为使用了一些折行敏感型的渲染器（如GitHub comment）而按照markdown文本样式进行折行
    proseWrap: "never",
    //  (x) => {} 箭头函数参数只有一个时是否要有小括号。avoid: 省略括号
    arrowParens: "avoid",
    // 在对象，数组括号与文字之间加空格 "{ foo: bar }"
    bracketSpacing: true,
    // 不格式化vue文件，vue文件的格式化单独设置
    disableLanguages: ["vue"],
    // 结尾是 \n \r \n\r auto
    endOfLine: "auto",
    //不让prettier使用eslint的代码格式进行校验
    eslintIntegration: false,
    htmlWhitespaceSensitivity: "strict",
    // 不使用prettier格式化的文件填写在项目的.prettierignore文件中
    ignorePath: ".prettierignore",
    // 在jsx中把'>' 是否单独放一行
    jsxBracketSameLine: false,
    // 在jsx中使用单引号代替双引号
    jsxSingleQuote: false,
    // 格式化的解析器，默认是babel
    // parser: "babel",
    // Require a 'prettierconfig' to format prettier
    requireConfig: false,
    //不让prettier使用stylelint的代码格式进行校验
    stylelintIntegration: false,
    // 在对象或数组最后一个元素后面是否加逗号（在ES5中加尾逗号）
    trailingComma: "es5",
    // 不让prettier使用tslint的代码格式进行校验
    tslintIntegration: false
};