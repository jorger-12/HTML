const menu = document.getElementById("mobileMenu");
const overlay = document.getElementById("menuOverlay");

function toggleMenu() {
  if (!menu || !overlay) return;
  menu.classList.toggle("active");
  overlay.classList.toggle("active");
}

function closeMenu() {
  if (!menu || !overlay) return;
  menu.classList.remove("active");
  overlay.classList.remove("active");
}

if (overlay) {
  overlay.addEventListener("click", closeMenu);
}

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

if (modal) {
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeServiceModal();
    }
  });
}

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

if (mobileModal) {
  mobileModal.addEventListener("click", (e) => {
    if (e.target === mobileModal) {
      closeMobileServiceModal();
    }
  });
}

window.addEventListener("scroll", function () {
  const nav = document.querySelector("nav");
  const currentScrollY = window.scrollY;

  if (!nav) return;

  if (currentScrollY > lastScrollY && currentScrollY > 80) {
    nav.classList.add("hide");
  } else {
    nav.classList.remove("hide");
  }

  lastScrollY = currentScrollY;
});

const packageOrder = ["foundation", "expansion", "signature", "bespoke"];
let currentPackageIndex = 0;

const packageData = {
  foundation: {
    label: "Launch Experience",
    title: "Foundation",
    price: "Starting at $295",
    timeline: "5–10 business days",
    includes: [
      "Single-page website experience",
      "Mobile-friendly responsive layout",
      "Contact information section",
      "Basic SEO setup",
      "Domain connection support",
      "1 revision",
    ],
    bestFor: [
      "Startups",
      "Simple service businesses",
      "Digital business-card websites",
      "Fast professional launches",
    ],
    upgrades: ["Contact form", "Booking integration", "Extra sections", "Lead tracking"],
  },

  expansion: {
    label: "Growth Experience",
    title: "Expansion",
    price: "Starting at $1,000+",
    timeline: "1–3 weeks",
    includes: [
      "Up to 2 pages",
      "Stronger custom layout",
      "Improved visual polish",
      "Light motion effects",
      "Basic SEO setup",
      "2 revisions",
    ],
    bestFor: [
      "Growing local businesses",
      "Service providers with multiple offers",
      "Brands needing more credibility",
      "Businesses ready to look more established",
    ],
    upgrades: ["Advanced quote form", "Appointment booking", "Analytics setup", "Lead management"],
  },

  signature: {
    label: "Executive Experience",
    title: "Signature",
    price: "Starting at $2,500+",
    timeline: "3–6 weeks",
    includes: [
      "3–5 page website experience",
      "Premium custom design",
      "Stronger user experience",
      "Advanced page layouts",
      "Refined motion effects",
      "3 revisions",
    ],
    bestFor: [
      "Established businesses",
      "Brands with multiple services",
      "Companies needing premium presentation",
      "Businesses ready to elevate perception",
    ],
    upgrades: ["CRM dashboard", "Premium motion", "SEO optimization", "Client portal"],
  },

  bespoke: {
    label: "Custom Digital Build",
    title: "Bespoke",
    price: "Custom Quote",
    timeline: "Timeline based on scope",
    includes: [
      "Custom website scope",
      "Advanced design direction",
      "Expanded page structure",
      "Strategy-based planning",
      "Custom functionality options",
      "Quote based on business needs",
    ],
    bestFor: [
      "Larger brands",
      "Complex websites",
      "Custom business tools",
      "Advanced digital builds",
    ],
    upgrades: ["Workflow automation", "Client portal", "Admin dashboard", "Custom integrations"],
  },
};

const packageModal = document.getElementById("packageModal");

