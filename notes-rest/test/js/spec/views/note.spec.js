// The following is needed for Mocha < 1.9.0 when using PhantomJS:
//
//  /*global confirm, mocha */
//  mocha.globals(["confirm"]);
//

describe("App.Views.Note", function () {

  before(function () {
    // Regions for different views.
    $("#fixtures").append($(
      "<div class='region-note' style='display: none;'></div>" +
      "<div class='region-notes' style='display: none;'></div>"
    ));

    // App.Views.Note fixture.
    this.$fixture = $(
      "<div id='note-fixture'>" +
        "<div id='#note-pane-view-content'></div>" +
      "</div>"
    );

    // Any model changes will trigger a `model.save()`, which
    // won't work in the tests, so we have to fake the method.
    //
    // Stub the model prototype *once* for all our tests.
    sinon.stub(App.Models.Note.prototype, "save");
  });

  beforeEach(function () {
    this.routerSpy = sinon.spy();
    this.$fixture.appendTo($("#fixtures"));

    // Creation calls `render()`, so in tests we have an
    // *already rendered* view.
    this.view = new App.Views.Note({
      el: this.$fixture,
      model: new App.Models.Note()
    }, {
      // Pass an empty view and manually mock router.
      // We are essentially "faux" mocking the components.
      nav: new Backbone.View(),
      router: {
        navigate: this.routerSpy
      }
    });
  });

  afterEach(function () {
    this.$fixture.empty();
    if (this.view) { this.view.model.destroy(); }
  });

  after(function () {
    $("#fixtures").empty();
    App.Models.Note.prototype.save.restore();
  });

  describe("view modes and actions", function () {
    // `NoteView` first goes to `#note/:id/view`
    it("navigates / displays 'view' by default", function () {
      expect(this.routerSpy).to.be.calledWithMatch(/view$/);

      // Check CSS visibility directly. Not necessarily a best
      // practice as it uses internal knowledge of the DOM, but
      // gets us a quick check on what should be the visible
      // view pane.
      expect($("#note-pane-view")
        .css("display")).to.not.equal("none");
      expect($("#note-pane-edit")
        .css("display")).to.equal("none");
    });

    // Edit event triggers navigation to `#note/:id/edit`
    it("navigates / displays 'edit' on event", function () {
      this.view.trigger("update:edit");
      expect(this.routerSpy).to.be.calledWithMatch(/edit$/);

      expect($("#note-pane-edit")
        .css("display")).to.not.equal("none");
      expect($("#note-pane-view")
        .css("display")).to.equal("none");
    });

    it("confirms note on delete", sinon.test(function () {
      this.stub(window, "confirm").returns(false);
      this.view.deleteNote();
      expect(window.confirm)
        .to.have.been.calledOnce.and
        .to.have.been.calledWith("Delete note?");
    }));
  });

  describe("model interaction", function () {
    afterEach(function () {
      // Wipe out to prevent any further use.
      this.view = null;
    });

    // It is a good habit to check that views are actually
    // disposed of when expected. Here, we bind view removal to
    // the destruction of a model.
    it("is removed on destroyed model", sinon.test(function () {
      this.spy(this.view, "remove");
      this.spy(this.view.noteView, "remove");

      this.view.model.trigger("destroy");

      expect(this.view.remove).to.be.calledOnce;
      expect(this.view.noteView.remove).to.be.calledOnce;
    }));
  });

  describe("note rendering", function () {

    it("can render a note", function () {
      // Don't explicitly call `render()` because
      // `initialize()` already called it.
      expect($(".region-note")
        .css("display")).to.not.equal("none");
      expect($(".region-notes")
        .css("display")).to.equal("none");
    });

    // Borrows a `NoteView` spec verbatim to make sure that the
    // overall view code renders correctly.
    // -- Omitted in Book. --
    it("can render a default note view", function () {
      var $title = $("#pane-title"),
        $text = $("#pane-text");

      // Default to empty title in `h2` tag.
      expect($title.text()).to.equal("");
      expect($title.prop("tagName")).to.match(/h2/i);

      // Have simple default message.
      expect($text.text()).to.equal("Edit your note!");
      expect($text.html())
        .to.equal("<p><em>Edit your note!</em></p>");
    });

    it("calls render on model events", sinon.test(function () {
      // Spy on `render` and check call/return value.
      this.spy(this.view, "render");

      this.view.model.trigger("change");

      expect(this.view.render)
        .to.be.calledOnce.and
        .to.have.returned(this.view);
    }));

    it("calls render on changed data", sinon.test(function () {
      this.spy(this.view, "render");

      // Replace form value and blur to force changes.
      $("#input-text").val("# A Heading!");
      $("#note-form-edit").blur();

      // `Note` view should have rendered.
      expect(this.view.render)
        .to.be.calledOnce.and
        .to.have.returned(this.view);

      // Check the `NoteView` view rendered the new markdown.
      expect($("#pane-text").html())
        .to.match(/<h1 id=".*?">A Heading!<\/h1>/);
    }));
  });
});
