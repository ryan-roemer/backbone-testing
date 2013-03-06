describe("App.Views.NoteView", function () {

  before(function () {
    // Create test fixture and add to DOM placeholder.
    this.$fixture = $("<div id='note-view-fixture'></div>");
    this.$fixture.appendTo($("#fixtures"));
  });

  beforeEach(function () {
    // New default model and view for each test.
    //
    // Creation actually calls `render()`, so in tests we have an
    // *already rendered* view.
    this.view = new App.Views.NoteView({
      el: this.$fixture,
      model: new App.Models.Note()
    });
  });

  afterEach(function () {
    // Clean up view and model for next run.
    this.$fixture.empty();
    this.view.model.destroy();
  });

  after(function () {
    // Remove all sub-fixtures after test suite finishes.
    $("#fixtures").empty();
  });

  it("can render an empty note", function () {
    var $title = this.$fixture.find("#pane-title"),
      $text = this.$fixture.find("#pane-text");

    // Default to empty title in `h2` tag.
    expect($title.text()).to.equal("");
    expect($title.prop("tagName").toLowerCase()).to.equal("h2");

    // Have simple *bold* default message.
    expect($text.text()).to.equal("Edit your note!");
    expect($text.html()).to.contain("<em>Edit your note!</em>");
  });

  it("can render more complicated markdown", function (done) {
    var $fixture = this.$fixture;

    // Model updates will cause a re-render. Set our tests on that
    // event. Because we set in tests, we will come **after** the
    // event listener in the view.
    //
    // An alternate approach would be to set a spy on the view's
    // `render()` method. This would be more robust as relying on
    // internal listener order is fairly brittle and risky in the
    // face of implementation changes.
    //
    // Yet another approach is to have the view emit a "render"-
    // related event that we can listen on once rendering is done
    // and ensure that the DOM is updated before testing.
    this.view.model.once("change", function () {
      var $title = $fixture.find("#pane-title"),
        $text = $fixture.find("#pane-text");

      // Our new (changed) title.
      expect($title.text()).to.equal("My Title");

      // Rendered Markdown with headings, list.
      expect($text.html())
        .to.contain("My Heading</h2>").and
        .to.contain("<ul>").and
        .to.contain("<li>List item 2</li>");

      done();
    });

    // Make our note a little more complex.
    this.view.model.set({
      title: "My Title",
      text: "## My Heading\n" +
            "* List item 1\n" +
            "* List item 2"
    });
  });
});
