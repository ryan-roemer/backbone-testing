/*jslint maxlen: 200 */
// Underscore Templates

App.Templates["template-notes-item"] =
  "<td class=\"note-name\">" +
  "  <div class=\"note-title note-view\"><%= title %></div>" +
  "</td>" +
  "<td class=\"note-action\">" +
  "  <div class=\"btn-group btn-group-sm pull-right\">" +
  "    <button class=\"btn btn-default note-edit\">" +
  "      <span class=\"glyphicon glyphicon-pencil\"></span>" +
  "    </button>" +
  "    <button class=\"btn btn-default note-delete\">" +
  "      <span class=\"glyphicon glyphicon-trash\"></span>" +
  "    </button>" +
  "  </div>" +
  "</td>";

App.Templates["template-note"] =
  "<div id=\"note-pane-view\" class=\"pane\">" +
  "  <div id=\"note-pane-view-content\"></div>" +
  "</div>" +
  "<div id=\"note-pane-edit\" class=\"pane\">" +
  "  <form id=\"note-form-edit\" role=\"form\">" +
  "    <div class=\"form-group\">" +
  "      <input id=\"input-title\" class=\"form-control\"" +
  "             type=\"text\" placeholder=\"title\"" +
  "             value=\"<%= title %>\">" +
  "    </div>" +
  "    <div class=\"form-group\">" +
  "      <textarea id=\"input-text\" class=\"form-control\"" +
  "                rows=\"15\"><%= text %></textarea>" +
  "    </div>" +
  "  </form>" +
  "</div>";

App.Templates["template-note-view"] =
  "<div class=\"well well-small\">" +
  "  <h2 id=\"pane-title\"><%= title %></h2>" +
  "</div>" +
  "<div id=\"pane-text\"><%= text %></div>";

