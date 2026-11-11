
"use strict";

// FRESH FOOTPRINTS CARPET CARE
// Main website JavaScript

document.addEventListener("DOMContentLoaded", () => {

  // AUTOMATIC COPYRIGHT YEAR
  const year = document.getElementById("year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  // BOOKING DATE: PREVENT PAST DATES
  const dateField = document.querySelector(
    '[name="preferred_date"]'
  );

  if (dateField) {
    const now = new Date();

    const localDate = new Date(
      now.getTime() -
      now.getTimezoneOffset() * 60000
    );

    dateField.min = localDate
      .toISOString()
      .slice(0, 10);
  }

  // CUSTOM FOOTPRINT CURSOR
  const cursor = document.getElementById("cursor");

  const allowCursor =
    window.matchMedia(
      "(pointer: fine) and (prefers-reduced-motion: no-preference)"
    ).matches;

  if (cursor && allowCursor) {
    let lastTrail = 0;

    document.addEventListener("pointermove", (event) => {
      cursor.style.left = event.clientX + "px";
      cursor.style.top = event.clientY + "px";

      const now = Date.now();

      if (now - lastTrail < 90) return;

      lastTrail = now;

      const trail = document.createElement("span");
      trail.className = "trail";

      const footprint = document.createElement("img");
      footprint.src = "footprint-cursor.svg";
      footprint.alt = "";
      footprint.setAttribute("aria-hidden", "true");

      trail.appendChild(footprint);

      trail.style.left = event.clientX + "px";
      trail.style.top = event.clientY + "px";

      document.body.appendChild(trail);

      window.setTimeout(() => {
        trail.remove();
      }, 900);
    });
  } else if (cursor) {
    cursor.style.display = "none";
  }

  // SMOOTH SCROLLING FOR INTERNAL LINKS
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") return;

      const target = document.getElementById(
        targetId.slice(1)
      );

      if (!target) return;

      event.preventDefault();

      target.scrollIntoView({
        behavior: window.matchMedia(
          "(prefers-reduced-motion: reduce)"
        ).matches ? "auto" : "smooth",
        block: "start"
      });
    });
  });

  // BOOKING FORM VALIDATION
  const bookingForm = document.querySelector(
    "#booking-form, form[data-booking]"
  );

  if (bookingForm) {
    bookingForm.addEventListener("submit", (event) => {
      if (!bookingForm.checkValidity()) {
        event.preventDefault();
        bookingForm.reportValidity();
        return;
      }

      // Allow the form's configured submission
      // service to handle the booking request.
    });
  }

  // REVEAL ELEMENTS ON SCROLL
  const revealElements = document.querySelectorAll(
    ".reveal"
  );

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (
    revealElements.length &&
    "IntersectionObserver" in window &&
    !reducedMotion
  ) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1
      }
    );

    revealElements.forEach((element) => {
      observer.observe(element);
    });
  } else {
    revealElements.forEach((element) => {
      element.classList.add("visible");
    });
  }

});
