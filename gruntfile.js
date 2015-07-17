module.exports = function(grunt) {
  var destPath = './build/';
  var sourcePath = './sources/';
  var modulesPath = './node_modules/';
  var pkg = grunt.file.readJSON('package.json');

  var minJsName = pkg.name + '.min.js'

  var files = [{
    type: 'angular',
    name: 'angular.min.js',
    destFolder: destPath,
    destPath: 'lib/angular/',
    srcPath: modulesPath + 'angular/'
  }, {
    type: 'angular-route',
    name: 'angular-route.min.js',
    destFolder: destPath,
    destPath: 'lib/angular/',
    srcPath: modulesPath + 'angular-route/'
  }, {
    type: 'angular-cookies',
    name: 'angular-cookies.min.js',
    destFolder: destPath,
    destPath: 'lib/angular/',
    srcPath: modulesPath + 'angular-cookies/'
  }, {
    type: 'material-js',
    name: 'material.min.js',
    destFolder: destPath,
    destPath: 'lib/material-design-lite/',
    srcPath: modulesPath + 'material-design-lite/'
  }, {
    type: 'material-css',
    name: 'material.min.css',
    destFolder: destPath,
    destPath: 'lib/material-design-lite/',
    srcPath: modulesPath + 'material-design-lite/'
  }, {
    ignore: true,
    type: 'stylesheet',
    name: 'https://fonts.googleapis.com/icon?family=Material+Icons',
    destPath: ''
  }, {
    ignore: true,
    name: minJsName,
    destPath: 'js/',
  }]

  var copyConfig = {
    templates: {
      files: [{
        expand: true,
        cwd: 'sources/templates',
        src: ['*.tpl'],
        dest: destPath + 'templates'
      }]
    }
  };

  for (var i = 0; i < files.length; i += 1) {
    var file = files[i];

    if (!file.ignore) {
      copyConfig[file.type] = {
        expand: true,
        cwd: file.srcPath,
        src: [file.name],
        dest: file.destFolder + file.destPath
      };
    }
  }

  // Project configuration.
  grunt.initConfig({
    pkg: pkg,
    uglify: {
      options: {
        sourceMap: true,
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: sourcePath + '**/*.js',
        dest: destPath + 'js/' + minJsName
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
    copy: copyConfig
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('createPage', function() {
    var ejs = require('ejs');
    var templateContent = grunt.file.read(sourcePath + 'index.html');

    var customFiles = files.slice(0);

    var htmlContent = ejs.render(templateContent, {
      app: {
        name: pkg.name,
        files: customFiles
      }
    });

    grunt.file.write(destPath + 'index.html', htmlContent);
  });

  grunt.registerTask('rebuild', ['copy:templates', 'uglify', 'createPage']);

  grunt.registerTask('build', function() {
    grunt.file.delete(destPath);
    grunt.task.run('copy');
    grunt.task.run('uglify');
    grunt.task.run('createPage');
  });

  grunt.registerTask('start', [
    'build',
    'connect:server',
    'watch'
  ]);
};