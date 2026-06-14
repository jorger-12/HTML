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

if (!packageModal) {
  console.log("Solutions page not detected.");
}

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

const packageButtons = document.querySelectorAll("[data-package]");

if (packageButtons.length) {
  packageButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();

      renderPackageModal(button.dataset.package);

      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;

      document.body.classList.add("modal-open");
      document.body.style.paddingRight = `${scrollbarWidth}px`;

      packageModal.classList.add("active");
    });
  });
}

function changePackage(direction) {
  currentPackageIndex =
    (currentPackageIndex + direction + packageOrder.length) % packageOrder.length;

  renderPackageModal(packageOrder[currentPackageIndex]);
}

function closePackageModal() {
  packageModal.classList.remove("active");
  document.body.classList.remove("modal-open");
  document.body.style.paddingRight = "";

  const packageCards = document.querySelectorAll(".website-package-card");
  const activeCard = packageCards[currentPackageIndex];

  if (activeCard) {
    activeCard.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }
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
          <b class="unavailable">7</b>
          <b class="unavailable">8</b>
          <b class="unavailable">9</b>
          <b class="unavailable">10</b>
          <b class="unavailable">11</b>

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

const mobileAddonInfo = document.getElementById("mobileAddonInfo");

if (mobileAddonInfo) {
  mobileAddonInfo.innerHTML = "";

  item.info.forEach((feature) => {
    const li = document.createElement("li");
    li.textContent = feature;
    mobileAddonInfo.appendChild(li);
  });
}

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

  document.body.classList.remove("modal-open");
  document.body.style.paddingRight = "";

  const premiumCards = document.querySelectorAll(".mobile-premium-card");

  if (premiumCards[currentAddonIndex]) {
    premiumCards[currentAddonIndex].scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest"
    });
  }

  updatePremiumAddonActive(currentAddonIndex);
}

function changeAddon(direction) {
  currentAddonIndex =
    (currentAddonIndex + direction + addonExamples.length) % addonExamples.length;

  renderAddonModal(currentAddonIndex, direction);
}

if (addonButtons.length) {
  addonButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();

      const card = button.closest("[data-addon]");
      if (!card) return;

      const addonKey = card.dataset.addon;

      const index = addonExamples.findIndex(
        (item) => item.theme === addonKey
      );

      if (index === -1) return;

      openAddonModal(index);
    });
  });
}

if (addonModal && addonModalClose && addonNextBtn && addonPrevBtn) {
  addonModalClose.addEventListener("click", closeAddonModal);

  addonModal.addEventListener("click", (e) => {
    if (e.target === addonModal) closeAddonModal();
  });

addonNextBtn.addEventListener("click", () => {
  changeAddon(1);
  addonNextBtn.blur();
});

addonPrevBtn.addEventListener("click", () => {
  changeAddon(-1);
  addonPrevBtn.blur();
});
}

if (addonModal) {
  document.addEventListener("keydown", (e) => {
    if (!addonModal.classList.contains("active")) return;

    if (e.key === "Escape") closeAddonModal();
    if (e.key === "ArrowRight") changeAddon(1);
    if (e.key === "ArrowLeft") changeAddon(-1);
  });
}

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

/* MOBILE PACKAGE CAROUSEL */
const packageGrid = document.querySelector(".website-pricing-grid");
const packageCards = document.querySelectorAll(".website-package-card");
const packagePrev = document.getElementById("packagePrev");
const packageNext = document.getElementById("packageNext");
const packageDots = document.querySelectorAll(".package-dots span");

let currentPackageSlide = 0;

function updatePackageDots() {
  packageDots.forEach((dot, index) => {
    dot.classList.toggle("active", index === currentPackageSlide);
  });
}

