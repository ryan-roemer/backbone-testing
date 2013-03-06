(function () {
  'use strict';

  // Note View
  // ---------
  // A single note.
  //
  // Contains:
  // * App.Views.NoteNav: Helper view for navigation events.
  // * App.Views.NoteView: Child view for rendering Markdown.
  App.Views.Note = Backbone.View.extend({

    id: "note-panes",

    template: _.template(App.Templates["template-note"]),

    events: {
      "blur   #note-form-edit": "saveNote",
      "submit #note-form-edit": function () { return false; }
    },

    initialize: function (attrs, opts) {
      var action = opts.action || "view";

      // Model controls view rendering and existence.
      this.listenTo(this.model, "destroy", this.remove);
      this.listenTo(this.model, "change", function () {
        this.render();
        this.model.save();
      });

      // Navbar controls/responds to panes.
      this.nav = opts.nav;
      this.listenTo(this.nav, "nav:view", this.viewNote);
      this.listenTo(this.nav, "nav:edit", this.editNote);
      this.listenTo(this.nav, "nav:delete", this.deleteNote);

      // Respond to update events from router.
      this.on("update:view", this.viewNote);
      this.on("update:view", this.render);
      this.on("update:edit", this.editNote);
      this.on("update:edit", this.render);

      // Render template, add to DOM, stash references.
      this.$el.html(this.template(this.model.toJSON()));
      this.$title = this.$("#input-title");
      this.$text = this.$("#input-text");

      // Set up action state, render, and add in child view.
      this.action = null;
      this.update(action);
      this.render();
      this.noteView = new App.Views.NoteView({
        el: this.$("#note-pane-view-content"),
        model: this.model
      });
    },

    render: function () {
      // Show appropriate region.
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
      var oldAction = this.action,
        paneEl = "#note-pane-" + action,
        hash = null;

      // Ensure nav bar is updated.
      this.nav.trigger("nav:update:" + action);

      // Show active pane.
      this.$(".pane").not(paneEl).hide();
      this.$(paneEl).show();

      // Store new action, trigger navbar and navigate.
      if (action !== oldAction) {
        this.action = action;

        hash = ["note", this.model.id, action].join("/");
        app.router.navigate(hash, { replace: true });
      }

      return false;
    },

    // Activate "view" note pane.
    viewNote: function () {
      return this.update("view");
    },

    // Activate "edit" note pane.
    editNote: function () {
      return this.update("edit");
    },

    // Delete model (propagating view removal).
    deleteNote: function () {
      if (confirm("Delete note?")) {
        this.model.destroy();
        app.router.navigate("", { trigger: true, replace: true });
      }

      return false;
    },

    // Save note (triggering model change).
    saveNote: function () {
      this.model.set({
        title: this.$title.val().trim(),
        text: this.$text.val().trim()
      });

      return false;
    }

  });
}());
