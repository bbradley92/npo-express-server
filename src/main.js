const navToggle = document.querySelector("[data-nav-toggle]");
const siteNav = document.querySelector("[data-site-nav]");

if (navToggle && siteNav) {
  const label = navToggle.querySelector(".sr-only");

  const setNavOpen = (open) => {
    navToggle.setAttribute("aria-expanded", String(open));
    siteNav.classList.toggle("is-open", open);
    if (label) label.textContent = open ? "Close navigation" : "Open navigation";
  };

  const isNavOpen = () => siteNav.classList.contains("is-open");

  navToggle.addEventListener("click", () => setNavOpen(!isNavOpen()));

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && isNavOpen()) {
      setNavOpen(false);
      navToggle.focus();
    }
  });

  document.addEventListener("click", (event) => {
    if (isNavOpen() && !siteNav.contains(event.target) && !navToggle.contains(event.target)) {
      setNavOpen(false);
    }
  });

  const desktopQuery = window.matchMedia("(min-width: 1041px)");
  desktopQuery.addEventListener("change", (event) => {
    if (event.matches && isNavOpen()) setNavOpen(false);
  });
}

document.querySelectorAll("[data-current-year]").forEach((element) => {
  element.textContent = String(new Date().getFullYear());
});

const currentPage = document.body.dataset.page;
if (currentPage) {
  document.querySelector(`[data-nav-link="${CSS.escape(currentPage)}"]`)?.setAttribute("aria-current", "page");
}

const contactForm = document.querySelector("[data-contact-form]");

if (contactForm) {
  const submitButton = contactForm.querySelector("[data-submit-button]");
  const status = contactForm.querySelector("[data-form-status]");
  const defaultLabel = submitButton.textContent;
  const contactEmail = contactForm.dataset.contactEmail;
  const thankYouUrl = `${window.location.origin}/thankyou.html`;

  // Keep the no-JS fallback pointed at the same origin as the page so staging
  // submissions do not bounce to production.
  const nextField = contactForm.querySelector('input[name="_next"]');
  if (nextField) nextField.value = thankYouUrl;

  const showError = () => {
    const link = document.createElement("a");
    link.href = `mailto:${contactEmail}`;
    link.textContent = contactEmail;
    status.replaceChildren("We could not send the form. Please try again or email ", link, ".");
    status.className = "form-status form-status--error";
    status.focus();
  };

  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!contactForm.reportValidity()) {
      status.textContent = "Please complete the required fields before sending your inquiry.";
      status.className = "form-status form-status--error";
      status.focus();
      return;
    }

    submitButton.disabled = true;
    submitButton.textContent = "Sending…";
    status.textContent = "Sending your inquiry securely…";
    status.className = "form-status form-status--pending";

    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 15000);

    try {
      const response = await fetch(contactForm.dataset.ajaxAction, {
        method: "POST",
        body: new FormData(contactForm),
        headers: { Accept: "application/json" },
        signal: controller.signal
      });

      const payload = await response.json().catch(() => null);

      // FormSubmit returns {"success":"true"} on delivery. A 200 without it
      // (for example an unactivated address) is treated as a failure so the
      // inquiry is never silently lost.
      if (!response.ok || !payload || String(payload.success) !== "true") {
        throw new Error(`Form service returned ${response.status}`);
      }

      window.location.assign(thankYouUrl);
    } catch (error) {
      showError();
    } finally {
      window.clearTimeout(timeout);
      submitButton.disabled = false;
      submitButton.textContent = defaultLabel;
    }
  });
}
