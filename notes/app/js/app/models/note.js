(function () {
  'use strict';

  // Note Model
  // ----------
  App.Models.Note = Backbone.Model.extend({

    defaults: function () {
      return {
        title: "",
        text: "*Edit your note!*",
        createdAt: new Date()
      };
    }

  });
}());
