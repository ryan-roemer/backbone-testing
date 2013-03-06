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

// Read into string.
var tmplSrc = fs.readFileSync(TMPL_SRC_PATH).toString(),
 templates = [],
 results,
 scriptPart,
 scriptId;

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
console.log("/*jslint maxlen: 200 */");
console.log("// Underscore Templates\n");

templates.forEach(function (tmpl) {
  var out = "",
    text = tmpl.text;

  out += "App.Templates[\"" + tmpl.id + "\"] =\n  \"";
  out += tmpl.text
    .split("\n")
    .map(function (t) { return t.replace(/^  /, ""); })
    .join("\" +\n  \"");
  out += "\";\n"

  console.log(out);
});
