(function () {
  'use strict';

  // Router
  // ------
  // The router translates hash routes in to views.
  App.Routers.Router = Backbone.Router.extend({
    routes: {
      "": "notes",
      "note/:id/:action": "note",
    },

    initialize: function () {
      // Stash current note view for re-rendering.
      this.noteView = null;
    },

    // Show notes list.
    notes: function () {
      app.notesView.render();
    },

    // Common single note edit/view.
    note: function (noteId, action) {
      var coll = app.notesView.collection,
        model = null;

      // Check if we are already at currently active view.
      if (this.noteView) {
        if (this.noteView.model.id === noteId) {
          // Reuse existing note view if same note.
          return this.noteView.trigger("update:" + action);
        } else {
          // Else, remove the last stored view.
          this.noteView.remove();
        }
      }

      // Wait for model to arrive if fetching, then recurse.
      //
      // The collection is fetched on app startup, and this route
      // might fire *before* then, so we need to wait. An alternative
      // to this waiting approach is to **bootstrap** the data from
      // the server so that an initial collection fetch is
      // unnecessary.
      //
      // See: http://backbonejs.org/#FAQ-bootstrap
      //
      // However, as we support a `localStorage`-based approach for
      // our collection, we must do an initial collection fetch, as
      // there is no server to bootstrap from.
      if (!coll.fetched) {
        return coll.once("reset", function () {
          this.note(noteId, action);
        }, this);
      }

      // Try to find note in existing collection.
      model = coll.get(noteId);
      if (!model) {
        // Log error and go to home page on missing model.
        console.log("Error: No model for id: " + noteId);
        return app.router.navigate("", { trigger: true });
      }

      // Create note and add to DOM.
      this.noteView = new App.Views.Note({ model: model }, {
        action: action,
        nav: app.noteNavView
      });
      $("#note").html(this.noteView.render().$el);
    }

  });
}());
