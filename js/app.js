
      const menu = document.getElementById("mobileMenu");
      const overlay = document.getElementById("menuOverlay");

      function toggleMenu() {
        menu.classList.toggle("active");
        overlay.classList.toggle("active");
      }

      function closeMenu() {
        menu.classList.remove("active");
        overlay.classList.remove("active");
      }

      overlay.addEventListener("click", closeMenu);

      let lastScrollY = window.scrollY;

      window.addEventListener("scroll", () => {
        const nav = document.querySelector("nav");
        const currentScrollY = window.scrollY;

        if (Math.abs(currentScrollY - lastScrollY) > 5) {
          if (currentScrollY > lastScrollY && currentScrollY > 50) {
            nav.classList.add("hide");
          } else {
            nav.classList.remove("hide");
          }
          lastScrollY = currentScrollY;
        }
      });
  