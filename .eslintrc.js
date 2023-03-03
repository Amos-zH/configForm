module.exports = {
  root: true, // 设置当前目录为根目录，停止在父级目录中寻找eslint配置
  env: {
    node: true, // Node.js 全局变量和 Node.js 作用域。
    es6: true, // 额外支持新的 ES6 全局变量
    browser: true, // 在代码中可以放心使用浏览器环境中的全局变量
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/standard',
  ],
  parserOptions: {
    parser: '@babel/eslint-parser',
    ecmaVersion: 6, // 启用 ES6 语法支持
    sourceType: 'module',
  },
  //   rules: {
  //     "规则名": [规则值, 规则配置]
  //   }
  // 规则
  // "off"或者0 //关闭规则关闭
  // "warn"或者1 //在打开的规则作为警告（不影响退出代码）
  // "error"或者2 //把规则作为一个错误（退出代码触发时为1）
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // 自定义
    indent: ['error', 2],
    'space-infix-ops': 'error', // 要求操作符周围有空格
    'comma-spacing': 'error', // 逗号后面加空格
    'arrow-spacing': 'error', // 使用 => 前后空格
    'spaced-comment': 'warn', // 注释风格，前后留一个空格
    'no-irregular-whitespace': 'error', // 不能有不规则的空格
    'no-mixed-spaces-and-tabs': 'error', // 不能混用空格和tab
    'no-multiple-empty-lines': 'error', // 不能有多余的空行
    'no-var': 'error', // 不能使用var
    'no-new': 'off',
    'new-cap': 'off', // 不要求构造函数首字母大写
    eqeqeq: 'error', // 使用全等
    quotes: [1, 'single'], // 引号类型，使用单引号
    camelcase: 'off',
    'vue/multi-word-component-names': ['error', {
      ignores: ['index'], // 需要忽略的组件名
    }],
    'comma-dangle': [2, 'always-multiline'], // 对象字面量项尾有逗号
  },
}