function scrollToPackage(index) {
  if (!packageGrid || !packageCards.length) return;

  if (index < 0) {
    index = packageCards.length - 1;
  }

  if (index >= packageCards.length) {
    index = 0;
  }

  currentPackageSlide = index;

  packageCards[currentPackageSlide].scrollIntoView({
    behavior: "smooth",
    inline: "center",
    block: "nearest",
  });

  updatePackageDots();
}

packagePrev?.addEventListener("click", () => {
  scrollToPackage(currentPackageSlide - 1);
});

packageNext?.addEventListener("click", () => {
  scrollToPackage(currentPackageSlide + 1);
});

packageDots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    scrollToPackage(index);
  });
});

/* Update dots when user swipes manually */
packageGrid?.addEventListener("scroll", () => {
  let closestIndex = 0;
  let closestDistance = Infinity;

  packageCards.forEach((card, index) => {
    const distance = Math.abs(
      card.getBoundingClientRect().left -
        packageGrid.getBoundingClientRect().left
    );

    if (distance < closestDistance) {
      closestDistance = distance;
      closestIndex = index;
    }
  });

  currentPackageSlide = closestIndex;
  updatePackageDots();
});

/* Start on first card */
/* MOBILE PROCESS CAROUSEL ACTIVE CARD */
const processCarousel = document.getElementById("processCarousel");
const processCards = document.querySelectorAll(".process-step-card");
const processDots = document.querySelectorAll(".process-dots span");

function updateProcessActiveCard(activeIndex) {
  processCards.forEach((card, index) => {
    card.classList.toggle("active", index === activeIndex);
  });

  processDots.forEach((dot, index) => {
    dot.classList.toggle("active", index === activeIndex);
  });
}

processCarousel?.addEventListener("scroll", () => {
  let closestIndex = 0;
  let closestDistance = Infinity;

  processCards.forEach((card, index) => {
    const cardCenter = card.offsetLeft + card.offsetWidth / 2;
    const carouselCenter =
      processCarousel.scrollLeft + processCarousel.clientWidth / 2;

    const distance = Math.abs(cardCenter - carouselCenter);

    if (distance < closestDistance) {
      closestDistance = distance;
      closestIndex = index;
    }
  });

  updateProcessActiveCard(closestIndex);
});

updateProcessActiveCard(0);

/* MOBILE PREMIUM ADD-ONS CAROUSEL */
const premiumAddonCarousel = document.getElementById("premiumAddonCarousel");
const premiumAddonCards = document.querySelectorAll(".mobile-premium-card");
const premiumAddonDots = document.querySelectorAll("#premiumAddonDots span");

function updatePremiumAddonActive(activeIndex) {
  premiumAddonCards.forEach((card, index) => {
    card.classList.toggle("active", index === activeIndex);
  });

  premiumAddonDots.forEach((dot, index) => {
    dot.classList.toggle("active", index === activeIndex);
  });
}

premiumAddonCarousel?.addEventListener("scroll", () => {
  let closestIndex = 0;
  let closestDistance = Infinity;

  premiumAddonCards.forEach((card, index) => {
    const cardCenter = card.offsetLeft + card.offsetWidth / 2;
    const carouselCenter =
      premiumAddonCarousel.scrollLeft + premiumAddonCarousel.clientWidth / 2;

    const distance = Math.abs(cardCenter - carouselCenter);

    if (distance < closestDistance) {
      closestDistance = distance;
      closestIndex = index;
    }
  });

  updatePremiumAddonActive(closestIndex);
});

updatePremiumAddonActive(0);

/* MOBILE ESSENTIAL ADD-ONS CAROUSEL */
const essentialAddonCarousel = document.getElementById("essentialAddonCarousel");
const essentialAddonCards = document.querySelectorAll(".mobile-essential-card");
const essentialAddonDots = document.querySelectorAll("#essentialAddonDots span");

function updateEssentialAddonActive(activeIndex) {
  essentialAddonCards.forEach((card, index) => {
    card.classList.toggle("active", index === activeIndex);
  });

  essentialAddonDots.forEach((dot, index) => {
    dot.classList.toggle("active", index === activeIndex);
  });
}

