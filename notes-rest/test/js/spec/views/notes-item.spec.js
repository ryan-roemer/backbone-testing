describe("App.Views.NotesItem", function () {

  // Don't need to specify fixtures, as rendering creates an
  // unattached element that the app manually appends, and we
  // directly check here.
  before(function () {
    this.navigate = sinon.stub();
    this.view = new App.Views.NotesItem({
      model: new App.Models.Note({ id: "0", title: "title" })
    }, {
      router: { navigate: this.navigate }
    });
  });

  afterEach(function () {
    this.navigate.reset();
  });

  after(function () {
    this.view.remove();
  });

  describe("remove", function () {
    it("is removed on model destroy", sinon.test(function () {
      // Empty stub for view removal to prevent side effects.
      this.stub(this.view, "remove");
      this.view.model.trigger("destroy");
      expect(this.view.remove).to.be.calledOnce;
    }));
  });

  describe("render", function () {
    // One way to verify is with a stub.
    it("renders on model change w/ stub", sinon.test(function () {
      this.stub(this.view);
      this.view.model.trigger("change");
      expect(this.view.render).to.have.been.calledOnce;
    }));

    // Here is another way to do the same check with a mock.
    it("renders on model change w/ mock", sinon.test(function () {
      var exp = this.mock(this.view).expects("render").once();
      this.view.model.trigger("change");
      exp.verify();
    }));
  });

  // -- Omitted in Book. --
  describe("DOM", function () {
    it("renders data to HTML", function () {
      var $item = this.view.render().$el;

      // Should set `id` on DOM element and title.
      expect($item.attr("id")).to.equal(this.view.model.id);
      expect($item.find(".note-title").text()).to.equal("title");
    });
  });

  describe("actions", function () {
    it("views on click", function () {
      this.view.$(".note-view").click();

      expect(this.navigate)
        .to.be.calledOnce.and
        .to.be.calledWith("note/0/view");
    });

    it("edits on click", function () {
      this.view.$(".note-edit").click();

      expect(this.navigate)
        .to.be.calledOnce.and
        .to.be.calledWith("note/0/edit");
    });

    it("deletes on click", sinon.test(function () {
      // Empty stub for model destroy to prevent side effects.
      this.stub(this.view.model, "destroy");
      this.view.$(".note-delete").click();

      expect(this.view.model.destroy).to.be.calledOnce;
    }));
  });

});
