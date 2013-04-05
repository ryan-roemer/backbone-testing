(function () {
  'use strict';

  var ENTER = 13;

  // Notes View
  // ----------
  // Displays a list of notes.
  //
  // Contains:
  // * App.Views.NotesFilter: Helper view for query filter.
  // * App.Views.NotesItem: Child view for single note listing.
  //
  App.Views.Notes = Backbone.View.extend({

    el: "#notes",

    events: {
      "click    #note-create": function () {
        this.createNote();
      },
      "keypress #note-new-input": function (ev) {
        this.enterNote(ev);
      }
    },

    initialize: function () {
      // Cache view and just show on re-render.
      this.$input = this.$("#note-new-input");

      // Add notes when we get data.
      //
      // **Note**: This has to come **before** the filter view
      // instantiation which relies on `addNote` creating a DOM
      // element first in its events. Brittle, but simpler for this
      // demonstration.
      //
      this.listenTo(this.collection, {
        "reset":     function ()  { this.addNotes(); },
        "notes:add": function (m) { this.addNote(m); }
      });

      // Create helper filter view.
      this.filterView = new App.Views.NotesFilter({
        collection: this.collection
      });

      // Need the collection to be fetched to kick off adding notes.
      // This is currently done in "app.js"
    },

    render: function () {
      // Show appropriate region.
      $(".region").not(".region-notes").hide();
      $(".region-notes").show();
      return this;
    },

    // Add single child note view to front of notes list.
    addNote: function (model) {
      var view = new App.Views.NotesItem({ model: model });

      this.$("#notes-list tr")
        .filter(":last")
        .after(view.render().$el);
    },

    // Clear and add all notes to notes list.
    addNotes: function () {
      // Clear existing child note items.
      this.$("#notes-list tr.notes-item").remove();

      // Add all notes from collection, sorted old to new.
      this.collection.chain()
        .sortBy(function (m) { return m.get("createdAt"); })
        .each(this.addNote, this);
    },

    // Create note on enter key.
    enterNote: function (ev) {
      if (ev.which === ENTER) {
        this.createNote();
      }
    },

    createNote: function () {
      // Get value, then reset note input.
      var input = this.$input.val().trim();
      this.$input.val("");

      if (input) {
        this.create(input);
      }
    },

    create: function (title) {
      var coll = this.collection;

      // Add new model to collection, and corresponding note
      // to DOM after model is saved.
      coll.create({ title: title }, {
        success: function (colData, modelData) {
          // Trigger event on model retrieved from collection.
          coll.trigger("notes:add", coll.get(modelData.id));
        }
      });
    }

  });
}());