essentialAddonCarousel?.addEventListener("scroll", () => {
  let closestIndex = 0;
  let closestDistance = Infinity;

  essentialAddonCards.forEach((card, index) => {
    const cardCenter = card.offsetLeft + card.offsetWidth / 2;
    const carouselCenter =
      essentialAddonCarousel.scrollLeft + essentialAddonCarousel.clientWidth / 2;

    const distance = Math.abs(cardCenter - carouselCenter);

    if (distance < closestDistance) {
      closestDistance = distance;
      closestIndex = index;
    }
  });

  updateEssentialAddonActive(closestIndex);
});

updateEssentialAddonActive(0);

if (addonButtons.length) {
  addonButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();

      const card = button.closest("[data-addon]");
      if (!card) return;

      const addonKey = card.dataset.addon;

      const index = addonExamples.findIndex(
        (item) => item.theme === addonKey
      );

      if (index === -1) return;

      openAddonModal(index);
    });
  });
}

const mobileAddonTabs = document.querySelectorAll(".mobile-addon-tab");
const mobileAddonPanels = document.querySelectorAll(".mobile-addon-panel");

mobileAddonTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const selectedTab = tab.dataset.tab;

    mobileAddonTabs.forEach((btn) =>
      btn.classList.remove("active")
    );

    tab.classList.add("active");

    mobileAddonPanels.forEach((panel) => {
      panel.classList.toggle(
        "active",
        panel.dataset.panel === selectedTab
      );
    });
  });
});

/* MOBILE WEBSITE CARE CAROUSEL */
const careCarousel = document.querySelector(".website-care-grid");
const careCards = document.querySelectorAll(".care-plan-card");

function updateCareActive(activeIndex) {
  careCards.forEach((card, index) => {
    card.classList.toggle("active", index === activeIndex);
  });
}

careCarousel?.addEventListener("scroll", () => {
  let closestIndex = 0;
  let closestDistance = Infinity;

  careCards.forEach((card, index) => {
    const cardCenter = card.offsetLeft + card.offsetWidth / 2;
    const carouselCenter =
      careCarousel.scrollLeft + careCarousel.clientWidth / 2;

    const distance = Math.abs(cardCenter - carouselCenter);

    if (distance < closestDistance) {
      closestDistance = distance;
      closestIndex = index;
    }
  });
  const careDots = document.querySelectorAll(".care-dots span");

function updateCareActive(activeIndex) {
  careCards.forEach((card, index) => {
    card.classList.toggle("active", index === activeIndex);
  });

  careDots.forEach((dot, index) => {
    dot.classList.toggle("active", index === activeIndex);
  });
}

  updateCareActive(closestIndex);
});

updateCareActive(0);

function setupSimpleCarousel(carouselId, dotsSelector) {
  const carousel = document.getElementById(carouselId);
  const dots = document.querySelectorAll(`${dotsSelector} span`);

  if (!carousel || !dots.length) return;

  const cards = Array.from(carousel.children);

  function updateDots() {
    let closestIndex = 0;
    let closestDistance = Infinity;
    const carouselCenter = carousel.scrollLeft + carousel.clientWidth / 2;

    cards.forEach((card, index) => {
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const distance = Math.abs(carouselCenter - cardCenter);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    cards.forEach((card, index) => {
      card.classList.toggle("active", index === closestIndex);
    });

    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === closestIndex);
    });
  }

  carousel.addEventListener("scroll", updateDots, { passive: true });
  window.addEventListener("resize", updateDots);
  updateDots();
}

setupSimpleCarousel("businessCarousel", ".business-carousel-dots");
setupSimpleCarousel("growthCarousel", ".growth-carousel-dots");
setupSimpleCarousel("benefitsCarousel", ".benefits-carousel-dots");
