module.exports = function(grunt) {
  var destPath = './build/';
  var sourcePath = './sources/';
  var modulesPath = './node_modules/';

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
    },
    copy: {
      page: {
        files: [{
          expand: true,
          cwd: 'sources',
          src: ['index.html'],
          dest: destPath
        }]
      },
      templates: {
        files: [{
          expand: true,
          cwd: 'sources/templates',
          src: ['*.tpl'],
          dest: destPath + 'templates'
        }]
      },
      angular: {
        files: [{
          expand: true,
          cwd: modulesPath + 'angular',
          src: ['angular.min.js'],
          dest: destPath + 'lib/angular'
        }]
      },
      angularRoute: {
        files: [{
          expand: true,
          cwd: modulesPath + 'angular-route',
          src: ['angular-route.min.js'],
          dest: destPath + 'lib/angular'
        }]
      },
      angularCookies: {
        files: [{
          expand: true,
          cwd: modulesPath + 'angular-cookies',
          src: ['angular-cookies.min.js'],
          dest: destPath + 'lib/angular'
        }]
      },
      jQuery: {
        files: [{
          expand: true,
          cwd: modulesPath + 'jquery/dist',
          src: ['jquery.min.js'],
          dest: destPath + 'lib/jquery'
        }]
      },
      materialize: {
        files: [{
          expand: true,
          cwd: modulesPath + 'materialize-css',
          src: ['bin/**', 'font/**'],
          dest: destPath + 'lib/materialize'
        }]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('rebuild', function() {
    grunt.task.run('copy:page');
    grunt.task.run('copy:templates');
    grunt.task.run('uglify');
  });

  grunt.registerTask('build', function() {
    grunt.file.delete(destPath);
    grunt.task.run('copy');
    grunt.task.run('uglify');
  });

  grunt.registerTask('start', [
    'build',
    'connect:server',
    'watch'
  ]);
};