function renderPackageModal(packageKey) {
  const data = packageData[packageKey];
  if (!data || !packageModal) return;

  currentPackageIndex = packageOrder.indexOf(packageKey);

  document.getElementById("modalLabel").textContent = data.label;
  document.getElementById("modalTitle").textContent = data.title;
  document.getElementById("modalPrice").textContent = data.price;
  document.getElementById("modalTimeline").textContent = data.timeline;

const progressPercent =
  ((currentPackageIndex + 1) / packageOrder.length) * 100;

document.getElementById("modalCount").innerHTML = `
  <div class="progress-track">
    <div class="progress-fill" style="width: ${progressPercent}%"></div>
  </div>
`;

  fillList("modalIncludes", data.includes);
  fillList("modalBestFor", data.bestFor);
  fillList("modalUpgrades", data.upgrades);

  const prevIndex =
    (currentPackageIndex - 1 + packageOrder.length) % packageOrder.length;

  const nextIndex =
    (currentPackageIndex + 1) % packageOrder.length;

 document.getElementById("modalPrevBtn").innerHTML =
  "← Previous Package";

document.getElementById("modalNextBtn").innerHTML =
  "Next Package →";
}

function fillList(id, items) {
  const list = document.getElementById(id);
  list.innerHTML = "";

  items.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    list.appendChild(li);
  });
}

document.querySelectorAll("[data-package]").forEach((button) => {
  button.addEventListener("click", (e) => {
    e.preventDefault();

    renderPackageModal(button.dataset.package);

const scrollbarWidth =
  window.innerWidth - document.documentElement.clientWidth;

document.body.style.overflow = "hidden";
document.body.style.paddingRight = `${scrollbarWidth}px`;

packageModal.classList.add("active");
  });
});

function changePackage(direction) {
  currentPackageIndex =
    (currentPackageIndex + direction + packageOrder.length) % packageOrder.length;

  renderPackageModal(packageOrder[currentPackageIndex]);
}

function closePackageModal() {
  packageModal.classList.remove("active");
  document.body.style.overflow = "";
  document.body.style.paddingRight = "";
}

if (packageModal) {
  packageModal.addEventListener("click", (e) => {
    if (e.target === packageModal) closePackageModal();
  });
}
/* ADD-ON MODAL */

const addonModal = document.getElementById("addonModal");
const addonModalClose = document.getElementById("addonModalClose");

const addonModalLabel = document.getElementById("addonModalLabel");
const addonModalTitle = document.getElementById("addonModalTitle");
const addonModalPrice = document.getElementById("addonModalPrice");
const addonModalPreview = document.getElementById("addonModalPreview");
const addonModalInfo = document.getElementById("addonModalInfo");

const addonPrevBtn = document.getElementById("addonPrevBtn");
const addonNextBtn = document.getElementById("addonNextBtn");
const addonProgressFill = document.getElementById("addonProgressFill");

const addonButtons = document.querySelectorAll(".addon-example-btn");
const addonCTA = document.querySelector(".addon-modal-cta");

let currentAddonIndex = 0;

