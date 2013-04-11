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
    background: function () {
      // Tweak IE 10 to have no opacity.
      if (IS_IE && IE_GTE_10) {
        $("#page")
          .removeClass("bg")
          .addClass("bg-ie");
      }

      // Short circuit if no backstrech.
      if (!$.backstretch) { return; }

      // Backstretch images from http://www.public-domain-photos.com/
      // - clouds: landscapes/sky/clouds-2-4.htm
      // - sunrise: landscapes/sky/sunrise-3-4.htm
      // - yosemite: travel/yosemite/yosemite-meadows-4.htm
      $.backstretch("doc/img/bg/clouds.jpg");
      $(".backstretch").addClass("hidden-phone");
    },

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

      // Nav bar scroll animation.
      $("li.nav-item > a").click(function () {
        $("html, body").animate({
          scrollTop: $($(this).attr("href")).offset().top + "px"
        }, {
          duration: 400,
          easing: "swing"
        });
        return false;
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
        $el.hide(); // TODO REMOVE (temporarily hiding).
        // TODO REENABLE $el.before("[").after("]");
      });
    }
  };

  // Apply transforms.
  _.each([
    Transforms.background,
    Transforms.headingToHero,
    Transforms.todos,             // TODO REMOVE
    Transforms.gridAndNav,
    Transforms.chapterExamples
  ], function (fn) { fn(); });

});
