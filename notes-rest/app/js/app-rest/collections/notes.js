(function () {
  'use strict';

  // Notes Collection
  // ----------------
  App.Collections.Notes = Backbone.Collection.extend({

    model: App.Models.Note,

    url: "/api/notes"

  });
}());
