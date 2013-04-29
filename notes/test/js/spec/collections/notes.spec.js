describe("App.Collections.Notes", function () {

  before(function () {
    // Create a reference for all internal suites/specs.
    this.notes = new App.Collections.Notes();

    // Use internal method to clear out existing data.
    this.notes.localStorage._clear();
  });

  after(function () {
    // Remove the reference.
    this.notes = null;
  });

  describe("creation", function () {

    it("has default values", function () {
      expect(this.notes).to.be.ok;
      expect(this.notes).to.have.length(0);
    });

    // -- Omitted in Book. --
    it("should be empty on fetch", function (done) {
      // Stash reference to save context.
      var notes = this.notes;

      // Before fetch.
      expect(notes).to.be.ok;
      expect(notes).to.have.length(0);

      // After fetch.
      notes.once("reset", function () {
        expect(notes).to.have.length(0);
        done();
      });

      notes.fetch({ reset: true });
    });

  });

  describe("modification", function () {

    beforeEach(function () {
      // Load a pre-existing note.
      this.notes.create({
        title: "Test note #1",
        text: "A pre-existing note from beforeEach."
      });
    });

    afterEach(function () {
      // Wipe internal data and reset collection.
      this.notes.localStorage._clear();
      this.notes.reset();
    });

    it("has a single note", function (done) {
      var notes = this.notes, note;

      // After fetch.
      notes.once("reset", function () {
        expect(notes).to.have.length(1);

        // Check model attributes.
        note = notes.at(0);
        expect(note).to.be.ok;
        expect(note.get("title")).to.contain("#1");
        expect(note.get("text")).to.contain("pre-existing");

        done();
      });

      notes.fetch({ reset: true });
    });

    it("can delete a note", function (done) {
      var notes = this.notes, note;

      // After shift.
      notes.once("remove", function () {
        expect(notes).to.have.length(0);
        done();
      });

      // Remove and return first model.
      note = notes.shift();
      expect(note).to.be.ok;
    });

    // -- Omitted in Book. --
    it("can create a second note", function (done) {
      var notes = this.notes,
        note = notes.create({
          title: "Test note #2",
          text: "A new note, created in the test."
        });

      // After fetch.
      notes.once("reset", function () {
        expect(notes).to.have.length(2);

        // Check model attributes.
        note = notes.at(1);
        expect(note).to.be.ok;
        expect(note.get("title")).to.contain("#2");
        expect(note.get("text")).to.contain("new note");

        done();
      });

      notes.fetch({ reset: true });
    });

  });
});
