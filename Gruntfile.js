var buildTmpl = require("./dev/build-templates");

module.exports = function (grunt) {

  // Strip comments from JsHint JSON files.
  var _jshint = function (name) {
    if (!grunt.file.exists(name)) { return "{}"; }
    return JSON.parse(grunt.file.read(name).replace(/\/\/.*\n/g, ""));
  };

  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),

    bowerPath: "bower_components",
    vendorPath: "vendor",

    jade: {
      docs: {
        options: {
          pretty: true
        },
        files: {
          "index.html": ["doc/index.jade"],
          "todo.html":  ["doc/todo.jade"]
        }
      }
    },

    copy: {
      vendor: {
        files: [
          {
            dest: "<%= vendorPath %>",
            expand: true,
            flatten: true,
            src: [
              "<%= bowerPath %>/mocha/mocha.js",
              "<%= bowerPath %>/mocha/mocha.css",
              "<%= bowerPath %>/chai/chai.js",
              "<%= bowerPath %>/sinon-chai/lib/sinon-chai.js",
              "<%= bowerPath %>/blanket/dist/qunit/blanket.js",
              "<%= bowerPath %>/blanket/dist/qunit/blanket.min.js",
              "<%= bowerPath %>/jquery/dist/jquery.js",
              "<%= bowerPath %>/jquery/dist/jquery.min.js",
              "<%= bowerPath %>/json2/json2.js",
              "<%= bowerPath %>/jquery-backstretch/jquery.backstretch.js",
              "<%= bowerPath %>/jquery-backstretch/jquery.backstretch.min.js",
              "<%= bowerPath %>/underscore/underscore.js",
              "<%= bowerPath %>/backbone/backbone.js",
              "<%= bowerPath %>/backbone.localStorage/backbone.localStorage.js"
            ]
          },
          {
            dest: "<%= vendorPath %>/bootstrap",
            cwd: "<%= bowerPath %>/bootstrap/dist",
            expand: true,
            src: [
              "css/**",
              "fonts/**",
              "js/**"
            ]
          },
          {
            dest: "<%= vendorPath %>/sinon.js",
            src: "<%= bowerPath %>/sinon/index.js"
          },
          {
            dest: "<%= vendorPath %>/underscore.min.js",
            src: "<%= bowerPath %>/underscore/underscore-min.js"
          },
          {
            dest: "<%= vendorPath %>/backbone.min.js",
            src: "<%= bowerPath %>/backbone/backbone-min.js"
          },
          {
            dest: "<%= vendorPath %>/backbone.localStorage.min.js",
            src: "<%= bowerPath %>/backbone.localStorage/" +
                 "backbone.localStorage-min.js"
          },
          {
            dest: "<%= vendorPath %>/showdown",
            cwd: "<%= bowerPath %>/showdown/src",
            expand: true,
            src: ["**"]
          }
        ]
      }
    },

    uglify: {
      vendor: {
        files: {
          "<%= vendorPath %>/json2.min.js": [
            "<%= vendorPath %>/json2.js"
          ]
        }
      }
    },

    jshint: {
      client: {
        options: _jshint("dev/jshint-client.json"),
        files: {
          src: [
            "notes/app/js/fixtures/**/*.js",
            "notes/test/js/spec/**/*.js",
            "notes/app/js/app/**/*.js",
            "notes-rest/test/js/spec-rest/**/*.js",
            "notes-rest/app/js/app-rest/**/*.js",
            "chapters/*/test/js/spec/**/*.js",
            "doc/**/*.js"
          ]
        }
      },
      server: {
        options: _jshint("dev/jshint-server.json"),
        files: {
          src: [
            "Gruntfile.js",
            "notes-rest/server.js"
          ]
        }
      }
    },

    mocha_phantomjs: {
      app:          ["notes/test/test*.html"],
      rest:         ["notes-rest/test/test.html"],
      "chaps-all":  ["chapters/test*.html"],
      chaps: [
        "chapters/*/test/test*.html",
        "!chapters/*/test/test*failure.html",
        "!chapters/*/test/test*timing.html"
      ]
    },

    watch: {
      options: {
        spawn: false,
        atBegin: true
      },
      tmpl: {
        files: [
          "./notes/app/templates.html"
        ],
        tasks: ["build:tmpl"]
      },
      docs: {
        files: [
          "doc/**/*.jade",
          "**/*.md"
        ],
        tasks: ["jade"]
      }
    }
  });

  // Dependencies
  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-contrib-jade");
  grunt.loadNpmTasks("grunt-mocha-phantomjs");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-contrib-uglify");

  // Internal Tasks.
  grunt.registerTask("build:tmpl", function () {
    var tmpl = buildTmpl("./notes/app/templates.html");
    grunt.file.write(
      "./notes/app/js/app/templates/templates.js",
      tmpl);
  });
  grunt.registerTask("build:vendor",    ["copy:vendor", "uglify:vendor"]);

  // Wrapper Tasks.
  grunt.registerTask("test:app",        ["mocha_phantomjs:app"]);
  grunt.registerTask("test:rest",       ["mocha_phantomjs:rest"]);
  grunt.registerTask("test:chaps-all",  ["mocha_phantomjs:chaps-all"]);
  grunt.registerTask("test:chaps",      ["mocha_phantomjs:chaps"]);
  grunt.registerTask("test",            ["mocha_phantomjs"]);
  grunt.registerTask("check",           ["jshint", "test"]);

  grunt.registerTask("build",   ["build:tmpl", "jade:docs", "build:vendor"]);
  grunt.registerTask("default", ["build", "check"]);
};
