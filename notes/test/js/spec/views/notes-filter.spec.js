describe("App.Views.NotesFilter", function () {
  describe("isMatch", function () {
    // Get reference to function under test.
    var isMatch = App.Views.NotesFilter.prototype.isMatch;

    it("works for identity comparisons", function () {
      expect(isMatch()).to.be.true;
      expect(isMatch("", "")).to.be.true;
      expect(isMatch("a", "a")).to.be.true;
      expect(isMatch("ab", "ab")).to.be.true;
    });

    it("should be true on empty query", function () {
      expect(isMatch(null, "foo")).to.be.true;
      expect(isMatch("", "foo")).to.be.true;
    });

    it("can find substring matches", function () {
      expect(isMatch("o", "foo")).to.be.true;
      expect(isMatch("oo", "foo")).to.be.true;
      expect(isMatch("f", "foo")).to.be.true;
      expect(isMatch("short", "a short sentence.")).to.be.true;
    });

    it("should be false on misses", function () {
      expect(isMatch("a", "foo")).to.be.false;
      expect(isMatch("ooo", "foo")).to.be.false;
      expect(isMatch("of", "foo")).to.be.false;
      expect(isMatch("shot", "a short sentence.")).to.be.false;
    });
  });
});
