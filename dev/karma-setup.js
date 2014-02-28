// Karma Setup
// -----------
// Duplicate what's normally in "test.html"
//
// Load this after "app/js/app/config.js" for correct patching.

// Test overrides (before any app components).
if (window.App) {
  window.App.Config = _.extend(window.App.Config, {
    storeName: "notes-test" // localStorage for tests.
  });
}

// Chai
window.expect = chai.expect;

// Add test fixture.
$("<div />")
  .attr("id", "fixtures")
  .css({
    display: "none",
    visibility: "hidden"
  })
  .prependTo($("body"));
