/**
 * User: Rob Richard
 * Date: 10/21/15
 * Time: 11:50 AM
 */

'use strict';

var path = require('path');

var configHelpers = module.exports = {
    configMap: {
        'react': path.resolve(__dirname, '../configs/react.js'),
        'es6': path.resolve(__dirname, '../configs/es6.js'),
        'es5': path.resolve(__dirname, '../configs/es5.js')
    },
    linterExecutable: require.resolve('eslint/bin/eslint'),
    getConfigKey: function (fileName, opt = {}) {
        if (fileName.match(/\.jsx$/)) {
            return 'react';
        } else if (fileName.match(/\.es\.js$/) || (opt.options && opt.options.es6 && fileName.match(/.js$/))) {
            return 'es6';
        } else if (fileName.match(/\.js$/)) {
            return 'es5';
        }
    },
    getConfig: function (fileName, opt = {}) {
        return configHelpers.configMap[configHelpers.getConfigKey(fileName, opt)];
    },
    getLinterOptions: function (config, opt = {}) {
        var args = [
            '--no-eslintrc',
            '-c',
            config
        ];
        if (process.env.lintFix) {
            args.push('--fix');
        }

        if (opt.options) {
            if (!opt.options.warnings) {
                args.push('--quiet');
            }
            if (opt.options.format) {
                args.push('--format=' + opt.options.format);
            }
        }

        return args;
    }
};
