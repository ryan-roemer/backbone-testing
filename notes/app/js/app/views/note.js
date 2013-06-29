(function () {
  'use strict';

  // Note View
  // ---------
  // A single note.
  //
  // Contains:
  // * App.Views.NoteNav: Helper view for navigation events.
  // * App.Views.NoteView: Child view for rendering Markdown.
  //
  App.Views.Note = Backbone.View.extend({

    id: "note-panes",

    template: _.template(App.Templates["template-note"]),

    events: {
      "blur   #note-form-edit": "saveNote",
      "submit #note-form-edit": function () { return false; }
    },

    initialize: function (attrs, opts) {
      // Default to empty options.
      opts || (opts = {});

      // Add member variables.
      //
      // Router can be set directly (e.g., tests), or use global.
      // The `app.router` object *does* exist at this point.
      this.nav = opts.nav;
      this.router = opts.router || app.router;

      // Verification.
      // -- Line Omitted in Book. --
      if (!this.router) { throw new Error("No router"); }

      // Add our custom listeners.
      this._addListeners();

      // Render HTML, update to action, and show note.
      this.$el.html(this.template(this.model.toJSON()));
      this.update(opts.action || "view");
      this.render();

      // Add in viewer child view (which auto-renders).
      this.noteView = new App.Views.NoteView({
        el: this.$("#note-pane-view-content"),
        model: this.model
      });
    },

    // Helper listener initialization method.
    _addListeners: function () {
      // Model controls view rendering and existence.
      this.listenTo(this.model, {
        "destroy": function () { this.remove(); },
        "change":  function () { this.render().model.save(); }
      });

      // Navbar controls/responds to panes.
      this.listenTo(this.nav, {
        "nav:view":   function () { this.viewNote(); },
        "nav:edit":   function () { this.editNote(); },
        "nav:delete": function () { this.deleteNote(); }
      });

      // Respond to update events from router.
      this.on({
        "update:view": function () { this.render().viewNote(); },
        "update:edit": function () { this.render().editNote(); }
      });
    },

    // Rendering the note is simply showing the active pane.
    // All HTML should already be rendered during initialize.
    render: function () {
      $(".region").not(".region-note").hide();
      $(".region-note").show();
      return this;
    },

    remove: function () {
      // Remove child, then self.
      this.noteView.remove();
      Backbone.View.prototype.remove.call(this);
    },

    // Update internal "action" state (view or edit).
    update: function (action) {
      action = action || this.action || "view";
      var paneEl = "#note-pane-" + action,
        loc = "note/" + this.model.id + "/" + action;

      // Ensure menu bar is updated.
      this.nav.trigger("nav:update:" + action);

      // Show active pane.
      this.$(".pane").not(paneEl).hide();
      this.$(paneEl).show();

      // Store new action and navigate.
      if (this.action !== action) {
        this.action = action;
        this.router.navigate(loc, { replace: true });
      }
    },

    // Activate "view" or "edit" note panes.
    viewNote: function () {
      this.update("view");
    },
    editNote: function () {
      this.update("edit");
    },

    // Delete model (causes view removal) and navigate to
    // "all notes" list page.
    deleteNote: function () {
      if (confirm("Delete note?")) {
        this.model.destroy();
        this.router.navigate("", { trigger: true, replace: true });
      }
    },

    // Save note (triggering model change).
    saveNote: function () {
      this.model.set({
        title: this.$("#input-title").val().trim(),
        text: this.$("#input-text").val().trim()
      });
    }

  });
}());
