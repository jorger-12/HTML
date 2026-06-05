function toggleMenu() {
  const menu = document.getElementById("mobileMenu");
  const overlay = document.getElementById("menuOverlay");

  if (!menu || !overlay) return;

  menu.classList.add("active");
  overlay.classList.add("active");
}
function closeMenu() {
  const menu = document.getElementById("mobileMenu");
  const overlay = document.getElementById("menuOverlay");

  if (!menu || !overlay) return;

  menu.classList.remove("active");
  overlay.classList.remove("active");
}

const overlay = document.getElementById("menuOverlay");

if (overlay) {
  overlay.addEventListener("click", closeMenu);
}

let lastScrollY = window.scrollY;

function toggleSolutionsDropdown(event) {
  event.stopPropagation();

  const parent = event.currentTarget.closest(".nav-dropdown");

  document.querySelectorAll(".nav-dropdown").forEach((dropdown) => {
    if (dropdown !== parent) dropdown.classList.remove("active");
  });

  parent.classList.toggle("active");
}

document.addEventListener("click", () => {
  document.querySelectorAll(".nav-dropdown").forEach((dropdown) => {
    dropdown.classList.remove("active");
  });
});

function toggleMobileServices(event) {
  event.stopPropagation();

  const dropdown = event.currentTarget.closest(".mobile-menu-dropdown");

  if (!dropdown) return;

  dropdown.classList.toggle("active");
}


window.addEventListener("scroll", function () {
  const nav = document.querySelector("nav");
  const hamburger = document.querySelector(".hamburger");
  const currentScrollY = window.scrollY;

  if (currentScrollY > lastScrollY && currentScrollY > 80) {
    if (nav) nav.classList.add("hide");
    if (hamburger) hamburger.classList.add("hide");
  } else {
    if (nav) nav.classList.remove("hide");
    if (hamburger) hamburger.classList.remove("hide");
  }

  lastScrollY = currentScrollY;
});

/* SCROLL REVEAL */

const revealElements = document.querySelectorAll(".reveal");

function revealOnScroll() {
  revealElements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (elementTop < windowHeight - 80) {
      element.classList.add("active");
    }
  });
}


window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);