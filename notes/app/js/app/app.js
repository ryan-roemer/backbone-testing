$(function () {
  'use strict';

  // Initialize and start the application.
  // Calling `new` kicks everything else off.
  app.collection = new App.Collections.Notes();
  app.notesView = new App.Views.Notes({
    collection: app.collection
  });
  app.noteNavView = new App.Views.NoteNav();
  app.router = new App.Routers.Router();

  // Set up a `ready` helper.
  // TODO: Decide if we want to kick off a `fetch` in app, not view.
  app.ready = function (callback) {
    if (app.collection.fetched) { return callback(); }
    app.collection.once("fetched", callback);
  };

  // Start history for routing.
  // (Should be delayed to page ready).
  Backbone.history.start();

});
