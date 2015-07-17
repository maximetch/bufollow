module.exports = function(grunt) {
  var destPath = './build/';
  var sourcePath = './sources/client/';
  var modulesPath = './node_modules/';
  var pkg = grunt.file.readJSON('package.json');

  var minJSName = pkg.name.toLowerCase() + '.min.js'
  var minCSSName = pkg.name.toLowerCase() + '.min.css'

  var include = {
    js: [{
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
      type: 'angular-animate',
      name: 'angular-animate.min.js',
      destFolder: destPath,
      destPath: 'lib/angular/',
      srcPath: modulesPath + 'angular-animate/'
    }, {
      type: 'angular-aria',
      name: 'angular-aria.min.js',
      destFolder: destPath,
      destPath: 'lib/angular/',
      srcPath: modulesPath + 'angular-aria/'
    }, {
      type: 'angular-material-js',
      name: 'angular-material.min.js',
      destFolder: destPath,
      destPath: 'lib/angular/',
      srcPath: modulesPath + 'angular-material/'
    }, {
      ignore: true,
      name: minJSName,
      destPath: 'js/',
    }],
    css: [{
      type: 'angular-material-css',
      name: 'angular-material.min.css',
      destFolder: destPath,
      destPath: 'lib/angular/',
      srcPath: modulesPath + 'angular-material/'
    }, {
      ignore: true,
      type: 'stylesheet',
      name: 'https://fonts.googleapis.com/css?family=RobotoDraft:300,400,500,700,400italic',
      destPath: ''
    }, {
      ignore: true,
      name: minCSSName,
      destPath: 'css/',
    }]
  };

  var copyConfig = {
    templates: {
      files: [{
        expand: true,
        cwd: sourcePath + 'templates',
        src: ['*.tpl'],
        dest: destPath + 'templates'
      }]
    }
  };

  var allIncluded = include.js.concat(include.css);

  for (var i = 0; i < allIncluded.length; i += 1) {
    var el = allIncluded[i];

    if (!el.ignore) {
      copyConfig[el.type] = {
        expand: true,
        cwd: el.srcPath,
        src: [el.name],
        dest: el.destFolder + el.destPath
      };
    }
  }

  var stylusFiles = {};
  stylusFiles[destPath + 'css/' + minCSSName ] = sourcePath + 'stylus/index.styl';

  // Project configuration.
  grunt.initConfig({
    pkg: pkg,
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
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: sourcePath + '**/*.js',
        dest: destPath + 'js/' + minJSName
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
  grunt.loadNpmTasks('grunt-contrib-stylus');

  grunt.registerTask('createPage', function() {
    var ejs = require('ejs');
    var templateContent = grunt.file.read(sourcePath + 'index.html');

    var htmlContent = ejs.render(templateContent, {
      app: {
        name: pkg.name,
        include: include
      }
    });

    grunt.file.write(destPath + 'index.html', htmlContent);
  });

  grunt.registerTask('rebuild', ['copy:templates', 'uglify', 'stylus', 'createPage']);

  grunt.registerTask('build', function() {
    grunt.file.delete(destPath);
    grunt.task.run('copy');
    grunt.task.run('uglify');
    grunt.task.run('stylus');
    grunt.task.run('createPage');
  });

  grunt.registerTask('start', [
    'build',
    'connect:server',
    'watch'
  ]);
};