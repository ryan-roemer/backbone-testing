describe("App.Views.Notes", function () {

  before(function () {
    // Create nav fixture (needed) and test fixture.
    $("#fixtures").append($(
      "<form class=\"navbar-search\">" +
        "<input type=\"text\" class=\"search-query\">" +
      "</form>"
    ));
    this.$fixture = $(
      "<div id='notes' class='region region-notes'>" +
        "<table id='notes-list'>" +
          "<tr><td>" +
            "<input id='note-new-input'>" +
            "<div id='note-create'></div>" +
          "</td></tr>" +
        "</table>" +
      "</div>"
    ).appendTo($("#fixtures"));

    // Create collection of notes data that we will sometimes
    // use to check full rendering, etc.
    this.notes = _.map(_.range(4), function (i) {
      return new App.Models.Note({
        id: i.toString(),
        title: "title" + i,
        text: "text" + i
      });
    });

    this.collection = new App.Collections.Notes();
    this.view = new App.Views.Notes({
      collection: this.collection
    });

    this.collection.trigger("add:notes");
  });

  beforeEach(function () {
    // Empty out the fixture.
    $("tr.notes-item").remove();
  });

  after(function () {
    // Remove views and trigger model destroy to have any internal
    // `NotesItem` views remove themselves.
    this.view.remove();
    _.each(this.notes, function (m) { m.trigger("destroy"); });

    // Clean up DOM fixtures.
    $("#fixtures").empty();
  });

  describe("render", function () {

    it("shows notes region on render", function () {
      // Hide the fixture region first.
      this.$fixture.hide();
      expect(this.$fixture.css("display")).to.equal("none");

      // Render and verify shown.
      this.view.render();
      expect(this.$fixture.css("display")).to.not.equal("none");
    });

  });

  // Tests `addNotes` and `addNotes`.
  describe("add existing notes", function () {

    it("adds notes on collection reset", sinon.test(function () {
      this.stub(this.view, "addNotes");

      this.collection.trigger("reset");

      expect(this.view.addNotes).to.be.calledOnce;
    }));

    it("does not add when empty", sinon.test(function () {
      this.spy(this.view, "addNote");

      this.view.addNotes();

      expect(this.view.addNote).to.not.be.called;
      expect($("tr.notes-item")).to.have.length(0);
    }));

    // Replace collection `chain()` with our data, so that we can
    // simulate a collection full of models without having to
    // actually change model state.
    //
    // Spy `addNote` here to check that it was called **and** be
    // able to verify that it rendered correctly in our fixture.
    it("adds with models", sinon.test(function () {
      this.spy(this.view, "addNote");
      this.stub(this.collection, "chain", _.bind(function () {
        return _.chain(this.notes);
      }, this));

      this.view.addNotes();

      expect(this.view.addNote.callCount).to.equal(4);
      expect($("tr.notes-item")).to.have.length(4);
    }));

  });

  describe("create new notes", function () {

    // Trigger with "click".
    it("does not create when no title", sinon.test(function () {
      this.spy(this.view, "createNote");
      this.stub(this.view, "create");

      $("#note-create").trigger("click");

      expect(this.view.createNote).to.have.been.calledOnce;
      expect(this.view.create).to.not.have.been.called;
    }));

    // Make direct call on "enter" function.
    it("creates when title", sinon.test(function () {
      this.spy(this.view, "enterNote");
      this.spy(this.view, "createNote");
      this.stub(this.view, "create");

      // Simulate an "enter" (keycode 13) event on `enterNote` after
      // we have entered a title in the new note input field.
      //
      // See: http://stackoverflow.com/questions/6124692
      $("#note-new-input")
        .val("New Title")
        .trigger($.Event("keypress", { which: 13 }));

      expect(this.view.enterNote).to.have.been.calledOnce;
      expect(this.view.createNote).to.have.been.calledOnce;
      expect(this.view.create).to.have.been.called;
    }));

    // Check creation triggers add event and updates DOM.
    it("adds note to DOM on create", sinon.test(function () {
      var note = this.notes[0],
        addSpy = this.spy();

      // Stub collection `create` to just call the success callback
      // with specified note and `get` that note as well.
      this.stub(this.collection, "create")
        .yieldsTo("success", null, note.toJSON());
      this.stub(this.collection, "get").returns(note);

      // Set up spies on events and actual addition.
      this.collection.on("notes:add", addSpy);
      this.spy(this.view, "addNote");

      this.view.create("My Title");

      // Check spies, stubs.
      expect(this.view.addNote).to.have.been.calledOnce;
      expect(this.collection.create).to.have.been.calledOnce;
      expect(addSpy)
        .to.have.been.calledOnce.and
        .to.have.been.calledWith(note);

      // Check the note was added to the DOM.
      expect($("tr.notes-item")).to.have.length(1);

      // Stop listeners on collection. We want to do this here
      // because we persist the collection object across tests in
      // this suite.
      this.collection.off("notes:add", addSpy);
    }));

  });

});
