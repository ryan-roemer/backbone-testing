/*jslint maxlen: 200 */
// Underscore Templates

App.Templates["template-notes-item"] =
  "<td class=\"note-name\">" +
  "  <div class=\"note-title note-view\"><%= title %></div>" +
  "</td>" +
  "<td class=\"note-action\">" +
  "  <div class=\"btn-group pull-right\">" +
  "    <button class=\"btn note-edit\">" +
  "      <i class=\"icon-pencil\"></i>" +
  "    </button>" +
  "    <button class=\"btn note-delete\">" +
  "      <i class=\"icon-trash\"></i>" +
  "    </button>" +
  "  </div>" +
  "</td>";

App.Templates["template-note"] =
  "<div id=\"note-pane-view\" class=\"pane\">" +
  "  <div id=\"note-pane-view-content\"></div>" +
  "</div>" +
  "<div id=\"note-pane-edit\" class=\"pane\">" +
  "  <form id=\"note-form-edit\">" +
  "    <input id=\"input-title\" class=\"input-block-level\"" +
  "           type=\"text\" placeholder=\"title\"" +
  "           value=\"<%= title %>\">" +
  "    <textarea id=\"input-text\" class=\"input-block-level\"" +
  "              rows=\"15\"><%= text %></textarea>" +
  "  </form>" +
  "</div>";

App.Templates["template-note-view"] =
  "<div class=\"well well-small\">" +
  "  <h2 id=\"pane-title\"><%= title %></h2>" +
  "</div>" +
  "<div id=\"pane-text\"><%= text %></div>";

