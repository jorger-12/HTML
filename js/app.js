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
if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

window.onload = function () {
  setTimeout(() => {
    window.scrollTo(0, 0);
  }, 0);
};
const form = document.getElementById("consultationForm");
const formMessage = document.getElementById("formMessage");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const selectedService = document.querySelector(
    'input[name="service"]:checked'
  );

  const formData = {
    name: form.querySelector('input[type="text"]').value,
    email: form.querySelector('input[type="email"]').value,
    phone: form.querySelector('input[type="tel"]').value,
    company: form.querySelectorAll('input[type="text"]')[1].value,
    service: selectedService ? selectedService.value : "",
    project: form.querySelector("textarea").value,
  };

  try {
    const response = await fetch("https://script.google.com/macros/s/AKfycbykcUF81uBQ6Rtt0wRns0HdD_6J-v_5CN8XCOQZMNI1-g0d0toBPc6Rhm3sHYjuYLUu/exec", {
      method: "POST",
      body: JSON.stringify(formData),
    });

    const result = await response.json();

    if (result.success) {
      formMessage.textContent = "Consultation request sent successfully.";
      form.reset();
    } else {
      formMessage.textContent = "Something went wrong. Please try again.";
    }
  } catch (error) {
    formMessage.textContent = "Something went wrong. Please try again.";
  }
});

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);