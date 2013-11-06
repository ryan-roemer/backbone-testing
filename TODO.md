# Backbone.js Testing
Apps, suites, and examples for Backbone.js test development.


## Post-Publication
### Readme
* **Windows**:
  * **Downloads**: Instruct to download from the Packt site (my zipball
    verified with real files).

### Docs
* (docs) **iPhone**: Get rid of extra padding at the top.
* (docs) **Top Navbar**: Maybe a navbar instead of sidenav.
* (docs) **Split Pages**: Separate out into more pages.
* (docs) **Fluid Gutters**: Consistent margins.

### Bugs
* **IE9 Placeholders**: Placeholder text doesn't show up. Need to manually
  hack in.

### Future
* **iPhone**: Speed up click actions (delayed).


## Other Notes
### Guidelines
* **Code Width**: Let's go for 70 chars (72 looks available in some books).
* **VirtualBox**: Host OS is at: 10.0.2.2:4321 (app), 10.0.2.2:4322 (site).

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

