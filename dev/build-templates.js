#!/usr/bin/env node
// Build "notes-app/templates.html" to
// "notes-app/js/app/templates/templates.js"

// Libraries.
var fs = require("fs");

// Constants.
var TMPL_SRC_PATH = "./notes/app/templates.html",
  SCRIPT_RE = new RegExp(/<script([\s\S]|.)*?<\/script>/g),
  SCRIPT_ID_RE = /<script.*id="(.*?)"/,
  SCRIPT_TEXT_RE = /[\s]*<(\/|)script.*>[\s]*/g,
  SCRIPT_ESCAPES_RE = /\"/g;

// Builder function.
var _build = module.exports = function (srcPath, callback) {
  // Read into string.
  var tmplSrc = fs.readFileSync(srcPath).toString(),
    templates = [],
    buffer = [],
    results,
    scriptPart,
    scriptId;

  // Writer encapsulation.
  var _write = function (out) {
    if (callback) { callback(out); }
    buffer.push(out);
  };

  // Parse into array of id, text.
  while ((results = SCRIPT_RE.exec(tmplSrc)) !== null) {
    scriptPart = results[0];
    templates.push({
      id: SCRIPT_ID_RE.exec(scriptPart)[1],
      text: scriptPart
        .replace(SCRIPT_TEXT_RE, "")
        .replace(SCRIPT_ESCAPES_RE, "\\\"")
    });
  }

  // Output as a JS file.
  _write("/*jslint maxlen: 200 */");
  _write("// Underscore Templates\n");

  templates.forEach(function (tmpl) {
    var out = "",
      text = tmpl.text;

    out += "App.Templates[\"" + tmpl.id + "\"] =\n  \"";
    out += tmpl.text
      .split("\n")
      .map(function (t) { return t.replace(/^  /, ""); })
      .join("\" +\n  \"");
    out += "\";\n"

    _write(out);
  });

  return buffer.join("\n") + "\n";
};

// Script
if (require.main === module) {
  _build(TMPL_SRC_PATH, console.log);
}
