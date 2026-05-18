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

let serviceIndex = 0;

function scrollServices(direction) {
  const carousel = document.getElementById("serviceCarousel");
  const card = carousel.querySelector(".service-card");
  const gap = 14;

  const totalCards = carousel.querySelectorAll(".service-card").length / 2;
  const step = card.offsetWidth + gap;

  serviceIndex += direction;

  if (serviceIndex < 0) {
    serviceIndex = totalCards - 1;
  }

  if (serviceIndex >= totalCards) {
    serviceIndex = 0;
  }

  carousel.scrollTo({
    left: serviceIndex * step,
    behavior: "smooth",
  });
}