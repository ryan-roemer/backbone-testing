# Backbone.js Testing
Sample apps, test suites, and ideas for Backbone.js.

## Current Tasks / Issues
Things to do before going live.

* **Mocha 1.10.0 + Mocha-PhantomJS**: Mocha 1.10.0 removes `window.process`,
  which causes mocha-phantomjs to spectacularly die.
  Current branch: `upgrade-mocha-1.10.0`
  See: https://github.com/metaskills/mocha-phantomjs/issues/58,
  https://github.com/visionmedia/mocha/commit/dac0b29e8da9a1242c8c7d4cb7c4837cfb82bec5


## Notes
### Guidelines
* **Code Width**: Let's go for 70 chars (72 looks available in some books).
* **VirtualBox**: Host OS is at: 10.0.2.2:4321 (app), 10.0.2.2:4322 (site).


## Content
### Readme
* **Introduction**: Add intro more tailored to book and with actual
  information.
* **Libraries**: Update various versions client and server.
* **Licenses**: Review for any needed additions.

* **Windows**:
  * **Downloads**: Instruct to download from the Packt site (my zipball
    verified with real files).
  * Possibly need polyfill libraries.
  * Test out all code samples on a Windows machine.

### Book Page
* Create a "book.md" page with a TOC. Or, maybe just a link.

## Final / Packaging
* **Replace Symlinks**: Create script to push everything from "vendor"
  to the actual location elsewhere (maybe based on name). Remove all
  symlinks and use *actual* files instead.

## After Live
* (docs) **Top Navbar**: Maybe a navbar instead of sidenav.
* (docs) **Split Pages**: Separate out into more pages.
* (docs) **Fluid Gutters**: Consistent margins.

## Bugs for After Live
* **IE9 Placeholders**: Placeholder text doesn't show up. Need to manually
  hack in.

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