const addonExamples = [
  {
    theme: "quote",
    label: "Premium Add-On",
    title: "Advanced Quote Form",
    price: "$500 – $750+",
    info: [
      "Smart lead qualification",
      "Multi-step intake flow",
      "Automated email routing",
      "Conversion-focused structure",
    ],
    preview: `
  <div class="showcase-browser">
    <div class="browser-top">
      <span></span><span></span><span></span>
      <p>quote.skintlsc.com/intake</p>
    </div>

    <form class="quote-demo-form" id="quoteDemoForm">
      <div class="quote-step active" data-step="1">
        <p class="mockup-label">Step 1 of 4</p>
        <h4>Project Basics</h4>

        <input type="text" placeholder="Business Name" />
        <input type="text" placeholder="Contact Name" />
        <input type="email" placeholder="Email Address" />

        <button type="button" class="fake-primary-btn quote-next">Continue</button>
      </div>

      <div class="quote-step" data-step="2">
        <p class="mockup-label">Step 2 of 4</p>
        <h4>Service Needed</h4>

        <select>
          <option>Website Development</option>
          <option>Appointment Booking</option>
          <option>Client Portal</option>
          <option>Workflow Automation</option>
        </select>

        <select>
          <option>$500 – $1,000</option>
          <option>$1,000 – $2,500</option>
          <option>$2,500+</option>
        </select>

        <button type="button" class="fake-primary-btn quote-next">Continue</button>
      </div>

      <div class="quote-step" data-step="3">
        <p class="mockup-label">Step 3 of 4</p>
        <h4>Project Details</h4>

        <textarea placeholder="Tell us what you need built..."></textarea>

        <button type="button" class="fake-primary-btn quote-next">Continue</button>
      </div>

      <div class="quote-step" data-step="4">
        <p class="mockup-label">Step 4 of 4</p>
        <h4>Review Request</h4>

        <div class="quote-summary-box">
          <strong>High Intent Lead</strong>
          <span>Ready for quote review</span>
        </div>

        <button type="button" class="fake-primary-btn">Submit Quote Request</button>
      </div>
    </form>
  </div>
`,
  },

  {
    theme: "booking",
    label: "Premium Add-On",
    title: "Appointment Booking",
    price: "$500 – $900+",
    info: [
      "Online appointment requests",
      "Calendar-ready booking flow",
      "Automated confirmations",
      "Mobile-friendly scheduling",
    ],
    preview: `
  <div class="showcase-browser">
    <div class="browser-top">
      <span></span><span></span><span></span>
      <p>booking.skintlsc.com/schedule</p>
    </div>

    <div class="booking-mockup">
      <div class="calendar-card">
        <div class="calendar-head">
          <strong>May 2026</strong>
          <span>Available Slots</span>
        </div>

        <div class="calendar-grid">
          <b class="unavailable">5</b>
          <b class="unavailable">6</b>
          <b class="unavailable">7</b>
          <b class="unavailable">8</b>
          <b class="unavailable">9</b>

          <b>12</b>
          <b>13</b>
          <b class="selected">14</b>
          <b>15</b>
          <b>16</b>

          <b>19</b>
          <b class="selected">20</b>
          <b>21</b>
          <b>22</b>
          <b>23</b>
        </div>

        <div class="calendar-summary">
          <span>3 available days this week</span>
          <strong>Next opening: May 14 at 10:30 AM</strong>
        </div>
      </div>

      <div class="mockup-panel booking-side">
        <p class="mockup-label">Selected Appointment</p>
        <h4>Strategy Call</h4>
        <div class="time-slot active">10:30 AM</div>
        <div class="time-slot">1:00 PM</div>
        <div class="time-slot">3:45 PM</div>
        <button class="fake-primary-btn">Request Appointment</button>
      </div>
    </div>
  </div>
`,
  },

  {
    theme: "dashboard",
    label: "Premium Add-On",
    title: "Lead Management Dashboard",
    price: "$250 – $650+",
    info: [
      "Lead status tracking",
      "Customer inquiry organization",
      "Follow-up visibility",
      "Simple business dashboard",
    ],
    preview: `
      <div class="showcase-browser">
        <div class="browser-top">
          <span></span><span></span><span></span>
          <p>dashboard.skintlsc.com/leads</p>
        </div>

        <div class="dashboard-mockup">
          <div class="analytics-card">
            <p>New Leads</p>
            <strong>28</strong>
            <span>+18% this week</span>
          </div>

          <div class="analytics-card">
            <p>Booked Calls</p>
            <strong>11</strong>
            <span>7 pending follow-ups</span>
          </div>

          <div class="analytics-card">
            <p>Conversion</p>
            <strong>39%</strong>
            <span>Lead to appointment</span>
          </div>

          <div class="lead-table">
            <div><b>Client</b><b>Status</b><b>Value</b></div>
            <div><span>Lead #1</span><em>New</em><strong>$1,200</strong></div>
            <div><span>Lead #2</span><em>Follow-up</em><strong>$2,500</strong></div>
            <div><span>Lead #3</span><em>Booked</em><strong>$1,000</strong></div>
          </div>
        </div>
      </div>
    `,
  },

  {
    theme: "payments",
    label: "Premium Add-On",
    title: "Payment Integration",
    price: "$500 – $1,200+",
    info: [
      "Online deposit collection",
      "Invoice payment support",
      "Secure payment flow",
      "Customer checkout experience",
    ],
    preview: `
      <div class="showcase-browser">
        <div class="browser-top">
          <span></span><span></span><span></span>
          <p>pay.skintlsc.com/checkout</p>
        </div>

        <div class="payment-mockup">
          <div class="invoice-card">
            <p class="mockup-label">Invoice #1028</p>
            <h4>Website Deposit</h4>
            <div class="invoice-line"><span>Project Deposit</span><strong>$500.00</strong></div>
            <div class="invoice-line"><span>Processing</span><strong>$0.00</strong></div>
            <div class="invoice-total"><span>Total Due</span><strong>$500.00</strong></div>
          </div>

          <div class="checkout-card">
            <div class="fake-card-chip">
  <span class="card-brand">SK INTERNATIONAL</span>
  <span class="card-number">•••• •••• •••• 2048</span>
  <span class="card-holder">CLIENT ACCOUNT</span>
</div>
            <h4>Secure Checkout</h4>
            <div class="fake-field">Card Number <strong>•••• •••• •••• 2048</strong></div>
            <div class="fake-field">Name <strong>Client Name</strong></div>
            <button class="fake-primary-btn">Pay Deposit</button>
          </div>
        </div>
      </div>
    `,
  },

  {
    theme: "portal",
    label: "Premium Add-On",
    title: "Client Portal",
    price: "$1,000 – $2,500+",
    info: [
      "Secure client access",
      "Project update area",
      "Document and file center",
      "Invoice and account visibility",
    ],
    preview: `
  <div class="showcase-browser">
    <div class="browser-top">
      <span></span><span></span><span></span>
      <p>portal.clientsite.com/customer</p>
    </div>

    <div class="portal-mockup">
      <div class="portal-sidebar">
        <strong>Customer Portal</strong>

        <div class="portal-customer-card">
          <small>Welcome Back</small>
          <h4>Client Name</h4>
          <p>Customer ID #2048</p>
        </div>

        <span class="active">Overview</span>
        <span>Appointments</span>
        <span>Documents</span>
        <span>Payments</span>
      </div>

      <div class="portal-content">
        <p class="mockup-label">Service Status</p>

        <div class="portal-status-title">
          Strategy Call
        </div>

        <div class="progress-large">
          <span style="width: 72%"></span>
        </div>

        <div class="portal-files">
          <div><span>Appointment</span><strong>May 14 • 10:30 AM</strong></div>
          <div><span>Estimate.pdf</span><strong>Ready</strong></div>
          <div><span>Warranty.pdf</span><strong>Uploaded</strong></div>
          <div><span>Balance</span><strong>$250 Due</strong></div>
        </div>
      </div>
    </div>
  </div>
`,
  },

  {
    theme: "automation",
    label: "Premium Add-On",
    title: "Workflow Automation",
    price: "Custom Quote",
    info: [
      "Automated follow-ups",
      "Internal task routing",
      "Lead notification systems",
      "Custom workflow planning",
    ],
    preview: `
      <div class="showcase-browser">
        <div class="browser-top">
          <span></span><span></span><span></span>
          <p>automation.skintlsc.com/workflow</p>
        </div>

        <div class="automation-mockup">
  <div class="automation-panel">
    <div class="automation-header">
      <div>
        <p class="mockup-label">Automation Flow</p>
        <h4>Lead Response System</h4>
      </div>
      <span>LIVE</span>
    </div>

    <div class="workflow-row">
      <div class="workflow-node active">
        <strong>Lead Submitted</strong>
        <span>Website Form</span>
      </div>

      <div class="workflow-line"></div>

      <div class="workflow-node">
        <strong>Email Sent</strong>
        <span>Instant Confirmation</span>
      </div>

      <div class="workflow-line"></div>

      <div class="workflow-node">
        <strong>CRM Updated</strong>
        <span>Lead Logged</span>
      </div>

      <div class="workflow-line"></div>

      <div class="workflow-node gold">
        <strong>Owner Alerted</strong>
        <span>SMS + Email</span>
      </div>
    </div>

    <div class="automation-stats">
      <div><strong>0 sec</strong><span>Response Time</span></div>
      <div><strong>100%</strong><span>Lead Captured</span></div>
      <div><strong>4 Steps</strong><span>Automated</span></div>
    </div>
  </div>
</div>
    `,
  },
];

