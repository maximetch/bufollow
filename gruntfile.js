var fs = require('fs.extra');

module.exports = function(grunt) {
  var destPath = './build/';
  var sourcePath = './sources/';

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
          base: 'build/',
          port: 8000,
          hostname: '*'
        }
      }
    },
    watch: {
      scripts: {
        files: [sourcePath + '**/*.*'],
        tasks: ['rebuild']
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('rmBuild', 'Remove build folder', function() {
    fs.rmrfSync(destPath, function (err) {
      if (err) {
        console.error(err);
      }
    });
  });

  grunt.registerTask('toto', '', function() {
    fs.copy('foo.txt', 'bar.txt', { replace: false }, function (err) {
      if (err) {
        // i.e. file already exists or can't write to directory
        throw err;
      }

      console.log("Copied 'foo.txt' to 'bar.txt'");
    });
  });

  grunt.registerTask('moveSources', 'Copy html files', function() {
    fs.copyRecursive(sourcePath + 'index.html', destPath, function (err) {
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

  grunt.registerTask('moveLib', 'Copy lib files', function() {
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

  grunt.registerTask('rebuild', [
    'rmBuild',
    'uglify',
    'moveSources',
    'moveLib'
  ]);

  grunt.registerTask('start', [
    'rebuild',
    'connect:server',
    'watch'
  ]);
};