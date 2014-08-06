// Wrap closure in jQuery "ready" function, to ensure that the DOM
// is fully available for the rest of our application.
$(function () {
  'use strict';

  // Initialize application components.
  // The collection object comes first as views depend on it.
  app.collection = new App.Collections.Notes();

  // Views come next. Lazy dependency on router internally, meaning
  // that by the time we start using view methods, the `app.router`
  // object must exist. In practice, this isn't a big deal, because
  // the router is the ingress point that handles a request and
  // actually binds it to a view, allowing the view methods to be
  // called.
  app.notesView = new App.Views.Notes({
    collection: app.collection
  });
  app.noteNavView = new App.Views.NoteNav();

  // Router has dependencies on `app.*View` objects, so comes
  // after.
  app.router = new App.Routers.Router();

  // Wait until we have our initial collection from the backing
  // store before firing up the router.
  app.collection.once("reset", function () {
    Backbone.history.start();
  });

  // Now fetch collection data, kicking off everything.
  app.collection.fetch({ reset: true });

});
