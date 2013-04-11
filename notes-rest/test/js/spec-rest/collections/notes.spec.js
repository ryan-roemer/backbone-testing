describe("App.Collections.Notes", function () {

  beforeEach(function () {
    // Sinon fake server for backend requests.
    this.server = sinon.fakeServer.create();

    // Server automatically responds to XHR requests.
    // Without this, tests *must* insert `this.server.respond()`
    // calls manually to force responses.
    this.server.autoRespond = true;

    // Create a reference for all internal suites/specs.
    this.notes = new App.Collections.Notes();
  });

  afterEach(function () {
    // Stop fake server.
    this.server.restore();
  });

  describe("retrieval", function () {

    // -- Omitted in Book. --
    it("has default values", function () {
      expect(this.notes).to.be.ok;
      expect(this.notes).to.have.length(0);
    });

    // -- Omitted in Book. --
    it("should be empty on fetch", function (done) {
      // Stash reference to save context.
      var notes = this.notes;

      // Return no models on GET.
      this.server.respondWith("GET", "/api/notes", [
        200,
        { "Content-Type": "application/json" },
        "[]"
      ]);

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

    it("has a single note", function (done) {
      var notes = this.notes, note;

      // Return a single model on GET.
      this.server.respondWith("GET", "/api/notes", [
        200,
        { "Content-Type": "application/json" },
        JSON.stringify([{
          id: 1,
          title: "Test note #1",
          text: "A pre-existing note from beforeEach."
        }])
      ]);

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

  });

  // -- Omitted in Book. --
  describe("modification", function () {

    beforeEach(function () {
      // Some pre-existing notes.
      this.note1 = new App.Models.Note({
        id: 1,
        title: "Test note #1",
        text: "A pre-existing note from beforeEach."
      });
      this.note2 = new App.Models.Note({
        id: 2,
        title: "Test note #2",
        text: "A new note, created in the test."
      });

      // Simulate the starting point for the collection.
      this.notes.add(this.note1);
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

    it("can create a second note", function (done) {
      var notes = this.notes,
        note = notes.create(this.note2);

      // GET returns 2 models.
      this.server.respondWith("GET", "/api/notes", [
        200,
        { "Content-Type": "application/json" },
        JSON.stringify([this.note1, this.note2])
      ]);

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
