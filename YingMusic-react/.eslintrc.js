module.exports = {
    // 代码运行环境
    "env": {
        "browser": true,
        "es2021": true,
        "node": true
    },
    // 集成官方配置好的规则
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended",
        'plugin:import/recommended',
        'plugin:prettier/recommended'
    ],
    "overrides": [
    ],
    // 解析器
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module",
        // 额外的语言特性
        "ecmafeatures": {
            "jsx": true,
        },

    },
    // 插件
    "plugins": [
        "react",
        "@typescript-eslint",
        'react-hooks',
        'prettier'
    ],
    /**
     * 自定义规则:
       "off" or 0 - 关闭规则
       "warn" or 1 - 将规则视为一个警告
       "error" or 2 - 将规则视为一个错误
     */
    "rules": {
        'react/react-in-jsx-scope': 0, // jsx文件一定得引入react
        '@typescript-eslint/no-unused-vars': 0, // 将 声明未使用规则关闭
        'import/order': [  // 配置引入的排序
            'error',
            {
                groups: ['builtin', 'external', 'internal'],
                pathGroups: [
                    {
                        pattern: 'react',
                        group: 'external',
                        position: 'before',
                    },
                ],
                pathGroupsExcludedImportTypes: ['react'],
                'newlines-between': 'always',
                alphabetize: {
                    order: 'asc',
                    caseInsensitive: true,
                },
            },
        ],
    },
    settings: {
        'import/resolver': { // 排序设置
            node: {
                extensions: ['.ts', '.tsx'],
                moduleDirectory: ['node_modules', 'src/'],
            },
            typescript: {
                alwaysTryTypes: true,
            },
        },
        react: {
            version: 'detect',
        },
    }
}
