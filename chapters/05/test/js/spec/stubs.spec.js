describe("Sinon.JS Stubs", function () {

  describe("the basics", function () {
    // Object literal with two methods.
    var obj = {
      multiply: function (a, b) { return a * b; },
      error: function (msg) { throw new Error(msg); }
    };

    it("stubs multiply", function () {
      // Stub with a hard-coded return value.
      sinon.stub(obj, "multiply").returns(5);
      expect(obj.multiply(1, 2)).to.equal(5);
      obj.multiply.restore();

      // Stub with a function.
      sinon.stub(obj, "multiply", function (a, b) {
        return a + b;
      });
      expect(obj.multiply(1, 2)).to.equal(3);
      obj.multiply.restore();
    });

    it("stubs error", sinon.test(function () {
      this.stub(obj, "error");
      expect(obj.error).to.not.throw();
    }));
  });


  describe("asynchronous", function () {

    it("stubs with yields", function (done) {
      var obj = {
        async: function (callback) { callback("a", "b"); }
      };

      sinon.stub(obj, "async").yields(1, 2);

      // Verify stub calls with (1, 2), *not* ("a", "b").
      //
      // **Note**: We stick the assertion code *in* the callback
      // here, but we could just as easily use a Sinon.JS spy
      // as the callback to `obj.async()` for verification purposes.
      obj.async(function (first, second) {
        expect(first).to.equal(1);
        expect(second).to.equal(2);

        obj.async.restore();
        done();
      });
    });

    it("stubs with yieldsTo", function () {
      var obj = {
          async: function (opts) { opts.success("a", "b"); }
        },
        spyObj = {
          failure: sinon.spy(),
          success: sinon.spy()
        };

      sinon.stub(obj, "async").yieldsTo("success", 1, 2);

      // Call on object with callback spies.
      obj.async(spyObj);

      expect(spyObj.failure).to.have.not.have.been.called;
      expect(spyObj.success)
        .to.have.been.calledOnce.and
        .to.have.been.calledWith(1, 2);
    });

    it("stubs with callsArgWith", function () {
      var obj = {
          async: function (callback, errback) {
            callback("a", "b");
          }
        },
        callbackSpy = sinon.spy(),
        errbackSpy = sinon.spy();

      // "1" is the index of the `errback` parameter.
      // "2, 3" are the callback arguments.
      sinon.stub(obj, "async").callsArgWith(1, 2, 3);

      // Call on object with callback and errback spies.
      obj.async(callbackSpy, errbackSpy);

      expect(callbackSpy).to.have.not.have.been.called;
      expect(errbackSpy)
        .to.have.been.calledOnce.and
        .to.have.been.calledWith(2, 3);
    });

  });

  describe("Backbone.js initialization complexities", function () {
    var MyView = Backbone.View.extend({

      initialize: function () {
        this.on("wrapped", function () { this.foo(); });
        this.on("unwrapped", this.foo);
      },

      foo: function () {
        return "I'm real";
      }

    });

    it("stubs after initialization", sinon.test(function () {
      var myView = new MyView();

      // Stub prototype **after** initialization.
      // Equivalent to:
      // this.stub(myView, "foo").returns("I'm fake");
      this.stub(MyView.prototype, "foo").returns("I'm fake");

      // The wrapped version calls the **stub**.
      myView.foo.reset();
      myView.trigger("wrapped");
      expect(myView.foo)
        .to.be.calledOnce.and
        .to.have.returned("I'm fake");

      // However, the unwrapped version calls the **real** function.
      myView.foo.reset();
      myView.trigger("unwrapped");
      expect(myView.foo).to.not.be.called;
    }));

    it("stubs before initialization", sinon.test(function () {
      // Stub prototype **before** initialization.
      this.stub(MyView.prototype, "foo").returns("I'm fake");

      var myView = new MyView();

      // Now, both versions are correctly stubbed.
      myView.foo.reset();
      myView.trigger("wrapped");
      expect(myView.foo)
        .to.be.calledOnce.and
        .to.have.returned("I'm fake");

      myView.foo.reset();
      myView.trigger("unwrapped");
      expect(myView.foo)
        .to.be.calledOnce.and
        .to.have.returned("I'm fake");
    }));

  });

});
