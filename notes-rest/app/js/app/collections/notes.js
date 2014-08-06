(function () {
  'use strict';

  // Notes Collection
  // ----------------
  // Uses HTML `localStorage`.
  App.Collections.Notes = Backbone.Collection.extend({

    model: App.Models.Note,

    localStorage: new Backbone.LocalStorage(App.Config.storeName)

  });
}());
