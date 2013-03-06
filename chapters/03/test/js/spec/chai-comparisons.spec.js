describe("Chai comparison functions", function () {
  it("checks `equal` - strict equality", function () {
    expect("foo").to.equal("foo");
    expect({foo: "bar"}).to.not.equal({foo: "bar"});
  });

  it("checks `eql` - deep equality", function () {
    expect("foo").to.eql("foo");
    expect({foo: "bar"}).to.eql({foo: "bar"});
  });

  it("checks `above` - greater than", function () {
    expect(1).to.not.be.above(1);
    expect(5).to.be.above(2);
  });

  it("checks `least`- greater than or equal", function () {
    expect(1).to.be.at.least(1);
    expect(5).to.be.at.least(2);
  });

  it("checks `below` - less than", function () {
    expect(1).to.not.be.below(1);
    expect(1).to.be.below(2);
  });

  it("checks `most` - less than or equal", function () {
    expect(1).to.be.at.most(1);
    expect(1).to.be.at.most(2);
  });

  it("checks `within` - range", function () {
    expect(1).to.be.within(0, 2);
  });

  it("checks `closeTo` - near", function () {
    expect(1.2).to.be.closeTo(1, 0.2);
    expect(1.2).to.not.be.closeTo(1, 0.0);
  });

  it("checks `match` - regular expression", function () {
    expect("foo").to.match(/^f[o]+/);
  });

  it("checks `string` - substring", function () {
    expect("foo bar").to.have.string("foo");
  });

  it("checks `satisfy` - functional check", function () {
    expect(42).to.satisfy(function (value) {
      return value === 6 * 7;
    });
  });
});
