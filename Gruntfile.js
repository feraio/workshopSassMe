module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    env: {
      appDir: 'assets',
      buildDir: 'dist'
    },

    clean: {
      dist: {
        files: [{
          dot: true,
          src: ['<%= env.buildDir %>/*']
        }]
      }
    },

    sass: {
      options: {
        sourcemap: 'none',
        lineNumbers: true,
        style: 'expanded'
      },

      dist: {
        files: [{
          expand: true,
          cwd: '<%= env.appDir %>/scss/',
          src: ['**/*.scss'],
          dest: '<%= env.buildDir %>/styles',
          ext: '.css'
        }]
      }
    },

    copy: {
      html: {
        files: [{
          expand: true,
          cwd: '<%= env.appDir %>/html/',
          src: ['**'],
          dest: '<%= env.buildDir %>'
        }]
      },

      resources: {
        files: [{
          // You can include here pdf, fonts, icons, svg, etc
          expand: true,
          cwd: '<%= env.appDir %>',
          src: ['{images,fonts,pdf,excel}/**', '!docs/**'],
          dest: '<%= env.buildDir %>'
        }]
      }
    },

    cssmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= env.buildDir %>/styles',
          src: ['*.css'],
          dest: '<%= env.buildDir %>/styles',
          ext: '.css'
        }]
      }
    },

    watch: {
      css: {
        files: '<%= env.appDir %>/**/*.scss',
        tasks: ['sass']
      },

      html: {
        files: ['<%= env.appDir %>/**/*.html'],
        tasks: ['copy:html']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  grunt.registerTask('build:dev',['clean', 'sass', 'copy:html', 'copy:resources', 'watch']);

  grunt.registerTask('build:prod',['clean', 'sass', 'cssmin', 'copy:html', 'copy:resources']);
};