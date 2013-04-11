(function () {
  'use strict';

  // Router
  // ------
  // An abbreviated version of the real router.
  //
  // The real implementation of the Notes router is available at:
  // "notes/app/js/app/routers/router.js"
  App.Routers.Router = Backbone.Router.extend({

    routes: {
      "": "notes",
      "note/:id/:action": "note",
    },

    // Show notes list.
    notes: function () {
      // ... omitted ...
    },

    // Common single note edit/view.
    note: function (noteId, action) {
      // ... omitted ...
    }

  });
}());
