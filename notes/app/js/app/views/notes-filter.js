(function () {
  'use strict';

  // Notes Filter View
  // -----------------
  // Controls search filter and emits filter events.
  App.Views.NotesFilter = Backbone.View.extend({

    el: ".navbar-search",

    events: {
      // Disable form submission.
      "submit": function () { return false; },

      // Call filter on any data change.
      "change   .search-query": "filterNotes",
      "keypress .search-query": "filterNotes",
      "keyup    .search-query": "filterNotes"
    },

    initialize: function () {
      this.$filter = this.$(".search-query");
      this._query = this.$filter.val().trim();

      // Apply filter for any newly-added notes.
      //
      // **Note**: This implicitly depends on the list element
      // existing in the DOM, which means the NotesView has to add
      // collection listeners **first**. A better approach would be
      // to have the Notes view emit its own "notes:add" event after
      // adding the DOM element.
      //
      this.listenTo(this.collection, "notes:add", this.filterNote);
    },

    // Return true if query token occurs in value.
    isMatch: function (query, value) {
      // Empty query matches everything.
      if (_.isEmpty(query)) { return true; }

      // Find lower-cased matches.
      value = value.toLowerCase();
      query = query.toLowerCase();

      return value.indexOf(query) > -1;
    },

    // Show or hide note based on filter value.
    filterNote: function (model) {
      var $note = $("#" + model.id),
        match = this.isMatch(this._query, model.get("title"));

      // Show matches, else hide.
      match ? $note.show() : $note.hide();
    },

    // Apply filter to all notes in collection.
    filterNotes: function () {
      var query = this.$filter.val().trim();

      // If query changed, store and apply to collection.
      if (query !== this._query) {
        this._query = query;
        this.collection.each(this.filterNote, this);
      }
    }

  });
}());
