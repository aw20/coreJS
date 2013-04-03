
module.exports = function(grunt) {

	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		jshint: {
			all: ['grunt.js', 'src/**/*.js'],
			options: {
				browser: true,
				laxcomma: true,
				smarttabs: true,
			}
		},

		concat : {
			core : {
				src : ['src/aw2.js', 'src/aw2-ajax-jquery.js', 'src/aw2-event-jquery.js'],
				dest : 'dist/<%= pkg.name %>-<%= pkg.version %>.js'
			},
			log : {
				src : ['src/plugins/aw2-log.js', 'src/plugins/aw2-log-server.js'],
				dest : 'dist/plugins/<%= pkg.name %>-log-<%= pkg.version %>.js'
			}
		},

		uglify: {
    	options: {
      	banner:
      	'/* ---\n' +
        '  \n' +
      	'  <%= pkg.title || pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '  <%= pkg.author.url %>\n' +
        '  \n' +
        '  License : GNU GENERAL PUBLIC LICENSE. \n' +
        '  \n' +
        '  Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>\n' +
        '  \n' +
        '--- */\n'
    	},
   		build: {
   			files : {
   				'dist/<%= pkg.name %>-<%= pkg.version %>.min.js' : ['dist/<%= pkg.name %>-<%= pkg.version %>.js']
   			}
   		},
   		log : {
   			files : {
   				'dist/plugins/<%= pkg.name %>-log-<%= pkg.version %>.min.js' : ['dist/plugins/<%= pkg.name %>-log-<%= pkg.version %>.js']
   			}
   		}
    },

		watch: {
		  scripts: {
		    files: 'src/**/*.js',
		    tasks: ['concat'],
		    options: {
		      interrupt: true
		    }
		  }
		},

		yuidoc: {
		  compile: {
		    name: 'AW2.0 JS Library',
		    description: '<%= pkg.description %>',
		    version: '<%= pkg.version %>',
		    url: '<%= pkg.homepage %>',
		    logo: 'http://www.aw20.co.uk/a/img/logo.png',
		    options: {
		      paths: 'src/',
		      outdir: 'docs/'
		    }
		  }
		}

	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-yuidoc');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', ['concat', 'uglify', 'yuidoc']);
	grunt.registerTask('build', ['concat']);
	grunt.registerTask('lint', ['jshint']);
	grunt.registerTask('watchme', ['watch']);

};
