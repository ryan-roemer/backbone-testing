describe("Chai assertion chains", function () {
  // A contrived example using all of the available Chai
  // language chains:
  // * `to`
  // * `be`
  // * `been`
  // * `is`
  // * `that`
  // * `and`
  // * `have`
  // * `with`
  // * `at`
  // * `of`
  it("can chain assertions", function () {
    expect("foo").a("string");
    expect("foo").to.be.a("string");
    expect("foo").to.have.been.a("string");
    expect("foo").that.is.a("string");

    // Chains can be repeated.
    expect("foo").to.to.to.to.a("string");

    // OK, so we needed to use up all the rest here. ;)
    expect("foo").and.with.at.of.a("string");
  });

  // `.not` can negate any assertion.
  it("can negate chains", function () {
    expect("foo").to.not.equal("bar");

    // Let's get literary.
    expect("Hamlet").to.be.not.to.be.an("object");
  });

  // `.deep` turns on deep equality checking.
  it("can deeply check chains", function () {
    // Without deep checking.
    expect({foo: "bar"}).to.not.equal({foo: "bar"});

    // With deep checking.
    expect({foo: "bar"}).to.deep.equal({foo: "bar"});
    expect({foo: {bar: "baz"}})
      .to.have.deep.property("foo.bar", "baz");
  });

  // Most Chai assertions are chainable
  it("can chain other assertions", function () {
    expect("foo")
      .to.be.a("string").and
      .to.equal("foo").and
      .to.have.lengthOf(3).and
      .to.match(/f[o]{2}/);
  });
});
