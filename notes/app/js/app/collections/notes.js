(function () {
  'use strict';

  // Notes Collection
  // ----------------
  // Uses HTML `localStorage`.
  App.Collections.Notes = Backbone.Collection.extend({

    model: App.Models.Note,

    localStorage: new Backbone.LocalStorage(App.Config.storeName),

    fetched: false,

    initialize: function () {
      // Stash if we have sync'ed with datastore.
      this.once("reset", function () { this.fetched = true; });
    }

  });
}());
