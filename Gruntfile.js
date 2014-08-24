var buildTmpl = require("./dev/build-templates");


// ----------------------------------------------------------------------------
// Globals
// ----------------------------------------------------------------------------
// Browserstack.
// See: https://github.com/browserstack/api
var BS_ENVS = {
  // Already tested in Travis.
  bs_firefox: {
    base: "BrowserStack",
    browser: "firefox",
    os: "Windows",
    os_version: "7"
  }
  // TODO: ENABLE.
  // bs_chrome: {
  //   base: "BrowserStack",
  //   browser: "chrome"
  // },
  // bs_safari: {
  //   base: "BrowserStack",
  //   browser: "safari",
  //   os: "OS X"
  //   os_version: "Lion"
  // },
  // bs_ie_9: {
  //   base: "BrowserStack",
  //   browser: "internet explorer",
  //   browser_version: 9.0,
  //   os: "Windows",
  //   os_version: "7"
  // },
  // bs_ie_10: {
  //   base: "BrowserStack",
  //   browser: "internet explorer",
  //   browser_version: 10.0,
  //   os: "Windows",
  //   os_version: "7"
  // },
  // bs_ie_11: {
  //   base: "BrowserStack",
  //   browser: "ie",
  //   browser_version: 11.0,
  //   os: "Windows",
  //   os_version: "7"
  // }
};

// SauceLabs tag.
var BS_BRANCH = process.env.TRAVIS_BRANCH || "local";
var BS_TAG = process.env.BROWSER_STACK_USERNAME + "@" + BS_BRANCH;

// ----------------------------------------------------------------------------
// Configuration
// ----------------------------------------------------------------------------
module.exports = function (grunt) {

  // Strip comments from JsHint JSON files.
  var _jshint = function (name) {
    if (!grunt.file.exists(name)) { return "{}"; }
    return JSON.parse(grunt.file.read(name).replace(/\/\/.*\n/g, ""));
  };

  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),

    bowerPath: "bower_components",
    vendorAppPath: "notes/app/js/lib",
    vendorTestPath: "notes/test/js/lib",

    notesPath: "notes",
    notesRestPath: "notes-rest",

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
      vendor: [
        "<%= vendorAppPath %>",
        "<%= vendorTestPath %>"
      ],
      "notes-rest": [
        "<%= notesRestPath %>/app/css",
        "<%= notesRestPath %>/app/js/app",
        "<%= notesRestPath %>/app/js/lib",
        "<%= notesRestPath %>/test/js/lib",
        "<%= notesRestPath %>/test/js/spec"
      ]
    },

    copy: {
      "vendor-app": {
        files: [
          {
            dest: "<%= vendorAppPath %>",
            expand: true,
            flatten: true,
            src: [
              "<%= bowerPath %>/jquery/dist/jquery.js",
              "<%= bowerPath %>/jquery/dist/jquery.min.js",
              "<%= bowerPath %>/json2/json2.js",
              "<%= bowerPath %>/underscore/underscore.js",
              "<%= bowerPath %>/backbone/backbone.js",
              "<%= bowerPath %>/backbone.localStorage/backbone.localStorage.js"
            ]
          },
          {
            dest: "<%= vendorAppPath %>/bootstrap",
            cwd: "<%= bowerPath %>/bootstrap/dist",
            expand: true,
            src: [
              "css/**",
              "fonts/**",
              "js/**"
            ]
          },
          {
            dest: "<%= vendorAppPath %>/bootstrap-jasny",
            cwd: "<%= bowerPath %>/bootstrap-jasny/dist",
            expand: true,
            src: ["**"]
          },
          {
            dest: "<%= vendorAppPath %>/backbone.localStorage.min.js",
            src: "<%= bowerPath %>/backbone.localStorage/" +
                 "backbone.localStorage-min.js"
          },
          {
            dest: "<%= vendorAppPath %>/showdown",
            cwd: "<%= bowerPath %>/showdown/src",
            expand: true,
            src: ["**"]
          }
        ]
      },
      "vendor-test": {
        dest: "<%= vendorTestPath %>",
        expand: true,
        flatten: true,
        src: [
          "<%= bowerPath %>/mocha/mocha.js",
          "<%= bowerPath %>/mocha/mocha.css",
          "<%= bowerPath %>/chai/chai.js",
          "<%= bowerPath %>/sinonjs/sinon.js",
          "<%= bowerPath %>/sinon-chai/lib/sinon-chai.js",
          "<%= bowerPath %>/blanket/dist/qunit/blanket.js",
          "<%= bowerPath %>/blanket/dist/qunit/blanket.min.js"
        ]
      },
      "notes-rest": {
        files: [
          {
            dest: "<%= notesRestPath %>",
            expand: true,
            cwd: "<%= notesPath %>",
            src: [
              "app/css/**",
              "app/js/app/**",
              "app/js/lib/**",
              "test/js/lib/**",
              "test/js/spec/**"
            ]
          }
        ]
      }
    },

    uglify: {
      "vendor-app": {
        files: {
          "<%= vendorAppPath %>/json2.min.js": [
            "<%= vendorAppPath %>/json2.js"
          ],
          "<%= vendorAppPath %>/underscore.min.js": [
            "<%= vendorAppPath %>/underscore.js"
          ],
          "<%= vendorAppPath %>/backbone.min.js": [
            "<%= vendorAppPath %>/backbone.js"
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
        reporters: ["mocha"],
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
        browsers: ["PhantomJS"]
      },
      ci: {
        singleRun: true,
        browsers: ["PhantomJS", "Firefox"]
      },
      all: {
        singleRun: true,
        browsers: ["PhantomJS", "Chrome", "Firefox", "Safari"]
      },
      dev: {
        // Invoke with `karma run` in another terminal.
        browsers: ["PhantomJS", "Chrome", "Firefox", "Safari"]
      },
      bs: {
        project: "Backbone.js Testing",
        name: "Karma JS tests",
        build: BS_TAG,
        captureTimeout: 0, // Pass through to BS.
        customLaunchers: BS_ENVS,
        browsers: Object.keys(BS_ENVS)
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
    "clean:vendor",
    "copy:vendor-app",
    "uglify:vendor-app",
    "copy:vendor-test"
  ]);
  grunt.registerTask("build:rest", [
    "clean:notes-rest",
    "copy:notes-rest"
  ]);

  // Wrapper Tasks.
  grunt.registerTask("test:app",        ["mocha_phantomjs:app"]);
  grunt.registerTask("test:rest",       ["mocha_phantomjs:rest"]);
  grunt.registerTask("test:chaps-all",  ["mocha_phantomjs:chaps-all"]);
  grunt.registerTask("test:chaps",      ["mocha_phantomjs:chaps"]);
  grunt.registerTask("test",            ["mocha_phantomjs", "karma:fast"]);
  grunt.registerTask("check",           ["jshint", "test"]);
  grunt.registerTask("check:fast",      ["jshint", "karma:fast"]);
  grunt.registerTask("default",         ["check"]);

  grunt.registerTask("build",   ["build:tmpl", "jade:docs", "build:vendor",
                                 "build:rest"]);
};
