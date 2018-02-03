# Backbone.js Testing
Apps, suites, and examples for Backbone.js test development.


## Introduction
This site provides materials and resources for developing and testing
[Backbone.js][backbone] web applications. All of the application and test
examples for the book **[Backbone.js Testing][packt]** can be found here,
grouped by chapter.
We also provide a reference Backbone.js application -
**[Notes][notes_demo]** - for creating and viewing notes, which we use
throughout the examples in the book.

The core set of Backbone.js application technologies we cover includes:

* **[jQuery](http://jquery.com/)**
* **[Underscore.js](http://underscorejs.org/)**
* **[Backbone.js](http://backbonejs.org/)**

We write a test infrastructure built on the following (fantastic) test
libraries.

* **[Mocha](http://mochajs.org/)**
* **[Chai](http://chaijs.com/)**
* **[Sinon.JS](http://sinonjs.org/)**

The source code for everything is available from the project's
[GitHub repository][gh]. If you find any errors or issues in content or
code, please file a [bug report][gh_bugs] and we'll fix things up in short
order. For those interested in extending our testing examples or helping
out, please see our [contribution and development guide][contrib].

[gh]: https://github.com/ryan-roemer/backbone-testing/
[gh_bugs]: https://github.com/ryan-roemer/backbone-testing/issues
[contrib]: #development

## Book
**[Backbone.js Testing][packt]** by [Ryan Roemer][roemer] walks through the
fundamentals of test-driven development for Backbone.js applications. All of
the code samples are directly used in the book - it is essentially your
narrative guide to this repository.

[![Book Cover](./doc/img/book/book-cover.jpg)][packt]

A short description of the book from the [Packt Publishing][packtpub]
[website][packt]:

> Frontend web applications are soaring in popularity and the
> Backbone.js library is leading this charge with a modular,
> lightweight approach for organizing JavaScript web applications. At
> the same time, testing client-side JavaScript and Backbone.js
> programs remains a difficult and tedious undertaking.
>
> Backbone.js Testing brings sensible practices and current techniques
> to the challenges of Backbone.js test development. The book
> introduces fundamental testing concepts, comprehensive test
> infrastructure design, and practical exercises to easily and
> systematically test modern JavaScript web applications.
>
> The book progresses from Mocha test suites and Chai assertions to
> advanced test mocks and stubs with Sinon.JS. The requisite libraries
> and utilities are introduced with in-depth examples and best
> practices for integration with your applications. The book guides
> you through the test planning and implementation processes for your
> application models, views, routers, and other Backbone.js
> components.
>
> Backbone.js Testing gives you the tools, examples, and assistance to
> test your Backbone.js web applications thoroughly, quickly, and with
> confidence.

[roemer]: http://loose-bits.com/about.html
[packtpub]: http://www.packtpub.com/
[packt]: http://www.packtpub.com/backbonejs-testing/book

## Formidable Labs

Ryan and the team at [Formidable Labs][formidable] assist developers,
from startups to Fortune 500 companies, with all aspects of
Backbone.js web application and test development. At Formidable, we
lead high-impact training sessions, build out some of the world's
largest Backbone.js applications, and help get new projects of any
size off the ground.

[![Formidable Labs](./doc/img/logo/formidable.png)][formidable]

Once you finish **[Backbone.js Testing][packt]**, please reach out
to us -- we'd love to accelerate your Backbone.js development
and education.

[formidable]: http://formidablelabs.com

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
**[Notes][notes_demo]** is a simple personal note manager, written in
Backbone.js. We provide two versions - a "quick and easy" `localStorage` based
application that works in your browser with no additional setup, and a
"classic" application with a full REST backend.

### The Tour
The Notes application home page lists existing notes (by creation date), and
provides a form field to create a new note with a title. A filter field is
available in the menu bar to limit the list of displayed notes by title.

![Notes List](./doc/img/notes/notes-list.png)

Clicking on the edit icon brings us to the single note view, with a simple
form editor for the title and text body fields of the note. The body of a
note is written using [Markdown][markdown] formatting.

![Edit Note](./doc/img/notes/note-edit.png)

Clicking on the view menu tab switches us to the viewing pane, which renders
the note's Markdown and produces our displayed note.

![View Note](./doc/img/notes/note-view.png)

The Notes application is written using [Bootstrap][bootstrap]'s responsive
libraries and should render fine on mobile devices, tablets, and pretty much
anything else.

[markdown]: http://daringfireball.net/projects/markdown/

### LocalStorage App
The directory "`notes/app`" contains the standalone application, which uses
HTML5 [localStorage][ls] as a backing store. Some useful links to get you
started:

* **[App demo][notes_demo]**: Online demo for you to try out. Because the app
  saves to local storage, your notes will be preserved across browser sessions
  (for the same browser).
* **[Test Suite][notes_test]**: The full Mocha / Chai / Sinon.JS test suite run
  in a single driver page.
* **[Code Coverage][notes_cov]**: Runs the above test suite with full
  browser-side code coverage thanks to the awesome
  [Blanket.js](http://blanketjs.org) coverage library.

[notes_demo]: ./notes/app/index.html
[notes_test]: ./notes/test/test.html
[notes_cov]: ./notes/test/coverage.html
[ls]: https://developer.mozilla.org/en-US/docs/DOM/Storage#localStorage

### Server-Backed App
An alternative version of the application uses
[MongoDB](http://www.mongodb.org/) instead of `localStorage` for notes data and
can be found in the "`notes-rest`" directory. The application is
served via a [Node.js](http://nodejs.org/)/[Express](http://expressjs.com/)
application located in "[notes-rest/server.js](./notes-rest/server.js)".

Although we don't provide an online demo application, the full application
**[test suite][notes_rest_test]** is available online using Sinon.JS
[fake servers](http://sinonjs.org/docs/#server) to fake out the requirement
of having a real backend MongoDB server for the `App.Collections.Notes`
tests. The test suite is nearly identical to the localStorage application tests
for all of the other tests.

[notes_rest_test]: ./notes-rest/test/test.html

The server requires [Node.js](http://nodejs.org/download/) and
[MongoDB](http://docs.mongodb.org/manual/installation/) installations.
Once you have these installed, you can change into the root of this repository
and install all of the project libraries:

    $ npm install

To run the sample server application, you will need two terminal windows.
The binary `mongod` *must* be available from the shell, so may need to
augment your `PATH` variable. For example, on Windows, the following was
needed for some installations:

    # May need to run console as Administator for just this command.
    $ setx PATH "%PATH%;C:\Program Files\MongoDB 2.6 Standard\bin" /M

In the first window, start up MongoDB:

    # Linux / Mac
    $ npm run-script mongo-start

    # Windows (with `mongod` available from `PATH`)
    $ npm run-script mongo-start-win

In the second window, start up the Express server:

    $ npm start

And from there you can navigate a browser to:

* [http://127.0.0.1:4321/app/](http://127.0.0.1:4321/app/):
  Use the MongoDB-backed application.
* [http://127.0.0.1:4321/test/test.html](http://127.0.0.1:4321/test/test.html):
  Run the tests from the live server.

Note that you can control several application options by setting
console environment variables:

* `MONGO_ADDR`: MongoDB host address (default `127.0.0.1`).
* `MONGO_PORT`: MongoDB port (default `27027`).
* `ADDR`: Express server host address (default `127.0.0.1`).
* `PORT`: Express server port (default `4321`).

For example, on a Mac:

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
    * [namespace.spec.js](./notes/test/js/spec/namespace.spec.js):
      Verifies [namespace](./notes/app/js/app/namespace.js)
      objects are correctly setup.
    * [models/note.spec.js](./notes/test/js/spec/models/note.spec.js):
      Tests the application model
      [`App.Models.Note`](./notes/app/js/app/models/note.js).

### Chapter 3: Test Assertions, Specs, and Suites

* **[BDD Interface](./chapters/03/test/test-bdd.html)**: Tests using
  [Mocha](https://mochajs.org/#bdd)
  and [Chai](http://chaijs.com/api/bdd/) **BDD** styles.
    * [bdd.spec.js](./chapters/03/test/js/spec/bdd.spec.js)

* **[TDD Interface](./chapters/03/test/test-tdd.html)**: Tests using Mocha
  **[TDD](https://mochajs.org/#tdd)** and
  Chai [`assert`](http://chaijs.com/api/assert/) styles.
    * [tdd.js](./chapters/03/test/js/test/tdd.js)

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

* **[Mocha Pending Tests](./chapters/03/test/test-pending.html)**: A basic
  skeleton suite with empty specs (e.g., no test callback), which are all in
  "pending" state during a test run. A great test development practice is to
  declare specs describing behavior without functions during the initial
  design phanse. The specs can later be implemented in parallel with the
  underlying application components, ensuring that the desired behavior is
  correctly implemented.
    * [notes-pending.spec.js](./chapters/03/test/js/spec/collections/notes-pending.spec.js)

* **[Tests](./chapters/03/test/test.html)**:
  Continue tests for the **[Notes][notes_demo]** Backbone.js application.
    * [collections/notes.spec.js](./notes/test/js/spec/collections/notes.spec.js):
      Tests the collection [`App.Collections.Notes`](./notes/app/js/app/collections/notes.js).
    * [views/note-view.spec.js](./notes/test/js/spec/views/note-view.spec.js):
      Tests the view [`App.Views.NoteView`](./notes/app/js/app/views/note-view.js),
      which renders model [Markdown][markdown]
      data into HTML.

### Chapter 4: Test Spies

* **[Sinon.JS Spies](./chapters/04/test/test-sinon.html)**: Various test uses
  for Sinon.JS [spies](http://sinonjs.org/docs/#spies).
    * [sinon.spec.js](./chapters/04/test/js/spec/sinon.spec.js)

* **[Tests](./chapters/04/test/test.html)**:
  Tests for the **[Notes][notes_demo]** Backbone.js application that use
  Sinon.JS spies.
    * [views/note-nav.spec.js](./notes/test/js/spec/views/note-nav.spec.js):
      Tests the [`App.Views.NoteNav`](./notes/app/js/app/views/note-nav.js)
      view, which mediates events for the single page navigation menu bar.
    * [views/note.spec.js](./notes/test/js/spec/views/note.spec.js):
      Tests the [`App.Views.Note`](./notes/app/js/app/views/note.js)
      view, which wraps all of the other single note views and model.

### Chapter 5: Test Stubs and Mocks

* **[Sinon.JS Stubs](./chapters/05/test/test-stubs.html)**: Tests using
  Sinon.JS [stubs](http://sinonjs.org/docs/#stubs).
    * [stubs.spec.js](./chapters/05/test/js/spec/stubs.spec.js)

* **[Sinon.JS Mocks](./chapters/05/test/test-mocks.html)**: Tests using
  Sinon.JS [mocks](http://sinonjs.org/docs/#mocks).
    * [mocks.spec.js](./chapters/05/test/js/spec/mocks.spec.js)

* **[Tests](./chapters/05/test/test.html)**:
  Tests for the **[Notes][notes_demo]** Backbone.js application with Sinon.JS
  stubs and mocks.
    * [views/notes-item.spec.js](./notes/test/js/spec/views/notes-item.spec.js):
      Tests the [`App.Views.NotesItem`](./notes/app/js/app/views/notes-item.js)
      view, which displays a table row for a single note in the "all notes"
      list.
    * [routers/router.spec.js](./chapters/05/test/js/spec/routers/router.spec.js):
      Tests an **abbreviated** version of the
      [`App.Routers.Router`](./chapters/05/test/js/spec/routers/router.js)
      router, implementing the route matching logic, but omitting the actual
      view creation and display. The tests that we create a good starting point
      for testing routers, but please see the Notes application source
      for the
      [real `App.Routers.Router` source](./notes/app/js/app/routers/router.js)
      and [full "routers/router.spec.js"](./notes/test/js/spec/routers/router.spec.js)
      file.


### Chapter 6: Automated Web Testing
We don't introduce any new tests in Chapter 6, instead focusing on automating
all of the application and chapter tests we have provided in this respository.
See the next section for a discussion of test automation with
[PhantomJS][phantom].


## Automated Tests
All of the tests for the Notes application and the chapter
samples can be run in the [PhantomJS][phantom] headless WebKit
engine and/or any local browsers.

Simply install the Node.js dependencies:

    $ npm install

which will place an internal PhantomJS binary in
"./node_modules/.bin/phantomjs" as well as all other necessary libraries.

### Mocha-PhantomJS
From there, you can use the `mocha-phantomjs` binary to run any HTML test
driver page from the command line, e.g.:

    $ ./node_modules/.bin/mocha-phantomjs notes/test/test.html

As a helper, the following script command will run nearly all of the
Notes application and chapter unit tests:

    $ npm test

### Karma
[Karma][karma] is a multi-browser command-line test runner. It can run tests
from any combination of PhantomJS and any locally installed browsers (that
have a Karma test runner implemented) -- like Chrome and Firefox.

#### Single Invocation
We use a Grunt plugin `grunt-karma` to help configure Karma for the tests in
this project. You can run all of the tests using PhantomJS alone in Karma
with the following command:

    $ node_modules/.bin/grunt karma:fast

#### Development Mode
Alternately, you can switch to "development mode" which keeps the Karma test
engine running (which we've configured to use PhantomJS, Chrome and Firefox)
with:

    $ node_modules/.bin/grunt karma:dev

This process then waits for test invocations, which you can do by opening a
*second terminal* in the same directory and typing:

    $ ./node_modules/.bin/karma run

This two-terminal approach saves you the overhead of firing up all of the
browser environments in which to run the test suites.

### Travis Continuous Integration
We run all of these tests automatically using (the awesome) [Travis CI][trav]
continuous integration service. Travis watches the GitHub repository containing
this project and when it detects the code has changed, launches new builds
and invokes the PhantomJS tests above.

Travis even provides a convenient image status indicator, that we display
below, so that we can display the *always current* build status of our code.
Additionally, we run our Karma tests through a coverage reporter that uploads
to [Coveralls][cov], so we have a coverage report as well:

[![Build Status][trav_img]][trav_site]
[![Coverage Status][cov_img]][cov_site]

Setting all of this up is as simple as adding a Travis configuration file
".travis.yml" as follows:

    language: node_js
    node_js:
      - 0.10

This instructs Travis to test out the latest Node.js versions for v0.8 and
v0.10. By default, Travis already has PhantomJS installed and will run
`npm install` and `npm test` on any Node.js project, which conveniently
sets up and invokes all of our PhantomJS tests.

Our actual "[.travis.yml](./.travis.yml)" file runs different commands than
the default `npm test` to add things like style checking. But, the overall
Travis configuration is essentially the same.

We also do multi-browser testing of the frontend code thanks to generous
donations of VM time from [Sauce Labs][sauce] and [BrowserStack][bs].
Here's our [build matrix][sauce_site]:

[![Sauce Test Status][sauce_img]][sauce_site]

[trav]: https://travis-ci.org/
[trav_img]: https://travis-ci.org/ryan-roemer/backbone-testing.svg
[trav_site]: https://travis-ci.org/ryan-roemer/backbone-testing
[trav_cfg]: ./.travis.yml
[cov]: https://coveralls.io
[cov_img]: https://img.shields.io/coveralls/ryan-roemer/backbone-testing.svg
[cov_site]: https://coveralls.io/r/ryan-roemer/backbone-testing
[sauce]: https://saucelabs.com
[sauce_img]: https://saucelabs.com/browser-matrix/backbone-testing.svg
[sauce_site]: https://saucelabs.com/u/backbone-testing
[bs]: https://www.browserstack.com

## Additional Tools
There are many additional testing libraries and plugins specifically suited
to testing Backbone.js applications beyond the core test stack we use in the
application and chapter examples above.

### Chai
Chai has a rich [plugin](http://chaijs.com/plugins) ecosystem, with libraries
that enhance the core Chai assertion statement library, provide more specific
failure messages, and make application behavior easier to express.

Plugins that are used in some examples:

* **[sinon-chai](http://chaijs.com/plugins/sinon-chai)**: Allows Chai to make
  Sinon.JS assertions like `expect(spy).to.have.been.calledWith(42)` instead
  of the Sinon.JS native `sinon.assert.calledWith(spy, 42)`.

Additional plugins not used in the examples:

* **[chai-jq](http://formidablelabs.github.io/chai-jq/)**: Adds
  assertions for jQuery functions and properties like `$class()`,
  `$attr()`, and `$hidden`.
* **[chai-jquery](http://chaijs.com/plugins/chai-jquery)**: An alternate
  jQuery assertion library with methods including `data()`, `class()`,
  `id()`, and `hidden()`.
* **[chai-backbone](http://chaijs.com/plugins/chai-backbone)**: Adds
  Backbone.js specific assertions such as `expect(model).to.trigger()` and
  `expect("hash/fragment").to.route.to()`.


## Libraries & Versions
All frontend libraries used in this repository for the sample apps and chapter
examples are provided in the "vendor" directory.

Note that this repository has been updated since the publication of
**[Backbone.js Testing][packt]** on July 12, 2013. The enumerated versions of
all third party libraries are indicated by the most current version in the
repository with the published version noted in parenthesis when different.

The core Backbone.js components used are:

* **[jQuery][jquery]**: `2.1.0` (*2.0.2*)
* **[Underscore.js][underscore]**: `1.6.0` (*1.4.4*)
* **[Backbone.js][backbone]**: `1.1.2` (*1.0.0*)
* **[Backbone.localStorage][backbone-ls]**: `1.1.7` (*1.1.5*)
* **[JSON][json_js]**: *For older browsers*

The sample Notes application also uses:

* **[Twitter Bootstrap][bootstrap]**: `3.1.1` (*2.3.2*)
* **[Showdown][showdown]**: `0.3.1`

The frontend test libraries we use are:

* **[Mocha][mocha]**: `1.18.2` (*1.9.0*)
* **[Chai][chai]**: `1.9.1` (*1.7.1*)
* **[Sinon.JS][sinon]**: `1.9.0` (*1.7.3*)

The test plugins include:

* **[Sinon-Chai][sinon-chai]**: `2.4.0`
* **[Mocha-PhantomJS][mocha-phantom]**: `3.2.0` (*2.0.3*)

### Notes

#### Published Versions and Code

The repository was tagged with git as `published-1.0` for the code samples
that are shipped with the book as it went to press. To check out the published
version in this repository, type:

    $ git checkout tags/published-1.0

This will switch all libraries, application code, and tests to the version that
directly matches the book.

#### Mocha-PhantomJS and PhantomJS

As of v3.x.x and higher, Mocha-PhantomJS requires PhantomJS v1.9.1 or higher.

#### Mocha-PhantomJS and Mocha Compatibility

Mocha version 1.10.0 and 1.11.0 introduced incompatibilities with
Mocha-PhantomJS. Modern versions of both libraries are now compatible, e.g.,
Mocha v1.12.0+ and Mocha-PhantomJS v3.1.0+.

For this historically minded, the evolution of this issue is documented in the
following tickets:

* [Mocha #770](https://github.com/mochajs/mocha/issues/770)
* [Mocha-PhantomJS #58](https://github.com/metaskills/mocha-phantomjs/issues/58)

**[Backbone.js Testing][packt]** shipped with Mocha v1.9.0 and Mocha-PhantomJS
v2.0.3 to avoid the issue.

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
  [MIT](https://github.com/mochajs/mocha/blob/master/LICENSE) license.

* [Chai][chai] is Copyright Jake Luer and licensed under the
  [BSD](https://github.com/cjohansen/Sinon.JS/blob/master/LICENSE) license.

* [Sinon-Chai][sinon-chai] is Copyright Domenic Denicola and licensed under
  what we will politely approximate to a
  "[public domain](https://github.com/domenic/sinon-chai/blob/master/LICENSE.txt)"
  license.

* [Sinon.JS][sinon] is Copyright Christian Johansen and licensed under the
  [BSD](https://github.com/cjohansen/Sinon.JS/blob/master/LICENSE) license.

* [Twitter Bootstrap][bootstrap] is Copyright Twitter, Inc. and licensed under
  the [Apache v2.0](https://github.com/twitter/bootstrap/blob/master/LICENSE)
  license.

* [Jasny Bootstrap][jasny-bootstrap] is Copyright Twitter, Inc. and Jasny BV
  and licensed under the
  [Apache v2.0](https://github.com/jasny/bootstrap/blob/master/LICENSE)
  license.

* [Showdown][showdown] is Copyright Corey Innis and licensed under the
  [BSD](https://github.com/coreyti/showdown/blob/master/license.txt) license.

* [Mocha-PhantomJS][mocha-phantom] is Copyright Ken Collins and licensed under the
  [MIT](https://github.com/metaskills/mocha-phantomjs/blob/master/MIT-LICENSE)
  license.

* [Blanket.js][blanket] is Copyright Alex Seville and licensed under the
  [MIT](https://github.com/alex-seville/blanket/blob/master/LICENSE-MIT)
  license.

[bootstrap]: https://github.com/twitter/bootstrap
[jasny-bootstrap]: https://github.com/jasny/bootstrap/
[jquery]: https://github.com/jquery/jquery
[json_js]: https://github.com/douglascrockford/JSON-js
[grunt]: http://gruntjs.com/
[mocha]: http://mochajs.org/
[mocha-phantom]: https://github.com/metaskills/mocha-phantomjs
[phantom]: http://phantomjs.org/
[karma]: http://karma-runner.github.io/
[chai]: https://github.com/chaijs/chai
[sinon-chai]: https://github.com/domenic/sinon-chai
[underscore]: https://github.com/documentcloud/underscore
[backbone]: https://github.com/documentcloud/backbone
[backbone-ls]: https://github.com/jeromegn/backbone.localStorage
[sinon]: https://github.com/cjohansen/Sinon.JS
[showdown]: https://github.com/coreyti/showdown
[blanket]: https://github.com/alex-seville/blanket


## Development
For those who would like to get under the hood, or help out with the
application or test examples.

### Scripts, Commands
For pretty much everything, you will need to install a Node.js environment, and
the development NPM dependencies:

    $ npm install

From there, there are various [Grunt][grunt] script helpers for style checking
and tests:

    # Run style checks for server, client, and both.
    $ node_modules/.bin/grunt jshint:server
    $ node_modules/.bin/grunt jshint:client
    $ node_modules/.bin/grunt jshint

    # Run headless tests for the application, individual chapters, all chapters
    # as one big test, and all of these together.
    $ node_modules/.bin/grunt test:app
    $ node_modules/.bin/grunt test:rest
    $ node_modules/.bin/grunt test:chaps
    $ node_modules/.bin/grunt test:chaps-all
    $ node_modules/.bin/grunt test

    # Run all style checks and headless tests.
    $ node_modules/.bin/grunt check

The file "README.md" is transformed from markdown into the HTML page
"index.html", and can be compiled once, or watched for changes with the
following commands.

    $ node_modules/.bin/grunt jade:docs
    $ node_modules/.bin/grunt watch:docs

### Vendor Libs, Syncing
We internally use bower to get / upgrade our vendor libraries. To update these,
do the following:

    $ node_modules/.bin/bower install
    $ node_modules/.bin/grunt build:vendor

We internall synchronize the `notes` application and test files to `notes-rest`,
overwriting the latter. To do this:

    $ node_modules/.bin/grunt build:notes-rest

**Note**: This **overwrites** files in `notes-rest`, so don't invoke this if
you intend to change those files!

Finally, we have a lot of other builds (templates, docs, etc), that are all
aggregated as part of:

    $ node_modules/.bin/grunt build

in addition to the tasks described above.


### Contributions
Bugs, issues and fixes for any of the application or test code examples are
most welcome. Please file a GitHub
[issue](https://github.com/ryan-roemer/backbone-testing/issues) or pull request
for any changes. Pull requests should be able to pass

    $ node_modules/.bin/grunt check

without any errors.