function renderAddonModal(index, direction = 1) {
  const item = addonExamples[index];

  addonModal.className = `addon-modal-overlay active addon-theme-${item.theme}`;

  addonModalLabel.textContent = item.label;
  addonModalTitle.textContent = item.title;
  addonModalPrice.textContent = item.price;

  addonModalPreview.classList.remove("slide-left", "slide-right");
  void addonModalPreview.offsetWidth;
  addonModalPreview.classList.add(direction > 0 ? "slide-right" : "slide-left");
  addonModalPreview.innerHTML = item.preview;

  const quoteForm = document.getElementById("quoteDemoForm");

if (quoteForm) {
  let quoteStep = 0;
  const steps = quoteForm.querySelectorAll(".quote-step");
  const nextButtons = quoteForm.querySelectorAll(".quote-next");

  nextButtons.forEach((button) => {
    button.addEventListener("click", () => {
      steps[quoteStep].classList.remove("active");
      quoteStep = Math.min(quoteStep + 1, steps.length - 1);
      steps[quoteStep].classList.add("active");
    });
  });
}

  addonModalInfo.innerHTML = "";
  item.info.forEach((feature) => {
    const li = document.createElement("li");
    li.textContent = feature;
    addonModalInfo.appendChild(li);
  });

  addonProgressFill.style.width = `${((index + 1) / addonExamples.length) * 100}%`;
}

