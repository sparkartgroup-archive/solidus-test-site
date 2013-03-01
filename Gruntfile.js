module.exports = function( grunt ){

    grunt.initConfig({
        cwd: process.cwd(),
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            js: {
                options: {
                    separator: ';'
                },
                src: ['assets/scripts/**/*.js'],
                dest: 'assets/compiled/scripts.js'
            },
            css: {
                options: {
                    separator: '\n'
                },
                src: ['assets/styles/**/*.css','assets/styles/**/*.scss','assets/styles/**/*.sass'],
                dest: 'assets/compiled/styles.scss'
            }
        },
        sass: {
            dev: {
                options: {
                    lineNumbers: true,
                    style: 'expanded'
                },
                files: {
                    'assets/compiled/styles.css': ['assets/compiled/styles.scss']
                }
            }
        },
        watch: {
            styles: {
                files: ['assets/styles/**/*.scss','assets/styles/**/*.css','assets/styles/**/*.sass'],
                tasks: ['concat:css','sass']
            },
            scripts: {
                files: ['assets/scripts/**/*.js'],
                tasks: ['concat:js']
            }
        },
        clean: {
            sass: 'assets/compiled/styles.scss'
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask( 'default', ['concat','sass','clean']);

};