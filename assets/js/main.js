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
