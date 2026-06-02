(function () {
  "use strict";

  var tripTarget = new Date("2026-08-20T18:00:00-04:00");
  var pollTarget = new Date("2026-06-28T23:59:00-04:00");

  var countdowns = [
    {
      id: "trip-countdown",
      messageId: "trip-countdown-message",
      target: tripTarget,
      completeMessage: "The weekend has begun.",
      activeMessage: "Counting down to Thursday arrival at 6:00 PM ET."
    },
    {
      id: "poll-countdown",
      messageId: "poll-countdown-message",
      target: pollTarget,
      completeMessage: "Voting is closed. The plan is being finalized.",
      activeMessage: "Vote before the cutoff. After that, the plan locks in."
    }
  ];

  function pad(value) {
    return String(value).padStart(2, "0");
  }

  function setCountdownValues(element, values) {
    var days = element.querySelector("[data-days]");
    var hours = element.querySelector("[data-hours]");
    var minutes = element.querySelector("[data-minutes]");
    var seconds = element.querySelector("[data-seconds]");

    if (days) {
      days.textContent = String(values.days).padStart(3, "0");
    }

    if (hours) {
      hours.textContent = pad(values.hours);
    }

    if (minutes) {
      minutes.textContent = pad(values.minutes);
    }

    if (seconds) {
      seconds.textContent = pad(values.seconds);
    }
  }

  function updateCountdown(config) {
    var element = document.getElementById(config.id);
    var message = document.getElementById(config.messageId);

    if (!element) {
      return;
    }

    var now = new Date();
    var remaining = config.target.getTime() - now.getTime();

    if (remaining <= 0) {
      setCountdownValues(element, {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
      });

      if (message) {
        message.textContent = config.completeMessage;
      }

      return;
    }

    var totalSeconds = Math.floor(remaining / 1000);
    var days = Math.floor(totalSeconds / 86400);
    var hours = Math.floor((totalSeconds % 86400) / 3600);
    var minutes = Math.floor((totalSeconds % 3600) / 60);
    var seconds = totalSeconds % 60;

    setCountdownValues(element, {
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds
    });

    if (message) {
      message.textContent = config.activeMessage;
    }
  }

  function tickCountdowns() {
    countdowns.forEach(updateCountdown);
  }

  tickCountdowns();
  window.setInterval(tickCountdowns, 1000);

  var body = document.body;
  var nav = document.querySelector("[data-site-nav]");
  var navToggle = document.querySelector("[data-nav-toggle]");
  var navLinks = nav ? Array.prototype.slice.call(nav.querySelectorAll("a[href^='#']")) : [];

  function closeNav() {
    if (!nav || !navToggle) {
      return;
    }

    nav.classList.remove("is-open");
    body.classList.remove("nav-open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Open navigation menu");
  }

  if (navToggle && nav) {
    navToggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("is-open");
      body.classList.toggle("nav-open", isOpen);
      navToggle.setAttribute("aria-expanded", String(isOpen));
      navToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
    });
  }

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeNav();
    }
  });

  document.addEventListener("click", function (event) {
    var link = event.target.closest("a[href^='#']");

    if (!link) {
      return;
    }

    var hash = link.getAttribute("href");

    if (!hash || hash === "#") {
      return;
    }

    var target = document.querySelector(hash);

    if (!target) {
      return;
    }

    event.preventDefault();
    target.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      block: "start"
    });
    history.pushState(null, "", hash);
    closeNav();
  });

  if ("IntersectionObserver" in window && navLinks.length) {
    var sections = navLinks
      .map(function (link) {
        var href = link.getAttribute("href");
        return href && href !== "#" ? document.querySelector(href) : null;
      })
      .filter(Boolean);

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) {
            return;
          }

          navLinks.forEach(function (link) {
            link.classList.toggle("is-active", link.getAttribute("href") === "#" + entry.target.id);
          });
        });
      },
      {
        rootMargin: "-35% 0px -55% 0px",
        threshold: 0
      }
    );

    sections.forEach(function (section) {
      observer.observe(section);
    });
  }

  var songRequestForm = document.querySelector("[data-song-request-form]");
  var songRequestOutput = document.querySelector("[data-song-request-output]");
  var songRequestStatus = document.querySelector("[data-song-request-status]");
  var copySongRequestButton = document.querySelector("[data-copy-song-request]");

  function setSongRequestStatus(message) {
    if (songRequestStatus) {
      songRequestStatus.textContent = message;
    }
  }

  function getSongRequestText() {
    if (!songRequestForm) {
      return "";
    }

    var formData = new FormData(songRequestForm);
    var song = String(formData.get("song") || "").trim();
    var artist = String(formData.get("artist") || "").trim();
    var submittedBy = String(formData.get("submittedBy") || "").trim();
    var vibe = String(formData.get("vibe") || "").trim();
    var notes = String(formData.get("notes") || "").trim();

    if (!song || !artist) {
      return "";
    }

    var lines = [
      "Karim's Last Ride song request:",
      song + " - " + artist,
      "Vibe: " + (vibe || "Playlist candidate")
    ];

    if (submittedBy) {
      lines.push("Submitted by: " + submittedBy);
    }

    if (notes) {
      lines.push("Notes: " + notes);
    }

    return lines.join("\n");
  }

  function writeSongRequestOutput(text) {
    if (songRequestOutput) {
      songRequestOutput.value = text;
      songRequestOutput.focus();
      songRequestOutput.select();
    }
  }

  function copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text);
    }

    return Promise.reject(new Error("Clipboard API unavailable"));
  }

  if (songRequestForm) {
    songRequestForm.addEventListener("submit", function (event) {
      event.preventDefault();

      var text = getSongRequestText();

      if (!text) {
        setSongRequestStatus("Add at least a song title and artist.");
        return;
      }

      writeSongRequestOutput(text);
      setSongRequestStatus("Request formatted. Copy it and paste it in the group chat.");
    });
  }

  if (copySongRequestButton) {
    copySongRequestButton.addEventListener("click", function () {
      var text = songRequestOutput && songRequestOutput.value.trim() ? songRequestOutput.value.trim() : getSongRequestText();

      if (!text) {
        setSongRequestStatus("Format a request first.");
        return;
      }

      writeSongRequestOutput(text);
      copyText(text)
        .then(function () {
          setSongRequestStatus("Song request copied.");
        })
        .catch(function () {
          setSongRequestStatus("Copy blocked by browser. The request is selected so you can copy it manually.");
        });
    });
  }
})();
