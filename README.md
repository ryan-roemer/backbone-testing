# Backbone.js Testing
Sample apps, test suites, and ideas for Backbone.js.


## Introduction
This site provides materials and resources for testing [Backbone.js][backbone]
web applications. Created as a companion for the forthcoming
"Backbone.js Testing" book, we provide tests and code snippets for each book
chapter, as well as a a reference Backbone.js application -
"[Notes][notes_demo]" - that is used in various testing exercises.

The application technologies we cover include:

* **[jQuery](http://jquery.com/)**
* **[Underscore.js](http://underscorejs.org/)**
* **[Backbone.js](http://backbonejs.org/)**

And the test stack is comprised of:

* **[Mocha](http://visionmedia.github.com/mocha/)**
* **[Chai](http://chaijs.com/)**
* **[Sinon.JS](http://sinonjs.org/)**

All of the content here is very much a work in progress, with lots of likely
incidental errors and such. Bear with us as things evolve...


## Compatibility
The application and test samples should work for the following browser /
version combinations:

* Chrome: 7+
* Safari: 5+
* Firefox: 4+
* Internet Explorer: 9+

See the Chai [installation notes](http://chaijs.com/guide/installation/) for
more compatibility information. *Note* that the Chai `should` object
prototype extension is not compatible with IE 9 and lower.


## Notes App
"Notes" is a simple personal note manager, written in Backbone.js. We provide
two versions -- a "quick and easy" `localStorage` based application that works
in your browser with no additional setup, and a "classic" application with
a full REST backend.

### The Tour

**TODO: Write up tour and add screenshots.**

### LocalStorage App
The directory "`notes/app`" contains the standalone application, which uses
HTML5 [localStorage][ls] as a backing store. The application has a working
**[online demo][notes_demo]** as well as a full suite of
**[tests][notes_test]** that you can try out from this page.

*Note* that because the application uses `localStorage`, data is only persisted
to the specific browser and computer that you use with the application.

[notes_demo]: ./notes/app/index.html
[notes_test]: ./notes/test/test.html
[ls]: https://developer.mozilla.org/en-US/docs/DOM/Storage#localStorage

### Server-Backed App
An alternative version of the application uses
[MongoDB](http://www.mongodb.org/) instead of `localStorage` for notes data and
can be found in the "`notes-rest`" directory. The application is
served via a [Node.js](http://nodejs.org/)/[Express](http://expressjs.com/)
application located in "[notes-rest/server.js](./notes-rest/server.js)".

The server application requires [Node.js](http://nodejs.org/download/) and
[MongoDB](http://docs.mongodb.org/manual/installation/) installations.
Once you have these installed, you can change into the root of this repository
and install all of the project libraries:

    $ npm install

To run the sample server application, you will need two terminal windows.
In the first window, start up MongoDB:

    $ npm run-script mongo-start

In the second window, start up the Express server:

    $ npm start

And from there you can navigate a browser to:
[http://127.0.0.1:4321/app/](http://127.0.0.1:4321/app/)
and see the application running. Note that you can control several application
options by setting console environment variables:

* `MONGO_ADDR`: MongoDB host address (default `127.0.0.1`).
* `MONGO_PORT`: MongoDB port (default `27027`).
* `ADDR`: Express server host address (default `127.0.0.1`).
* `PORT`: Express server port (default `4321`).

For example:

    $ export PORT=4323; npm start

runs the server on port 4323 instead of 4321 (the default).


## Chapter Examples
The examples for each chapter are provided in the "chapters" directory,
separated by number. We also provide a driver page for (nearly) all of
[the non-application tests](./chapters/test.html).

### Chapter 1: Setting up a Test Infrastructure

* **[Trying out the test libraries](./chapters/01/test/test.html)**: Some
  first basic unit tests using Mocha, Chai, and SinonJS.
  * [hello.spec.js](./chapters/01/test/js/spec/hello.spec.js)

* **[Test Failures](./chapters/01/test/test-failure.html)**:
  Different types of test failures.
  * [failure.spec.js](./chapters/01/test/js/spec/failure.spec.js)

* **[Test Timing](./chapters/01/test/test-timing.html)**:
  Tests that take different times, which Mocha annotates for "medium"
  and "slow" tests. Also has one test timeout failure.
  * [timing.spec.js](./chapters/01/test/js/spec/timing.spec.js)

### Chapter 2: Creating a Backbone.js Application Test Plan

* **[Tests](./chapters/02/test/test.html)**:
  Initial simple tests for a Backbone.js application.
  * [namespace.spec.js](./chapters/02/test/js/spec/namespace.spec.js):
    Verifies [namespace](./notes/app/js/app/namespace.js)
    objects are correctly setup.
  * [models/note.spec.js](./chapters/02/test/js/spec/models/note.spec.js):
    Tests the application model
    [`App.Models.Note`](./notes/app/js/app/models/note.js).

### Chapter 3: Test Assertions, Specs, and Suites

* **[BDD Interface](./chapters/03/test/test-bdd.html)**: Tests using
  [Mocha](http://visionmedia.github.com/mocha/#bdd-interface)
  and [Chai](http://chaijs.com/api/bdd/) **BDD** styles.
  * [bdd.spec.js](./chapters/03/test/js/spec/bdd.spec.js)

* **[TDD Interface](./chapters/03/test/test-tdd.html)**: Tests using Mocha
  **[TDD](http://visionmedia.github.com/mocha/#tdd-interface)** and
  Chai [`assert`](http://chaijs.com/api/assert/) styles.
  * [tdd.spec.js](./chapters/03/test/js/spec/tdd.spec.js)

* **[Chai Assertions](./chapters/03/test/test-chai.html)**: Tests using
  a variety of [Chai BDD](http://chaijs.com/api/bdd/) assertions.
  * [chai-chains.spec.js](./chapters/03/test/js/spec/chai-chains.spec.js):
  Language chains.
  * [chai-values.spec.js](./chapters/03/test/js/spec/chai-values.spec.js):
  Value properties.
  * [chai-comparisons.spec.js](./chapters/03/test/js/spec/chai-comparisons.spec.js):
  Comparison functions.
  * [chai-objects.spec.js](./chapters/03/test/js/spec/chai-objects.spec.js):
  Object and array assertions.
  * [chai-errors.spec.js](./chapters/03/test/js/spec/chai-errors.spec.js):
  Exception handling.

* **[Mocha `only`](./chapters/03/test/test-only.html)**: Tests using the Mocha
  `only` test modifier to run a single spec.
  * [mocha-only.spec.js](./chapters/03/test/js/spec/mocha-only.spec.js)

* **[Mocha `skip`](./chapters/03/test/test-skip.html)**: Tests using the Mocha
  `skip` test modifier to skip one or more specs.
  * [mocha-skip.spec.js](./chapters/03/test/js/spec/mocha-skip.spec.js)

* **[Tests](./chapters/03/test/test.html)**:
  Continue tests for the "Notes" Backbone.js application.
  * [collections/notes.spec.js](./chapters/03/test/js/spec/collections/notes.spec.js):
    Tests the collection [`App.Collections.Notes`](./notes/app/js/app/collections/notes.js).
  * [views/note-view.spec.js](./chapters/03/test/js/spec/views/note-view.spec.js):
    Tests the view [`App.Views.NoteView`](./notes/app/js/app/views/note-view.js),
    which renders model [Markdown](http://daringfireball.net/projects/markdown/)
    data into HTML.

### Chapter 4: Test Spies

**TODO: Update all chapters tests.**
**TODO: Continue links to all chapter examples.**


## Automated Tests
All of the tests for the Notes application and the chapter
samples can be run in the [PhantomJS][phantom] headless WebKit
engine. Simply install the Node.js dependencies:

    $ npm install

and [install PhantomJS][phantom-install] on your development machine.

From there, you can use the `mocha-phantomjs` binary to run any HTML test
driver page from the command line, e.g.:

    $ mocha-phantomjs notes/test/test.html

As a helper, the following script command will run nearly all of the
Notes application and chapter unit tests:

    $ npm run-script test


## Additional Tools
There are many additional testing libraries and plugins specifically suited
to testing Backbone.js applications beyond the core test stack we use in the
application and chapter examples above.

### Chai
Chai has a rich [plugin](http://chaijs.com/plugins) ecosystem, with libraries
that enhance the core Chai assertion statement library, provide more specific
failure messages, and make application behavior easier to express.

* **[chai-backbone](http://chaijs.com/plugins/chai-backbone)**: Adds
  Backbone.js specific assertions such as `expect(model).to.trigger()` and
  `expect("hash/fragment").to.route.to()`.
* **[chai-jquery](http://chaijs.com/plugins/chai-jquery)**: Adds
  assertions for jQuery functions and attributes like `data()`, `class()`,
  `id()`, and `hidden()`.
* **[sinon-chai](http://chaijs.com/plugins/sinon-chai)**: Allows Chai to make
  Sinon.JS assertions like `expect(spy).to.have.been.calledWith(42)` instead
  of the Sinon.JS native `sinon.assertCalledWith(spy, 42)`.


## Libraries & Versions
All frontend libraries used in this repository for the sample apps and chapter
examples are provided in the "vendor" directory.

**TODO: Update all library versions.**

The core Backbone.js components used are:

* **[jQuery][jquery]**: `1.9.1`
* **[Underscore.js][underscore]**: `1.4.4`
* **[Backbone.js][backbone]**: `0.9.10`
* **[Backbone.localStorage][backbone-ls]**: `1.1.0`
* **[JSON][json_js]**: *For older browsers*

The sample Notes application also uses:

* **[Twitter Bootstrap][bootstrap]**: `2.3.0`
* **[Showdown][showdown]**: `0.3.1`

The frontend test libraries we use are:

* **[Mocha][mocha]**: `1.8.1`
* **[Chai][chai]**: `1.5.0`
* **[Sinon.JS][sinon]**: `1.6.0`

The test plugins include:

* **[Mocha PhantomJS][mocha-phantom]**: `2.0.0`


## Licenses
All code not otherwise specified is Copyright 2013 Ryan Roemer.
Released under the [MIT](./LICENSE.txt) License.

This repository contains various libraries from other folks, and are licensed
as follows:

* [Backbone.js][backbone] is Copyright Jeremy Ashkenas and licensed under the
  [MIT](https://github.com/documentcloud/backbone/blob/master/LICENSE) license.

* [Underscore.js][underscore] is Copyright Jeremy Ashkenas and licensed under
  the [MIT](https://github.com/documentcloud/underscore/blob/master/LICENSE)
  license.

* [jQuery][jquery] is Copyright jQuery Foundation and licensed under the
  [MIT](https://github.com/jquery/jquery/blob/master/MIT-LICENSE.txt) license.

* [Backbone.localStorage][backbone-ls] is Copyright Jerome Gravel-Niquet and
  licensed under the MIT license.

* [JSON][json_js] is Public Domain software created by Douglas Crockford.

* [Mocha][mocha] is Copyright TJ Holowaychuk and licensed under the
  [MIT](https://github.com/visionmedia/mocha/blob/master/LICENSE) license.

* [Chai][chai] is Copyright Jake Luer and licensed under the MIT license.
  [BSD](https://github.com/cjohansen/Sinon.JS/blob/master/LICENSE) license.

* [Sinon.JS][sinon] is Copyright Christian Johansen and licensed under the
  [BSD](https://github.com/cjohansen/Sinon.JS/blob/master/LICENSE) license.

* [Twitter Bootstrap][bootstrap] is Copyright Twitter, Inc. and licensed under
  the [Apache v2.0](https://github.com/twitter/bootstrap/blob/master/LICENSE)
  license.

* [Showdown][showdown] is Copyright Corey Innis and licensed under the
  [BSD](https://github.com/coreyti/showdown/blob/master/license.txt) license.

* [Mocha PhantomJS][mocha-phantom] is Copyright Ken Collins and licensed under the
  [MIT](https://github.com/metaskills/mocha-phantomjs/blob/master/MIT-LICENSE)
  license.

[bootstrap]: https://github.com/twitter/bootstrap
[jquery]: https://github.com/jquery/jquery
[json_js]: https://github.com/douglascrockford/JSON-js
[mocha]: https://github.com/visionmedia/mocha
[mocha-phantom]: https://github.com/metaskills/mocha-phantomjs
[phantom]: http://phantomjs.org/
[phantom-install]: http://phantomjs.org/download.html
[chai]: https://github.com/chaijs/chai
[underscore]: https://github.com/documentcloud/underscore
[backbone]: https://github.com/documentcloud/backbone
[backbone-ls]: https://github.com/jeromegn/backbone.localStorage
[sinon]: https://github.com/cjohansen/Sinon.JS
[showdown]: https://github.com/coreyti/showdown


## Development
For those who would like to get under the hood, or help out with the
application or test examples.

### Scripts, Commands
For pretty much everything, you will need to install
[PhantomJS][phantom-install], a Node.js environment, and
the development NPM dependencies:

    $ npm install

From there, there are various NPM script helpers for style checking and tests:

    # Run style checks for server, client, and both.
    $ npm run-script style-server
    $ npm run-script style-client
    $ npm run-script style

    # Run headless tests for the application, individual chapters, all chapters
    # as one big test, and all of these together.
    $ npm run-script test-app
    $ npm run-script test-chaps
    $ npm run-script test-chaps-all
    $ npm run-script test

    # Run all style checks and headless tests.
    $ npm run-script check

The file "README.md" is transformed from markdown into the HTML page
"index.html", and can be compiled once, or watched for changes with the
following commands.

    $ npm run-script docs
    $ npm run-script docs-watch

### Contributions
Bugs, issues and fixes for any of the application or test code examples are
most welcome. Please file a GitHub
[issue](https://github.com/ryan-roemer/backbone-testing/issues) or pull request
for any changes. Pull requests should be able to pass

    $ npm run-script check

without any errors.
