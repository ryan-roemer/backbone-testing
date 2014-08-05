(function () {
  'use strict';

  // Notes Item View
  // ---------------
  // A single note within a list of notes.
  App.Views.NotesItem = Backbone.View.extend({

    // Set rendered DOM element `id` property to the model's id.
    id: function () { return this.model.id; },

    tagName: "tr",

    className: "notes-item",

    template: _.template(App.Templates["template-notes-item"]),

    events: {
      "click .note-view":   function () { this.viewNote(); },
      "click .note-edit":   function () { this.editNote(); },
      "click .note-delete": function () { this.deleteNote(); }
    },

    initialize: function (attrs, opts) {
      // Get router from options or app. Also allow to be empty
      // so that tests can `render` without.
      opts || (opts = {});
      this.router = opts.router || app.router;

      this.listenTo(this.model, {
        "change":   function () { this.render(); },
        "destroy":  function () { this.remove(); }
      });
    },

    render: function () {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    },

    viewNote: function () {
      var loc = ["note", this.model.id, "view"].join("/");
      this.router.navigate(loc, { trigger: true });
    },

    editNote: function () {
      var loc = ["note", this.model.id, "edit"].join("/");
      this.router.navigate(loc, { trigger: true });
    },

    deleteNote: function () {
      // Destroying model triggers view cleanup.
      this.model.destroy();
    }

  });
}());
