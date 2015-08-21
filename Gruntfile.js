module.exports = function (grunt) {

    'use strict';

    grunt.initConfig({

        jshint: {
            files: ['Gruntfile.js', 'src/{,*/}*.js', 'test/{,*/}*.js'],
            options: {
                reporter: require('jshint-stylish'),
                globals: {
                    angular: true,
                    require: true,
                    jasmine: true,
                    module: true
                }
            }
        },
        karma: {
            unit: {
                configFile: 'test/karma.conf.js',
                singleRun: true
            }
        },

    });

    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.registerTask('test', ['jshint', 'karma']);
};