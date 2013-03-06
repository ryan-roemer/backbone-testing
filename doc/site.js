// Reformat documentation and add in extra Bootstrap goodness.
$(function () {
  'use strict';

  var Transforms,
    // http://www.pinlady.net/PluginDetect/IE/
    IS_IE = /*@cc_on!@*/!1,
    // See: http://tanalin.com/en/articles/ie-version-js/
    IE_GTE_10 = !!window.atob;

  // Helpers.
  function slugify(val) {
    return val
      .toLowerCase()
      .replace(/[^\-a-zA-Z0-9\s]+/gi, '')
      .replace(/\-/gi, "_")
      .replace(/\s/gi, "-");
  }

  Transforms = {
    headingToHero: function () {
      // Get and detach header elements.
      var $h1 = $("h1").first(),
        $parent = $h1.parent(),
        $p = $h1.next("p").detach();

      // Replace with hero.
      $("#hero")
        .detach()
        .append($h1.detach(), $p)
        .prependTo($parent);
    },

    // Select old or modern grid and nav.
    gridAndNav: function () {
      IS_IE && !IE_GTE_10 ?
        Transforms.gridAndNavOldIe() :
        Transforms.gridAndNavModern();
    },

    gridAndNavOldIe: function () {
      var $window = $(window),
        $hero = $("#hero"),
        $content = $hero.nextAll().detach(),
        $grid = $("#grid-old-ie").detach(),
        $page = $grid.find("#page-old-ie").append($content);

      // Attach grid to DOM.
      $hero.after($grid);
    },

    gridAndNavModern: function () {
      var $window = $(window),
        $hero = $("#hero"),
        $content = $hero.nextAll().detach(),
        $headings = $content.filter("h2"),
        $grid = $("#grid").detach(),
        $nav = $grid.find("#sidenav"),
        $page = $grid.find("#page").append($content);

      // Add headings to nav.
      $headings.each(function () {
        var $heading = $(this),
          $item = $(".nav-item").clone(),
          slug = slugify($heading.text());

        // Add id to heading.
        $heading.attr("id", slug);

        // Append list item with attributes.
        $item
          .appendTo($nav)
          .find("> a")
            .attr("href", "#" + slug)
            .append($heading.text());
      });

      // Attach grid to DOM.
      $hero.after($grid);

      // Nav bar affix.
      // See: http://stackoverflow.com/a/14545840/741892
      $nav
        .affix({
          offset: {
            top: function () {
              return $window.width() <= 980 ? 290 : 210;
            },
            bottom: 270
          }
        })
        .show();

      // Nav bar scrollspy.
      $("body").scrollspy({ target: "#nav" });
      $('[data-spy="scroll"]').each(function () {
        $(this).scrollspy('refresh');
      });
      $nav.find("li.nav-item").on("click", function () {
        $(this).scrollspy('refresh');
      });
    },

    chapterExamples: function () {
      var $chapExs = $("h3:contains('Chapter')")
        .filter(function (i, el) {
          return (/^Chapter [1-6]:/).test($(el).text());
        });

      $chapExs.each(function () {
        var $list = $(this).next("ul").first(),
          $files = $list.find("li ul li a").filter(function () {
            return (/\.js$/).test($(this).text());
          });

        $files.addClass("examples-file");
      });
    },

    todos: function () { // TODO: Find all TODOs and remove.
      $("strong").each(function () {
        var $el = $(this),
          $parent = $el.parent("p");

        // Only process TODOs.
        if (!/^TODO/.test($el.text())) { return; }

        // Add highlight class.
        $el.addClass("TODO");

        // Separate p's for different elements.
        if ($el.prev("strong")) {
          $parent.before($("<p />").append($el.detach()));
        }

        // Add brackets.
        $el.before("[").after("]");
      });
    }
  };

  // Apply transforms.
  _.each([
    Transforms.headingToHero,
    Transforms.gridAndNav,
    Transforms.chapterExamples,
    Transforms.todos
  ], function (fn) { fn(); });

});
