module.exports = function(grunt) {
  var destPath = './application/public/';
  var sourcePath = './sources/';
  var modulesPath = './node_modules/';
  var pkg = grunt.file.readJSON('package.json');

  var minJSName = pkg.name.toLowerCase() + '.min.js';
  var minCSSName = pkg.name.toLowerCase() + '.min.css';

  var stylusFiles = {};
  stylusFiles[destPath + 'css/' + minCSSName ] = sourcePath + 'stylus/index.styl';

  // Project configuration.
  grunt.initConfig({
    pkg: pkg,
    express: {
      dev: {
        options: {
          script: 'application/app.js'
        }
      }
    },
    stylus: {
      compile: {
        options: {
          paths: [sourcePath + 'stylus']
        },
        files: stylusFiles
      }
    },
    uglify: {
      options: {
        sourceMap: true,
        sourceMapIncludeSources: true,
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: sourcePath + '**/*.js',
        dest: destPath + 'js/' + minJSName
      }
    },
    watch: {
      express: {
        files:  [ '**/*.js' ],
        tasks:  [ 'express:dev' ],
        options: {
          spawn: false,
          interval: 5007
        }
      },
      scripts: {
        files: [sourcePath + '**/*.*'],
        tasks: ['rebuild'],
        interval: 5007
      }
    },
    concat: {
      options: {
        separator: ';',
      },
      dist: {
        src: [
          'node_modules/angular/angular.min.js',
          'node_modules/angular-route/angular-route.min.js',
          'node_modules/angular-cookies/angular-cookies.min.js',
          'node_modules/angular-animate/angular-animate.min.js',
          'node_modules/angular-aria/angular-aria.min.js',
          'node_modules/angular-material/angular-material.min.js'
        ],
        dest: destPath + 'lib/angular-custom.min.js'
      },
    },
    copy: {
      images: {
        files: [{
          expand: true,
          cwd: './design',
          src: ['*.png', '*.jpg', '*.jpeg', '*.gif'],
          dest: destPath + 'images'
        }]
      },
      angularMaterialCSS: {
        files: [{
          expand: true,
          cwd: modulesPath + '/angular-material',
          src: ['angular-material.min.css'],
          dest: destPath + 'lib/'
        }]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-express-server');

  grunt.registerTask('rebuild', ['copy:images', 'uglify', 'stylus']);

  grunt.registerTask('build', function() {
    grunt.file.delete(destPath);
    grunt.task.run('copy');
    grunt.task.run('concat');
    grunt.task.run('uglify');
    grunt.task.run('stylus');
  });

  grunt.registerTask('server', [ 'express:dev', 'build', 'watch' ]);
};