function openAddonModal(index) {
  currentAddonIndex = index;
  renderAddonModal(currentAddonIndex);

  const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

  document.body.style.overflow = "hidden";
  document.body.style.paddingRight = `${scrollbarWidth}px`;

  addonModal.classList.add("active");
}

function closeAddonModal() {
  addonModal.classList.remove("active");

  document.body.style.overflow = "";
  document.body.style.paddingRight = "";
}

function changeAddon(direction) {
  currentAddonIndex =
    (currentAddonIndex + direction + addonExamples.length) % addonExamples.length;

  renderAddonModal(currentAddonIndex, direction);
}

addonButtons.forEach((button, index) => {
  button.addEventListener("click", (e) => {
    e.preventDefault();
    openAddonModal(index);
  });
});

addonModalClose.addEventListener("click", closeAddonModal);

addonModal.addEventListener("click", (e) => {
  if (e.target === addonModal) closeAddonModal();
});

addonNextBtn.addEventListener("click", () => changeAddon(1));
addonPrevBtn.addEventListener("click", () => changeAddon(-1));

document.addEventListener("keydown", (e) => {
  if (!addonModal.classList.contains("active")) return;

  if (e.key === "Escape") closeAddonModal();
  if (e.key === "ArrowRight") changeAddon(1);
  if (e.key === "ArrowLeft") changeAddon(-1);
});

if (addonCTA) {
  addonCTA.addEventListener("click", () => {
    const item = addonExamples[currentAddonIndex];
    sessionStorage.setItem("selectedAddon", item.title);
    sessionStorage.setItem(
      "addonInquirySubject",
      `Interested in ${item.title}`
    );
  });
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);