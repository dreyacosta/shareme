module.exports = function(grunt) {

  grunt.initConfig({
    clean: {
      dev: ['public'],
      build: ['public/js/app.js', 'public/js/app_test.js']
    },

    browserify: {
      dist: {
        files: {
          'public/js/app.js': ['browserify/js/main.js']
        }
      },
      test: {
        files: {
          'public/js/app_test.js': ['browserify/js/app.js'],
          'spec/client/clientSpec.js': ['browserify/spec/clientSpec.js']
        }
      }
    },

    copy: {
      public: {
        expand: true,
        cwd: 'browserify/',
        src: [
          'images/**',
          'ico/favicon.ico'
        ],
        dest: 'public'
      },
      build: {
        expand: true,
        cwd: 'browserify/',
        src: [
          'images/**'
        ],
        dest: 'public'
      }
    },

    jade: {
      node: {
        files: {
          'browserify/js/templates/': ['browserify/templates/**/*.jade']
        },
        options: {
          wrap: 'node'
        }
      }
    },

    jasmine: {
      src: 'public/js/app_test.js',
      options: {
        specs: 'spec/client/**/*.js'
      }
    },

    simplemocha: {
      options: {
        globals: ['should'],
        timeout: 3000,
        ignoreLeaks: false,
        ui: 'bdd',
        reporter: 'spec'
      },
      all: { src: ['spec/server/**/*.js'] }
    },

    jshint: {
      options: {
        boss: true,
        curly: true,
        eqeqeq: true,
        eqnull: true,
        immed: true,
        indent: 2,
        latedef: true,
        laxcomma: true,
        multistr: true,
        newcap: true,
        noarg: true,
        node: true,
        sub: true,
        undef: true,
        globals: {
          window: true,
          document: true,
          define: true,
          describe: true,
          beforeEach: true,
          expect: true,
          it: true,
          spyOn: true
        },
        ignores: ['browserify/js/templates/**/*.js']
      },
      all: [
        'app.js',
        'Gruntfile.js',
        'noderplate.js',
        'browserify/**/*.js',
        'config/**/*.js',
        'controllers/**/*.js',
        'core/**/*.js',
        'models/**/*.js',
        'routers/**/*.js',
        'sockets/**/*.js',
        'spec/server/**/*.js'
      ]
    },

    stylus: {
      options: {
        compress: true,
        'include css': true
      },
      compile: {
        files: {
          'public/css/xpressio.min.css': ['browserify/stylesheets/xpressio.styl']
        }
      }
    },

    uglify: {
      app: {
        files: {
          'public/js/app.min.js': ['public/js/app.js']
        }
      }
    },

    watch: {
      options: {
        event: ['added', 'changed']
      },
      browserify: {
        files: ['browserify/js/**/*.js'],
        tasks: ['browserify', 'jasmine']
      },
      jade: {
        files: ['browserify/templates/**/*.jade'],
        tasks: ['jade', 'copy:public']
      },
      server_tests: {
        files: [
          'config/**/*.js',
          'controllers/**/*.js',
          'core/**/*.js',
          'models/**/*.js',
          'routers/**/*.js',
          'sockets/**/*.js',
          'spec/server/**/*.js'
        ],
        tasks: ['simplemocha']
      },
      jshint: {
        files: [
          'app.js',
          'Gruntfile.js',
          'noderplate.js',
          'browserify/**/*.js',
          'config/**/*.js',
          'controllers/**/*.js',
          'core/**/*.js',
          'models/**/*.js',
          'routers/**/*.js',
          'sockets/**/*.js',
          'spec/server/**/*.js'
        ],
        tasks: ['jshint']
      },
      stylus: {
        files: ['browserify/stylesheets/**/*.styl'],
        tasks: ['stylus']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-simple-mocha');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-jade');

  grunt.registerTask('build', ['clean', 'jshint', 'jade', 'browserify', 'stylus', 'copy:public', 'uglify', 'simplemocha', 'jasmine', 'clean:build']);
  grunt.registerTask('default', ['clean', 'jshint', 'jade', 'browserify', 'stylus', 'copy:public', 'simplemocha', 'jasmine']);

};