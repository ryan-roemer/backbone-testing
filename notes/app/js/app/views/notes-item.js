(function () {
  'use strict';

  // Notes Item View
  // ---------------
  // A single note within a list of notes.
  App.Views.NotesItem = Backbone.View.extend({

    id: function () { return this.model.id; },

    tagName: "tr",

    className: "notes-item",

    template: _.template(App.Templates["template-notes-item"]),

    events: {
      "click .note-view": "viewNote",
      "click .note-edit": "editNote",
      "click .note-delete": "deleteNote"
    },

    initialize: function () {
      this.listenTo(this.model, {
        "change": this.render,
        "destroy": this.remove
      });
    },

    render: function () {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    },

    viewNote: function () {
      var hash = ["note", this.model.id, "view"].join("/");
      app.router.navigate(hash, { trigger: true });
    },

    editNote: function () {
      var hash = ["note", this.model.id, "edit"].join("/");
      app.router.navigate(hash, { trigger: true });
    },

    deleteNote: function () {
      // Destroying model triggers view cleanup.
      this.model.destroy();
    }

  });
}());
