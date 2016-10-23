/**
 * @ignore
 * Created by daletan on 10/22/16.
 */

'use strict';

const assert = require('assert');
const {
    getConfig,
    getConfigKey,
    getLinterOptions
} = require('../lib/configHelpers');

describe('config helpers', function () {
    it('should get the correct config', function () {
        let key = getConfig('react.jsx');
        assert.ok(Object.keys(key).filter(k => k === 'react'));
        key = getConfig('es6.es.js');
        assert.ok(Object.keys(key).filter(k => k === 'es6'));
        key = getConfig('es6.js', {
            options: {
                es6: true
            }
        });
        assert.ok(Object.keys(key).filter(k => k === 'es6'));
        key = getConfig('es5.js');
        assert.ok(Object.keys(key).filter(k => k === 'es5'));
    });
    it('should get the correct config type', function () {
        let key = getConfigKey('react.jsx');
        assert.deepEqual(key, 'react');
        key = getConfigKey('es6.es.js');
        assert.deepEqual(key, 'es6');
        key = getConfigKey('es6.js', {
            options: {
                es6: true
            }
        });
        assert.deepEqual(key, 'es6');
        key = getConfigKey('es5.js');
        assert.deepEqual(key, 'es5');
    });

    describe('getLinterOptions', function () {
        it('should get the default linter options', function () {
            const options = getLinterOptions({});
            assert.ok(options.indexOf('--no-eslintrc') > -1);
            assert.ok(options.indexOf('-c') > -1);
            assert.ok(typeof options[2] === 'object');
            assert.ok(options.length === 3);
        });
    });
});
