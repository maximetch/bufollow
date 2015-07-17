module.exports = function(grunt) {
  var fs = require('fs.extra');
  var destPath = 'build/';
  var sourcePath = 'sources/';

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        sourceMap: true,
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: sourcePath + '**/*.js',
        dest: destPath + 'js/<%= pkg.name %>.min.js'
      }
    },
    connect: {
      server: {
        options: {
          port: 8000,
          hostname: '*',
          keepalive: true
        }
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-connect');

  grunt.registerTask('clean', 'Clean build folder', function() {
    fs.rmrfSync(destPath, function (err) {
      if (err) {
        console.error(err);
      }
    });
  });

  grunt.registerTask('move-sources', 'Copy html files', function() {
    fs.copy(sourcePath + 'index.html', destPath + 'index.html', function (err) {
      if (err) {
        throw err;
      }
    });

    fs.copyRecursive(sourcePath + 'templates', destPath + 'templates', function (err) {
      if (err) {
        throw err;
      }
    });
  });

  grunt.registerTask('move-lib', 'Copy lib files', function() {
    var libPath = destPath + 'lib/';

    // jQuery
    fs.copyRecursive('node_modules/jquery/dist/jquery.min.js', libPath + 'jquery', function (err) {
      if (err) {
        throw err;
      }
    });

    // Angular
    fs.copyRecursive('node_modules/angular/angular.min.js', libPath + 'angular', function (err) {
      if (err) {
        throw err;
      }
    });
    fs.copyRecursive('node_modules/angular-route/angular-route.min.js', libPath + 'angular', function (err) {
      if (err) {
        throw err;
      }
    });
    fs.copyRecursive('node_modules/angular-cookies/angular-cookies.min.js', libPath + 'angular', function (err) {
      if (err) {
        throw err;
      }
    });

    // Materialize
    fs.copyRecursive('node_modules/materialize-css/bin', libPath + 'materialize/bin', function (err) {
      if (err) {
        throw err;
      }
    });
    fs.copyRecursive('node_modules/materialize-css/font', libPath + 'materialize/font', function (err) {
      if (err) {
        throw err;
      }
    });
  });

  // Default task(s).
  grunt.registerTask('default', ['clean', 'uglify', 'move-sources', 'move-lib', 'connect']);

};