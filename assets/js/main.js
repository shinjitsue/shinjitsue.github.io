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
   * Preloader with changing words
   */
  const words = [
    "Welcome", // English
    "Bienvenido", // Spanish
    "Bienvenue", // French
    "Willkommen", // German
    "Benvenuto", // Italian
    "欢迎", // Chinese (Simplified)
    "ようこそ", // Japanese
    "환영합니다", // Korean
    "Maligayang pagdating", // Filipino
    "Добро пожаловать", // Russian
    "Bem-vindo", // Portuguese
    "مرحبا", // Arabic
    "Välkommen", // Swedish
    "Welkom", // Dutch
    "Tervetuloa", // Finnish
    "Witamy", // Polish
    "Velkommen", // Norwegian
    "Swaagat hai", // Hindi
    "Chào mừng", // Vietnamese
    "Selamat datang", // Indonesian
    "خوش آمدید", // Persian
    "flag{f4k3_f14g}",
  ];

  let wordIndex = 0;
  const changingWordElement = document.getElementById("changing-word");
  const welcomeDuration = 1000; // 1 second for "Welcome"
  const otherDuration = 100; // 170ms for other words

  function showNextWord() {
    changingWordElement.textContent = words[wordIndex];
    let duration =
      words[wordIndex] === "Welcome" ? welcomeDuration : otherDuration;
    wordIndex = (wordIndex + 1) % words.length;
    setTimeout(showNextWord, duration);
  }

  function startPreloader() {
    const wordPreloader = document.getElementById("word-preloader");
    const preloader = document.getElementById("preloader");

    showNextWord(); // Start the word changing

    setTimeout(() => {
      wordPreloader.style.display = "none";
      preloader.style.display = "flex";
      setTimeout(() => {
        preloader.classList.add("loaded");
      }, 2000);
      setTimeout(() => {
        preloader.remove();
      }, 3000);
    }, words.length * otherDuration + welcomeDuration - otherDuration); // Adjust total duration
  }

  window.addEventListener("load", startPreloader);

  /**
   * Intro type effect
   */
  const aboutTyped = select(".type1 .typed");
  if (aboutTyped) {
    let typedStrings = aboutTyped.getAttribute("data-typed-items");
    typedStrings = typedStrings.split(",");
    new Typed(".type1 .typed", typedConfig(typedStrings));
  }

  function typedConfig(typedStrings) {
    return {
      strings: typedStrings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000,
    };
  }

  /**
   * Portfolio isotope and filter
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
          portfolioFilters.forEach((el) =>
            el.classList.remove("filter-active")
          );
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
  /**
   * Function to show the selected section and hide others
   */
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

    // Scroll to the top of the section
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Toggle visibility of particles.js container
    if (sectionId === "#home") {
      $("#particles-js").show();
      particlesJS("particles-js", {
        particles: {
          number: {
            value: 80,
            density: {
              enable: true,
              value_area: 800,
            },
          },
          color: {
            value: "#7a7a7a",
          },
          shape: {
            type: "circle",
            stroke: {
              width: 0,
              color: "#000000",
            },
            polygon: {
              nb_sides: 5,
            },
            image: {
              src: "img/github.svg",
              width: 100,
              height: 100,
            },
          },
          opacity: {
            value: 0.5,
            random: false,
            anim: {
              enable: false,
              speed: 1,
              opacity_min: 0.1,
              sync: false,
            },
          },
          size: {
            value: 3,
            random: true,
            anim: {
              enable: false,
              speed: 40,
              size_min: 0.1,
              sync: false,
            },
          },
          line_linked: {
            enable: true,
            distance: 150,
            color: "#7a7a7a",
            opacity: 0.4,
            width: 1,
          },
          move: {
            enable: true,
            speed: 6,
            direction: "none",
            random: false,
            straight: false,
            out_mode: "out",
            bounce: false,
            attract: {
              enable: false,
              rotateX: 600,
              rotateY: 1200,
            },
          },
        },
        interactivity: {
          detect_on: "canvas",
          events: {
            onhover: {
              enable: true,
              mode: "repulse",
            },
            onclick: {
              enable: true,
              mode: "push",
            },
            resize: true,
          },
          modes: {
            grab: {
              distance: 400,
              line_linked: {
                opacity: 1,
              },
            },
            bubble: {
              distance: 400,
              size: 40,
              duration: 2,
              opacity: 8,
              speed: 3,
            },
            repulse: {
              distance: 200,
              duration: 0.4,
            },
            push: {
              particles_nb: 4,
            },
            remove: {
              particles_nb: 2,
            },
          },
        },
        retina_detect: true,
      });
    } else {
      $("#particles-js").hide();
    }

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

  // Click event for offcanvas menu items
  $(".offcanvas-body .menu ul li a").on("click", function (e) {
    e.preventDefault(); // Prevent default anchor behavior

    // Remove active class from all menu items
    $(".offcanvas-body .menu ul li a").removeClass("active");

    // Add active class to the clicked menu item
    $(this).addClass("active");

    // Get the href attribute of the clicked menu item
    const sectionId = $(this).attr("href");

    // Show the corresponding section
    showSection(sectionId);

    // Close the offcanvas menu
    const offcanvasElement = document.getElementById("offcanvasDark");
    const offcanvasInstance = bootstrap.Offcanvas.getInstance(offcanvasElement);
    offcanvasInstance.hide();

    // Ensure the backdrop is removed and body overflow is restored
    setTimeout(() => {
      const backdrop = document.querySelector(".offcanvas-backdrop");
      if (backdrop) {
        backdrop.remove();
      }
      document.body.style.overflow = ""; // Restore body overflow
    }, 300); // Delay to ensure the offcanvas is fully closed before removing the backdrop
  });
});
