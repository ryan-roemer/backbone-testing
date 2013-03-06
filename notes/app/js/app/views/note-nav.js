(function () {
  'use strict';

  // Note Navigation Bar View
  // ------------------------
  // Controls note nav bar and emits navigation events.
  App.Views.NoteNav = Backbone.View.extend({

    el: "#note-nav",

    events: function () {
      return {
        "click .note-view": this.clicked("view"),
        "click .note-edit": this.clicked("edit"),
        "click .note-delete": this.clicked("delete"),
      };
    },

    initialize: function () {
      // Defaults for nav.
      this.$("li").removeClass("active");

      // Update the navbar UI for view/edit (not delete).
      this.on("nav:update:view", this.update("view"));
      this.on("nav:update:edit", this.update("edit"));
    },

    // Create handler to update nav bar UI.
    update: function (action) {
      return function () {
        var navEl = ".note-" + action;
        this.$("li").not(navEl).removeClass("active");
        this.$(navEl).addClass("active");
      };
    },

    // Create handler for emitting nav events.
    clicked: function (action) {
      return function () {
        this.trigger("nav:update:" + action);
        this.trigger("nav:" + action);
        return false;
      };
    }

  });
}());
