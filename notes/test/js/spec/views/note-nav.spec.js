describe("App.Views.NoteNav", function () {
  before(function () {
    // Fixture.
    this.$fixture = $(
      "<ul id='note-nav'>" +
        "<li class='note-view'></li>" +
        "<li class='note-edit'></li>" +
        "<li class='note-delete'></li>" +
      "</ul>"
    );
  });

  beforeEach(function () {
    // Removing also detaches fixture. Reattach here.
    this.$fixture.appendTo($("#fixtures"));

    // The nav. view just wraps existing DOM elements,
    // and doesn't separately render.
    this.view = new App.Views.NoteNav({
      el: this.$fixture
    });
  });

  afterEach(function () {
    this.view.remove();
  });

  after(function () {
    $("#fixtures").empty();
  });

  describe("events", function () {
    it("fires events on 'view' click", function () {
      var navSpy = sinon.spy(),
        updateSpy = sinon.spy(),
        otherSpy = sinon.spy();

      this.view.on({
        "nav:view": navSpy,
        "nav:update:view": updateSpy,
        "nav:edit nav:update:edit": otherSpy,
        "nav:delete nav:update:delete": otherSpy
      });

      this.$fixture.find(".note-view").click();

      expect(navSpy).to.have.been.calledOnce;
      expect(updateSpy).to.have.been.calledOnce;
      expect(otherSpy).to.not.have.been.called;
    });

  });

  describe("menu bar display", function () {
    it("has no active navs by default", function () {
      // Check no list items are active.
      expect(this.view.$("li.active")).to.have.length(0);

      // Another way - manually check each list nav.
      expect($(".note-view")
        .attr("class")).to.not.include("active");
      expect($(".note-edit")
        .attr("class")).to.not.include("active");
      expect($(".note-delete")
        .attr("class")).to.not.include("active");
    });

    // Test the actual menu clicks.
    it("updates nav on 'edit' click", function () {
      $(".note-edit").click();
      expect($(".note-edit").attr("class")).to.include("active");
    });

    // Test event triggers (possibly from other views).
    it("updates nav on 'edit' event", function () {
      this.view.trigger("nav:update:edit");
      expect($(".note-edit").attr("class")).to.include("active");
    });
  });
});
