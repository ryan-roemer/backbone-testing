describe("App.Routers.Router", function () {

  // Default option: Trigger and replace history.
  var opts = { trigger: true, replace: true };

  // Routing tests are a bit complicated in that the actual hash
  // fragment can change unless fully mocked out. We *do not* mock
  // the URL mutations meaning that a hash fragment will appear in
  // our test run (making the test driver appear to be a single
  // page app).
  //
  // There are alternative approaches to this, such as Backbone.js'
  // own unit tests which fully fake out the URL browser location
  // with a mocked object to instead contain URL information and
  // behave mostly like a real location.
  before(function () {
    // Dependencies and fake patches.
    this.sandbox = sinon.sandbox.create();

    // Mock the entire `Notes` object.
    this.sandbox.mock(App.Views.Notes);

    // Stub `Note` prototype and configure `render`.
    this.sandbox.stub(App.Views.Note.prototype);
    App.Views.Note.prototype.render.returns({ $el: null });
  });

  beforeEach(function () {
    // Fake function: Get a model simulation if id is "1".
    var get1 = function (i) {
      return i === "1" ? { id: "1" } : null;
    };

    // Create router with stubs and manual fakes.
    this.router = new App.Routers.Router({
      notesView: {
        render: this.sandbox.stub(),
        collection: { get: get1 }
      },
      noteNavView: this.sandbox.stub()
    });

    // Start history to enable routes to fire.
    Backbone.history.start();

    // Spy on all route events.
    this.routerSpy = sinon.spy();
    this.router.on("route", this.routerSpy);
  });

  afterEach(function () {
    // Navigate to home page and stop history.
    this.router.navigate("", opts);
    Backbone.history.stop();
  });

  after(function () {
    this.sandbox.restore();
  });

  describe("routing", function () {

    before(function () {
      // Stub out notes and note to check routing.
      //
      // Happens **before** the router instantiation.
      // If we stub *after* instantiation, then `notes` and `note`
      // can no longer be stubbed in the usual manner.
      sinon.stub(App.Routers.Router.prototype, "notes");
      sinon.stub(App.Routers.Router.prototype, "note");
    });

    beforeEach(function () {
      // Reset before every run.
      App.Routers.Router.prototype.notes.reset();
      App.Routers.Router.prototype.note.reset();
    });

    after(function () {
      App.Routers.Router.prototype.notes.restore();
      App.Routers.Router.prototype.note.restore();
    });

    it("can route to notes", function () {
      // Start out at other route and navigate home.
      this.router.navigate("note/1/edit", opts);
      this.router.navigate("", opts);
      expect(App.Routers.Router.prototype.notes)
        .to.have.been.calledOnce.and
        // Updated for Backbone.js v1.1.2. Was:
        // .to.have.been.calledWithExactly();
        .to.have.been.calledWithExactly(null);
    });

    it("can route to note", function () {
      this.router.navigate("note/1/edit", opts);
      expect(App.Routers.Router.prototype.note)
        .to.have.been.calledOnce.and
        // Updated for Backbone.js v1.1.2. Was:
        // .to.have.been.calledWithExactly("1", "edit");
        .to.have.been.calledWithExactly("1", "edit", null);
    });

  });

  describe("notes", function () {

    it("can navigate to notes page", function () {
      // Start out at other route and navigate home.
      this.router.navigate("note/1/edit", opts);
      this.router.navigate("", opts);

      // Spy has now been called **twice**.
      expect(this.routerSpy)
        .to.have.been.calledTwice.and
        .to.have.been.calledWith("notes");
    });

  });

  describe("note", function () {

    it("can navigate to note page", sinon.test(function () {
      this.router.navigate("note/1/edit", opts);

      expect(this.routerSpy)
        .to.have.been.calledOnce.and
        // Updated for Backbone.js v1.1.2. Was:
        // .to.have.been.calledWith("note", ["1", "edit"]);
        .to.have.been.calledWith("note", ["1", "edit", null]);
    }));

    it("can navigate to same note", sinon.test(function () {
      // Short router: Skip test if empty router.
      if (!this.router.noteView) { return; }

      this.router.navigate("note/1/edit", opts);
      expect(this.routerSpy)
        .to.have.been.calledOnce.and
        // Updated for Backbone.js v1.1.2. Was:
        // .to.have.been.calledWith("note", ["1", "edit"]);
        .to.have.been.calledWith("note", ["1", "edit", null]);

      // Manually patch in model property (b/c stubbed).
      this.router.noteView.model = { id: "1" };

      // Navigating to same with different action works.
      this.router.navigate("note/1/view", opts);
      expect(this.routerSpy)
        .to.have.been.calledTwice.and
        // Updated for Backbone.js v1.1.2. Was:
        // .to.have.been.calledWith("note", ["1", "view"]);
        .to.have.been.calledWith("note", ["1", "view", null]);

      // Even with error, should still `remove` existing.
      this.router.navigate("note/2/view", opts);
      expect(this.router.noteView.remove)
        .to.have.been.calledOnce;
    }));

    it("navigates to list on no model", sinon.test(function () {
      // Short router: Skip test if empty router.
      if (!this.router.noteView) { return; }

      this.router.navigate("note/2/edit", opts);

      // Note that the route events are out of order because
      // the re-navigation to "notes" happens **first**.
      expect(this.routerSpy)
        .to.have.been.calledTwice.and
        // Updated for Backbone.js v1.1.2. Was:
        // .to.have.been.calledWith("note", ["2", "edit"]).and
        .to.have.been.calledWith("note", ["2", "edit", null]).and
        .to.have.been.calledWith("notes");
    }));

  });

});
