module.exports = function( grunt ){

	var pkg = grunt.file.readJSON( __dirname +'/package.json');

	grunt.initConfig({
		pkg: pkg,
		sass: {
			styles: {
				files: [{
					src: ['assets/styles/index.scss'],
					dest: 'assets/styles/index_compiled.css' 
				}]
			}
		},
		cssmin: {
			options: {
				banner: '/* Compiled on: '+ (new Date).toString() +'*/ \n'
			},
			files: {
				'assets/compiled/styles.css': ['assets/styles/index_compiled.css']
			}
		},
		clean: {
			styles: ['assets/styles/index_compiled.css']
		},
		handlebars: {
			compile: {
				options: {
					namespace: 'solidus.templates',
					partialRegex: /.*/,
					partialsUseNamespace: true,
					processName: function( template_path ){
						return template_path.replace( /(^views\/)|(\.hbs)/ig, '' );
					},
					processPartialName: function( partial_path ){
						return partial_path.replace( /(^views\/)|(\.hbs)/ig, '' );
					}
				},
				files: {
					'assets/compiled/templates.js': ['views/**/*.hbs']
				}
			}
		},
		concat: {
			templates: {
				files: {
					'assets/compiled/templates.js': ['node_modules/grunt-contrib-handlebars/node_modules/handlebars/dist/handlebars.runtime.js','assets/compiled/templates.js']
				}
			}
		},
		requirejs: {
			options: {
				baseUrl: 'assets/scripts/',
				out: 'assets/compiled/scripts.js',
				name: 'index',
				preserveLicenseComments: false,
				generateSourceMaps: true,
				optimize: 'uglify2'
			}
		},
		uglify: {
			templates: {
				options: {
					banner: '/* Compiled on: '+ (new Date).toString() +'*/ \n'
				},
				files: {
					'assets/compiled/templates.js': ['assets/compiled/templates.js']
				}
			}
		},
		watch: {
			styles: {
				files: ['assets/styles/**/*.scss','assets/styles/**/*.css','assets/styles/**/*.sass'],
				tasks: ['compilecss'],
				options: {
					livereload: true
				}
			},
			templates: {
				files: ['views/**/*.hbs'],
				tasks: ['compilehbs']
			},
			scripts: {
				files: ['assets/scripts/**/*.js'],
				tasks: ['compilejs']
			}
		}
	});
	
	// The cool way to load Grunt tasks
	// https://github.com/Fauntleroy/relay.js/blob/master/Gruntfile.js
	Object.keys( pkg.devDependencies ).forEach( function( dep ){
		if( dep.substring( 0, 6 ) === 'grunt-' ) grunt.loadNpmTasks( dep );
	});

	grunt.registerTask( 'server', 'Start the Solidus server', function(){
		var solidus = require('solidus');
		var port = grunt.option('port') || grunt.option('p');
		solidus.start({
			port: port
		});		
	});

	grunt.registerTask( 'default', ['compile'] );
	grunt.registerTask( 'compile', ['compilecss','compilehbs','compilejs'] );
	grunt.registerTask( 'compilehbs', ['handlebars','concat:templates','uglify:templates'] );
	grunt.registerTask( 'compilejs', ['requirejs'] );
	grunt.registerTask( 'compilecss', ['sass','cssmin','clean:styles'] );
	grunt.registerTask( 'dev', [ 'compile','server','watch' ] );

};