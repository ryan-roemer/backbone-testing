describe("Chai objects, arrays", function () {
  it("checks `a` - value type", function () {
    expect("foo").is.a("string");
    expect("foo").is.not.a("number");
    expect({foo: "bar"}).is.an("object");
  });

  it("checks `instanceof` - constructor type", function () {
    var Foo = function () {},
      Bar = function () {};

    expect(new Foo()).is.an.instanceof(Foo);
    expect(new Bar()).is.not.an.instanceof(Foo);
  });

  it("checks `property` - object property", function () {
    expect({foo: "bar"}).to.have.property("foo", "bar");

    // Deep checking - object, and array.
    expect({foo: {bar: "baz"}})
      .to.have.deep.property("foo.bar", "baz");
    expect({foo: ["bar", "baz"]})
      .to.have.deep.property("foo[1]", "baz");
  });

  it("checks `ownProperty` - object's own property", function () {
    expect({foo: "bar"}).to.have.ownProperty("foo");
  });

  it("checks `contain` - object or array presence", function () {
    expect(["bar", "baz"]).to.have.contain("bar");
    expect("foo").to.have.contain("f");
  });

  it("checks `length` - object or array length", function () {
    expect(["bar", "baz"]).to.have.length(2);
    expect("foo").to.have.length(3);
  });

  it("checks `keys` - object keys", function () {
    // Exact matching of all keys.
    expect({foo: 1, bar: 2}).to.have.keys(["foo", "bar"]);

    // Exclusion of any keys.
    expect({foo: 1, bar: 2}).to.not.have.keys(["baz"]);

    // Inclusion of some keys.
    expect({foo: 1, bar: 2}).to.include.keys(["foo"]);
    expect({foo: 1, bar: 2}).to.contain.keys(["bar"]);
  });
});
