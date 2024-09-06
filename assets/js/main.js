(function () {
  "use strict";
  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim();
    if (all) {
      return [...document.querySelectorAll(el)];
    } else {
      return document.querySelector(el);
    }
  };

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all);

    if (selectEl) {
      if (all) {
        selectEl.forEach((e) => e.addEventListener(type, listener));
      } else {
        selectEl.addEventListener(type, listener);
      }
    }
  };

  /**
   * Preloader
   */
  const preloader = select("#preloader");
  if (preloader) {
    window.addEventListener("load", () => {
      setTimeout(() => {
        preloader.classList.add("loaded");
      }, 2000);
      setTimeout(() => {
        preloader.remove();
      }, 3000);
    });
  }

  /**
   * Intro type effect
   */
  const about_typed = select(".type1 .typed");
  if (about_typed) {
    let typed_strings = about_typed.getAttribute("data-typed-items");
    typed_strings = typed_strings.split(",");
    new Typed(".type1 .typed", typedConfig(typed_strings));
  }

  function typedConfig(typed_strings) {
    return {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000,
    };
  }

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener("load", () => {
    let portfolioContainer = select(".portfolio-container");
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: ".portfolio-item",
        layoutMode: "fitRows",
      });

      let portfolioFilters = select("#portfolio-flters li", true);

      on(
        "click",
        "#portfolio-flters li",
        function (e) {
          e.preventDefault();
          portfolioFilters.forEach(function (el) {
            el.classList.remove("filter-active");
          });
          this.classList.add("filter-active");

          portfolioIsotope.arrange({
            filter: this.getAttribute("data-filter"),
          });
        },
        true
      );
    }
  });

  /**
   * Initiate portfolio lightbox
   */
  const portfolioLightbox = GLightbox({
    selector: ".portfolio-lightbox",
  });

  /**
   * Initiate portfolio details lightbox
   */
  const portfolioDetailsLightbox = GLightbox({
    selector: ".portfolio-details-lightbox",
    width: "90%",
    height: "90vh",
  });

  /**
   * Portfolio details slider
   */
  new Swiper(".portfolio-details-slider", {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
      clickable: true,
    },
  });
})();

$(document).ready(function () {
  // Function to show the selected section and hide others
  function showSection(sectionId) {
    const parentContainer = $(".main-content");

    // Hide overflow to prevent scroll bar during animation
    parentContainer.css("overflow", "hidden");

    $(".main-content > div")
      .removeClass("visible-section fade-in-up")
      .addClass("hidden-section"); // Hide all sections
    $(sectionId)
      .removeClass("hidden-section")
      .addClass("visible-section fade-in-up"); // Show the selected section with animation

    // Remove the animation class and restore overflow after the animation completes
    setTimeout(() => {
      $(sectionId).removeClass("fade-in-up");
      parentContainer.css("overflow", ""); // Restore overflow
    }, 500); // Match the duration of the animation
  }

  function cursor() {
    "use strict";
    var myCursor = jQuery(".mouse-cursor");
    if (myCursor.length) {
      if ($("body")) {
        const e = document.querySelector(".cursor-inner"),
          t = document.querySelector(".cursor-outer");
        let n,
          i = 0,
          o = !1;

        console.log("Cursor elements found:", e, t); // Debugging line

        (window.onmousemove = function (s) {
          o ||
            (t.style.transform =
              "translate(" + s.clientX + "px, " + s.clientY + "px)"),
            (e.style.transform =
              "translate(" + s.clientX + "px, " + s.clientY + "px)"),
            (n = s.clientY),
            (i = s.clientX);
        }),
          $("body").on("mouseenter", "a, .cursor-pointer", function () {
            e.classList.add("cursor-hover"), t.classList.add("cursor-hover");
          }),
          $("body").on("mouseleave", "a, .cursor-pointer", function () {
            ($(this).is("a") && $(this).closest(".cursor-pointer").length) ||
              (e.classList.remove("cursor-hover"),
              t.classList.remove("cursor-hover"));
          }),
          (e.style.visibility = "visible"),
          (t.style.visibility = "visible");
      }
    } else {
      console.log("Cursor elements not found"); // Debugging line
    }
  }

  // Call the cursor function
  cursor();

  // Set default active state
  $(".menu ul li:first-child a").addClass("active");
  showSection("#home");

  // Click event for menu items
  $(".menu ul li a").on("click", function (e) {
    e.preventDefault(); // Prevent default anchor behavior

    // Remove active class from all menu items
    $(".menu ul li a").removeClass("active");

    // Add active class to the clicked menu item
    $(this).addClass("active");

    // Get the href attribute of the clicked menu item
    const sectionId = $(this).attr("href");

    // Show the corresponding section
    showSection(sectionId);
  });
});
