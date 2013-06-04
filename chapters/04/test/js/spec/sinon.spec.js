describe("Sinon.JS spies", function () {
  it("calls anonymous spy on event", function () {
    var eventer = _.extend({}, Backbone.Events),
      spy = sinon.spy();

    // Set up the spy.
    eventer.on("foo", spy);
    expect(spy.called).to.be.false;

    // Fire event.
    eventer.trigger("foo", 42);

    // Check number of calls.
    expect(spy.calledOnce).to.be.true;
    expect(spy.callCount).to.equal(1);

    // Check calling arguments.
    expect(spy.firstCall.args[0]).to.equal(42);
    expect(spy.calledWith(42)).to.be.true;
  });

  it("verifies anonymous spy on event", function () {
    var eventer = _.extend({}, Backbone.Events),
      spy = sinon.spy();

    eventer.on("foo", spy);
    sinon.assert.notCalled(spy);

    eventer.trigger("foo", 42);
    sinon.assert.callCount(spy, 1);
    sinon.assert.calledWith(spy, 42);
  });

  it("calls spy wrapper on function", function () {
    var divide = function (a, b) { return a / b; },
      divAndSpy = sinon.spy(divide);

    // Call wrapped function and verify result.
    expect(divAndSpy(4, 2)).to.equal(2);

    // Now, verify spy properties.
    sinon.assert.calledOnce(divAndSpy);
    sinon.assert.calledWith(divAndSpy, 4, 2);

    // Sinon.JS doesn't have assert for returned.
    expect(divAndSpy.returned(2)).to.be.true;
  });

  var obj = {
    multiply: function (a, b) { return a * b; },
    error: function (msg) { throw new Error(msg); }
  };

  it("calls spy on wrapped object", function () {
    // Wrap members with `sinon` directly.
    sinon.spy(obj, "multiply");
    sinon.spy(obj, "error");

    expect(obj.multiply(5, 2)).to.equal(10);
    sinon.assert.calledWith(obj.multiply, 5, 2);
    expect(obj.multiply.returned(10)).to.be.true;

    try {
      obj.error("Foo");
    } catch (e) {}
    sinon.assert.threw(obj.error, "Error");

    // Have to restore after tests finish.
    obj.multiply.restore();
    obj.error.restore();
  });

  it("calls spy with test helper", sinon.test(function () {
    // Wrap members using context (`this`) helper.
    this.spy(obj, "multiply");
    this.spy(obj, "error");

    expect(obj.multiply(5, 2)).to.equal(10);
    sinon.assert.calledWith(obj.multiply, 5, 2);
    expect(obj.multiply.returned(10)).to.be.true;

    try {
      obj.error("Foo");
    } catch (e) {}
    sinon.assert.threw(obj.error, "Error");

    // No restore is necessary.
  }));

  it("calls spy with chai plugin", sinon.test(function () {
    // Wrap members using context (`this`) helper.
    this.spy(obj, "multiply");
    this.spy(obj, "error");

    expect(obj.multiply(5, 2)).to.equal(10);
    expect(obj.multiply).to.have.been.calledWith(5, 2);
    expect(obj.multiply).to.have.returned(10);

    try { obj.error("Foo"); } catch (e) {}
    expect(obj.error).to.have.thrown("Error");
  }));

  it("verifies spy call objects", sinon.test(function () {
    this.spy(obj, "multiply");

    obj.multiply(5, 2);
    expect(obj.multiply.firstCall)
      .to.eql(obj.multiply.lastCall).and
      .to.eql(obj.multiply.getCall(0));

    obj.multiply(4, 2);
    expect(obj.multiply.secondCall)
      .to.eql(obj.multiply.lastCall).and
      .to.eql(obj.multiply.getCall(1));
  }));
});
