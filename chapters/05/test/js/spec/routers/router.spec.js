// **Note**: These tests are for the Chapter 5 "abbreviated" router
// that omits most of the real `App.Routers.Router` implementation
// and keeps just the routing logic.
//
// To review the spec for the *real* Notes router, see:
// "notes/test/js/spec/routers/router.spec.js"
describe("App.Routers.Router", function () {

  // Default option: Trigger and replace history.
  var opts = { trigger: true, replace: true };

  beforeEach(function () {
    // Stub route methods.
    sinon.stub(App.Routers.Router.prototype, "note");
    sinon.stub(App.Routers.Router.prototype, "notes");

    // Create router with stubs and manual fakes.
    this.router = new App.Routers.Router();

    // Start history to enable routes to fire.
    Backbone.history.start();

    // Spy on all route events.
    this.routerSpy = sinon.spy();
    this.router.on("route", this.routerSpy);
  });

  afterEach(function () {
    Backbone.history.stop();

    App.Routers.Router.prototype.note.restore();
    App.Routers.Router.prototype.notes.restore();
  });

  it("can route to note", function () {
    this.router.navigate("note/1/edit", opts);

    // Check router method.
    expect(App.Routers.Router.prototype.note)
      .to.have.been.calledOnce.and
      // Updated for Backbone.js v1.1.2. Was:
      // .to.have.been.calledWithExactly("1", "edit");
      .to.have.been.calledWithExactly("1", "edit", null);

    // Check route event.
    expect(this.routerSpy)
      .to.have.been.calledOnce.and
      // Updated for Backbone.js v1.1.2. Was:
      // .to.have.been.calledWith("note", ["1", "edit"]);
      .to.have.been.calledWith("note", ["1", "edit", null]);
  });

  it("can route around", function () {
    // Bounce between routes.
    this.router.navigate("", opts);
    this.router.navigate("note/1/edit", opts);
    this.router.navigate("", opts);

    // Check router method.
    expect(App.Routers.Router.prototype.notes)
      .to.have.been.calledTwice.and
      // Updated for Backbone.js v1.1.2. Was:
      // .to.have.been.calledWithExactly();
      .to.have.been.calledWithExactly(null);

    // Check route event.
    expect(this.routerSpy)
      .to.have.been.calledThrice.and
      .to.have.been.calledWith("notes");
  });

});
