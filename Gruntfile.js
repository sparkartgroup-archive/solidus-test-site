module.exports = function( grunt ){

	var pkg = grunt.file.readJSON('package.json');

	grunt.initConfig({
		cwd: process.cwd(),
		pkg: pkg,
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
					'assets/compiled/styles_tmp.css': ['assets/compiled/styles.scss']
				}
			}
		},
		// copy final css over after the fact because sass deletes-compiles-replaces
		// which causes FoUC in conjunction with livereload
		copy: {
			css: {
				src: 'assets/compiled/styles_tmp.css',
				dest: 'assets/compiled/styles.css'
			}
		},
		regarde: {
			styles: {
				files: ['assets/styles/**/*.scss','assets/styles/**/*.css','assets/styles/**/*.sass'],
				tasks: ['concat:css','sass','copy']
			},
			scripts: {
				files: ['assets/scripts/**/*.js'],
				tasks: ['concat:js']
			},
			reload: {
				files: ['assets/compiled/styles.css'],
				tasks: ['livereload']
			}
		},
		clean: {
			sass: ['assets/compiled/styles.scss','assets/compiled/styles_tmp.css'],
		}
	});
	
	// The cool way to load Grunt tasks
	// https://github.com/Fauntleroy/relay.js/blob/master/Gruntfile.js
	Object.keys( pkg.devDependencies ).forEach( function( dep ){
		if( dep.substring( 0, 6 ) === 'grunt-' ) grunt.loadNpmTasks( dep );
	});

	grunt.registerTask( 'server', 'Start the Solidus server', function(){
		var child_process = require('child_process');
		var spawn = child_process.spawn;
		var server = spawn( 'solidus', ['start'] );
		console.log('Starting Solidus server...');
		server.stderr.on( 'data', function( data ){
			console.error( data.toString() );
		});
		server.stdout.on( 'data', function( data ){
			console.log( data.toString() );
		});
		process.on( 'exit', function(){
			server.kill();
		});
	});

	grunt.registerTask( 'default', ['concat','sass','copy','clean' ] );
	grunt.registerTask( 'dev', ['livereload-start','server','regarde' ] );

};