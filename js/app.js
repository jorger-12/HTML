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
const customSelects = document.querySelectorAll(".custom-select");

customSelects.forEach((customSelect) => {
  const trigger = customSelect.querySelector(".custom-select-trigger");
  const triggerText = trigger.querySelector("span:first-child");
  const options = customSelect.querySelectorAll(".custom-option");
  const hiddenInput = customSelect.querySelector('input[type="hidden"]');

  trigger.addEventListener("click", (e) => {
    e.stopPropagation();

    customSelects.forEach((select) => {
      if (select !== customSelect) {
        select.classList.remove("active");
      }
    });

    customSelect.classList.toggle("active");
  });

  options.forEach((option) => {
    option.addEventListener("click", () => {
      triggerText.textContent = option.textContent.trim();
      hiddenInput.value = option.dataset.value;
      customSelect.classList.remove("active");
    });
  });
});

document.addEventListener("click", () => {
  customSelects.forEach((select) => {
    select.classList.remove("active");
  });
});

/* DESKTOP SERVICES MODAL */
const servicesData = [
  {
    title: "Website Design & Development",
    icon: "images/SKcomputer-icon.png",
    description:
      "Premium websites engineered to elevate your brand, build trust, and convert visitors into qualified opportunities.",
    items: [
      "Custom premium website design",
      "Responsive desktop + mobile optimization",
      "Lead capture & consultation forms",
      "SEO-ready site structure",
      "Hosting & deployment setup",
      "Brand-focused user experience",
    ],
  },
  {
    title: "Automation & Integration",
    icon: "images/SKautomation-icon.png",
    description:
      "Reduce manual work and create operational efficiency through intelligent automation systems.",
    items: [
      "Workflow automation setup",
      "Lead routing automation",
      "Form integrations",
      "CRM connection support",
      "Notification automations",
      "Operational efficiency systems",
    ],
  },
  {
    title: "Data & Business Systems",
    icon: "images/SKsystem-icon.png",
    description:
      "Organized systems that help your business track, manage, and scale with clarity.",
    items: [
      "Lead tracking systems",
      "Business data organization",
      "Internal workflow systems",
      "Client information tracking",
      "Operational dashboards",
      "Scalable business infrastructure",
    ],
  },
  {
    title: "Analytics & Reporting",
    icon: "images/SKanalytics-icon.png",
    description:
      "Actionable reporting and performance visibility so decisions are backed by real business insight.",
    items: [
      "Performance dashboards",
      "Lead reporting",
      "Website analytics insights",
      "Business KPI tracking",
      "Custom reporting structure",
      "Decision-focused data visibility",
    ],
  },
  {
    title: "Strategy & Optimization",
    icon: "images/SKstrategy-icon.png",
    description:
      "Strategic refinement focused on improving growth, efficiency, and digital performance.",
    items: [
      "Digital growth consulting",
      "Conversion optimization",
      "Process refinement",
      "Performance strategy",
      "Operational review",
      "Scalable optimization planning",
    ],
  },
];

let currentServiceIndex = 0;

const modal = document.getElementById("serviceModal");
const modalTitle = document.getElementById("modalServiceTitle");
const modalIcon = document.getElementById("modalServiceIcon");
const modalDescription = document.getElementById("modalServiceDescription");
const modalList = document.getElementById("modalServiceList");
const modalPrev = document.getElementById("modalPrevName");
const modalNext = document.getElementById("modalNextName");
const modalDots = document.getElementById("modalDots");
const modalCount = document.getElementById("modalCount");

function renderServiceModal(index) {
  const service = servicesData[index];

  modalTitle.textContent = service.title;
  modalIcon.src = service.icon;
  modalDescription.textContent = service.description;

  modalList.innerHTML = "";
  service.items.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    modalList.appendChild(li);
  });

  const prevIndex =
    (index - 1 + servicesData.length) % servicesData.length;
  const nextIndex =
    (index + 1) % servicesData.length;

  modalPrev.textContent = servicesData[prevIndex].title;
  modalNext.textContent = servicesData[nextIndex].title;

  modalDots.innerHTML = "";
  servicesData.forEach((_, i) => {
    const dot = document.createElement("span");
    if (i === index) dot.classList.add("active");
    modalDots.appendChild(dot);
  });

  modalCount.textContent = `${index + 1} / ${servicesData.length}`;
}

function openServiceModal(index) {
  currentServiceIndex = index;
  renderServiceModal(index);
  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeServiceModal() {
  modal.classList.remove("active");
  document.body.style.overflow = "";
}

function changeService(direction) {
  currentServiceIndex =
    (currentServiceIndex + direction + servicesData.length) %
    servicesData.length;

  renderServiceModal(currentServiceIndex);
}

document.querySelectorAll(".desktop-service-card a").forEach((link, index) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    openServiceModal(index);
  });
});

modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    closeServiceModal();
  }
});

/* MOBILE SERVICES MODAL */
let currentMobileServiceIndex = 0;

const mobileModal = document.getElementById("mobileServiceModal");
const mobileModalTitle = document.getElementById("mobileModalTitle");
const mobileModalIcon = document.getElementById("mobileModalIcon");
const mobileModalDescription = document.getElementById("mobileModalDescription");
const mobileModalList = document.getElementById("mobileModalList");
const mobileModalDots = document.getElementById("mobileModalDots");

function renderMobileServiceModal(index) {
  const service = servicesData[index];

  mobileModalTitle.textContent = service.title;
  mobileModalIcon.src = service.icon;
  mobileModalDescription.textContent = service.description;

  mobileModalList.innerHTML = "";
  service.items.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    mobileModalList.appendChild(li);
  });

  mobileModalDots.innerHTML = "";
  servicesData.forEach((_, i) => {
    const dot = document.createElement("span");
    if (i === index) dot.classList.add("active");
    mobileModalDots.appendChild(dot);
  });
}

function openMobileServiceModal(index) {
  currentMobileServiceIndex = index;
  renderMobileServiceModal(index);
  mobileModal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeMobileServiceModal() {
  mobileModal.classList.remove("active");
  document.body.style.overflow = "";
}

function changeMobileService(direction) {
  currentMobileServiceIndex =
    (currentMobileServiceIndex + direction + servicesData.length) %
    servicesData.length;

  renderMobileServiceModal(currentMobileServiceIndex);
}

document.querySelectorAll(".mobile-service-grid .service-card").forEach((card, index) => {
  card.addEventListener("click", () => {
    openMobileServiceModal(index % servicesData.length);
  });
});

mobileModal.addEventListener("click", (e) => {
  if (e.target === mobileModal) {
    closeMobileServiceModal();
  }
});

/* SOLUTIONS NAV DROPDOWN */

function toggleSolutionsDropdown(event) {
  event.stopPropagation();

  const dropdown = event.currentTarget.closest(".nav-dropdown");

  document.querySelectorAll(".nav-dropdown").forEach((item) => {
    if (item !== dropdown) {
      item.classList.remove("open");
    }
  });

  dropdown.classList.toggle("open");
}

document.addEventListener("click", () => {
  document.querySelectorAll(".nav-dropdown").forEach((item) => {
    item.classList.remove("open");
  });
});

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);