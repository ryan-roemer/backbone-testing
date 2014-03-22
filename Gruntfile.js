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

    clean: {
      vendor: "<%= vendorPath %>"
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
              "<%= bowerPath %>/sinonjs/sinon.js",
              "<%= bowerPath %>/sinon-chai/lib/sinon-chai.js",
              "<%= bowerPath %>/blanket/dist/qunit/blanket.js",
              "<%= bowerPath %>/blanket/dist/qunit/blanket.min.js",
              "<%= bowerPath %>/jquery/dist/jquery.js",
              "<%= bowerPath %>/jquery/dist/jquery.min.js",
              "<%= bowerPath %>/json2/json2.js",
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
          // TODO: Exclude Jasny until this is fixed.
          // See: https://github.com/jasny/bootstrap/issues/192
          // {
          //   dest: "<%= vendorPath %>/bootstrap-jasny",
          //   cwd: "<%= bowerPath %>/bootstrap-jasny/dist",
          //   expand: true,
          //   src: ["**"]
          // },
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
          ],
          "<%= vendorPath %>/underscore.min.js": [
            "<%= vendorPath %>/underscore.js"
          ],
          "<%= vendorPath %>/backbone.min.js": [
            "<%= vendorPath %>/backbone.js"
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

    // TODO: add tests for:
    // - app/js/app-rest/collections/notes.js
    // - js/spec-rest/collections/notes.spec.js
    // which currently have a different setup.
    karma: {
      options: {
        frameworks: ["mocha"],
        runnerPort: 9999,
        files: [
          // Test Libraries
          // From karma-mocha: "notes/test/js/lib/mocha.js",
          "notes/test/js/lib/chai.js",
          "notes/test/js/lib/sinon-chai.js",
          "notes/test/js/lib/sinon.js",

          // Core Libraries
          "notes/app/js/lib/underscore.js",
          "notes/app/js/lib/jquery.js",
          "notes/app/js/lib/json2.js",
          "notes/app/js/lib/backbone.js",
          "notes/app/js/lib/backbone.localStorage.js",
          "notes/app/js/lib/bootstrap/js/bootstrap.js",
          "notes/app/js/lib/showdown/showdown.js",

          // Application Libraries
          "notes/app/js/app/namespace.js",
          "notes/app/js/app/config.js",
          "dev/karma-setup.js", // Setup and App.Config patch.
          "notes/app/js/app/models/note.js",
          "notes/app/js/app/collections/notes.js",
          "notes/app/js/app/templates/templates.js",
          "notes/app/js/app/views/note-nav.js",
          "notes/app/js/app/views/note-view.js",
          "notes/app/js/app/views/note.js",
          "notes/app/js/app/views/notes-item.js",
          "notes/app/js/app/views/notes-filter.js",
          "notes/app/js/app/views/notes.js",
          "notes/app/js/app/routers/router.js",

          // Tests.
          "notes/test/js/spec/**/*.js",
          "chapters/*/test/js/spec/**/*.js"
        ],
        exclude: [
          // Tests we **don't** want to run.
          "chapters/01/test/js/spec/failure.spec.js",
          "chapters/01/test/js/spec/timing.spec.js",
          "chapters/03/test/js/spec/mocha-only.spec.js"
        ],
        client: {
          mocha: {
            ui: "bdd"
          }
        }
      },
      fast: {
        singleRun: true,
        browsers: ["PhantomJS"],
        reporters: "mocha"
      },
      ci: {
        singleRun: true,
        browsers: ["PhantomJS", "Firefox"],
        reporters: "mocha"
      },
      all: {
        singleRun: true,
        browsers: ["PhantomJS", "Chrome", "Firefox", "Safari"],
        reporters: "mocha"
      },
      dev: {
        // Invoke with `karma run` in another terminal.
        browsers: ["PhantomJS", "Chrome", "Firefox", "Safari"],
        reporters: "mocha"
      }
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
  grunt.loadNpmTasks("grunt-karma");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-contrib-uglify");

  // Internal Tasks.
  grunt.registerTask("build:tmpl", function () {
    var tmpl = buildTmpl("./notes/app/templates.html");
    grunt.file.write(
      "./notes/app/js/app/templates/templates.js",
      tmpl);
  });
  grunt.registerTask("build:vendor", [
    // TODO: Exclude Jasny until this is fixed.
    // See: https://github.com/jasny/bootstrap/issues/192
    //"clean:vendor",
    "copy:vendor",
    "uglify:vendor"
  ]);

  // Wrapper Tasks.
  grunt.registerTask("test:app",        ["mocha_phantomjs:app"]);
  grunt.registerTask("test:rest",       ["mocha_phantomjs:rest"]);
  grunt.registerTask("test:chaps-all",  ["mocha_phantomjs:chaps-all"]);
  grunt.registerTask("test:chaps",      ["mocha_phantomjs:chaps"]);
  grunt.registerTask("test",            ["mocha_phantomjs", "karma:fast"]);
  grunt.registerTask("check",           ["jshint", "test"]);
  grunt.registerTask("check:fast",      ["jshint", "karma:fast"]);

  grunt.registerTask("build",   ["build:tmpl", "jade:docs", "build:vendor"]);
  grunt.registerTask("default", ["build", "check"]);
};
