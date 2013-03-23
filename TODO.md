# Backbone.js Testing
Sample apps, test suites, and ideas for Backbone.js.

## Tasks
Things to do before going live.

### Current
* **App Tour**: Actually add in the screenshots, etc. Also make sure renders
  images correctly on GitHub page.

* **CSS**: The sidenav has some extra white on IE10. Whited out in affix mode
  now, but there's still something wrong going on.

* **Node v0.10.x**: Test everything against this.

* **Code Coverage**: Integrate into phantom tests. (jscoverage) + install.
* **Symlinks**: Hone down to what's *actually* needed for chaps 02, 03, on.


## Notes
### Guidelines
* **Code Width**: Let's go for 70 chars (72 looks available in some books).
* **VirtualBox**: Host OS is at: 10.0.2.2:4321 (app), 10.0.2.2:4322 (site).


## Content
### Readme
* **Introduction**: Add intro more tailored to book and with actual
  information.

* **Libraries**: Update various versions for:
  * Public vendor libraries.
  * NPM package.json libraries.

* **Licenses**: Review for any needed additions.

* **Windows**:
  * **Downloads**: Instruct to download from the Packt site (my zipball
    verified with real files).
  * Possiblyx need polyfill libraries.
  * Test out all code samples on a Windows machine.

### Book Page
* Create a "book.md" page with a TOC. Or, maybe just a link.


## Check / Retrofit
* Auto-TODOs: Run and clear `npms todo`.
* All TODOs in "notes/", "notes-rest/", "chapters/".
* Replace `should()` with `expect()`...


## Browser Compatibility
* **Browsers**: Test in:
  * Chrome
  * Safari
  * Firefox
  * Win/IE


## After Live
* **Travis CI**: Hook up (w/ PhantomJS)
* **Google Analytics**: Verify working. (Maybe post-publish).
* **Absolute Links**: Retrofit relative links w/ "http://backbone-testing.com/"
  so that the GitHub README page works (sigh).

## Before Final
* Clear all TODOs everywhere (code included, and especially in README.md).
* JSLint HTML JS code. (`npm run-script style`).

* **UI Design**: Retrofit the UI design with something much better looking.
* **Prettify**: Add prettify.js to the code samples in the index.html page.

* **Library Versions**: Review and upgrade everything.

* **Package.json**:
  * Update all libraries.
  * Prune unused libs.
  * Move stuff to dev dependencies.


## Final / Packaging
* **Replace Symlinks**: Create script to push everything from "vendor"
  to the actual location elsewhere (maybe based on name). Remove all
  symlinks and use *actual* files instead.


## Future
* **component.json**: Consider switching to this for all libs.
* **iPhone**: Speed up click actions (delayed).

## Other Notes

### Chai Async Failures
Have to come back to this.

    it("Works for async failures.", function (done) {
      // Wait for results.
      setTimeout(function () {
        true.should.equal(false);
        return;

        var err;
        try {
          true.should.equal(false);
        } catch (error) {
          console.log(typeof error, error, error.stack);
          err = new Error(error);
          err.stack = error.stack;

        } finally {
          done(err);
        }
      }, 100);
    });

