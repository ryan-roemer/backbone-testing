(function () {
  'use strict';

  // Notes Collection
  // ----------------
  App.Collections.Notes = Backbone.Collection.extend({

    model: App.Models.Note,

    url: App.Config.notesUrl,

    fetched: false,

    initialize: function () {
      // Check if fetched.
      this.once("reset", function () { this.fetched = true; });
    }

  });
}());
