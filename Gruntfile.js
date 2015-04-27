module.exports = function (grunt) {

	grunt.initConfig({
		buster: {
			mediator: {
				config: 'test/buster.js'
			}
		},
		coveralls: {
			mediator: {
				src: 'coverage/lcov.info'
			}
		},
		watch: {
			files: ['*.js', 'test/**/*.js'],
			tasks: ['test', 'build']
		},
		browserify: {
			options: {
				require: ['./index.js:mediator']
			},
			build: {
				src: 'index.js',
				dest: 'build/browser/mediator.js',
			}
		},
		uglify: {
			options: {
				mangle: false,
				banner: '/*! mediator.js <%= grunt.template.today("yyyy-mm-dd") %> */ '
			},
			build: {
				src: 'build/browser/mediator.js',
				dest: 'build/browser/mediator.min.js'
			}
		}
	});

	grunt.loadNpmTasks('grunt-buster');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-notify');
	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-coveralls');

	grunt.registerTask('test', 'buster');
	grunt.registerTask('minify', 'uglify');
	grunt.registerTask('build', ['browserify', 'minify']);
};
