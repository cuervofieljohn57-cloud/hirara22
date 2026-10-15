document.addEventListener("DOMContentLoaded", function () {

  /* ===== TYPEWRITER ===== */
  const words = ["Web Developer", "Frontend Developer"];
  const el = document.getElementById("typed");

  if (el) {
    let wordIndex = 0, charIndex = 0, deleting = false;

    function type() {
      const word = words[wordIndex];

      if (!deleting) {
        charIndex++;
        el.textContent = word.slice(0, charIndex);
        if (charIndex === word.length) {
          deleting = true;
          setTimeout(type, 1500);   // paghulat una sa dili pa mo-delete
          return;
        }
        setTimeout(type, 110);      // katulin sa pag-type
      } else {
        charIndex--;
        el.textContent = word.slice(0, charIndex);
        if (charIndex === 0) {
          deleting = false;
          wordIndex = (wordIndex + 1) % words.length;
          setTimeout(type, 400);
          return;
        }
        setTimeout(type, 60);       // katulin sa pag-delete
      }
    }
    type();
  }

  /* ===== MOBILE MENU ===== */
  const menuBtn = document.getElementById("menuBtn");
  const navLinks = document.getElementById("navLinks");

  function closeMenu() {
    navLinks.classList.remove("open");
    menuBtn.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");
  }

  menuBtn.addEventListener("click", function () {
    const open = navLinks.classList.toggle("open");
    menuBtn.classList.toggle("open", open);
    menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
  });

  navLinks.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", closeMenu);
  });

  window.addEventListener("resize", function () {
    if (window.innerWidth > 1000) closeMenu();
  });

  /* ===== ACTIVE LINK KUNG MO-SCROLL ===== */
  const links = navLinks.querySelectorAll("a");
  const sections = document.querySelectorAll("section[id]");

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        links.forEach(function (l) {
          l.classList.toggle("active", l.getAttribute("href") === "#" + entry.target.id);
        });
      }
    });
  }, { rootMargin: "-40% 0px -55% 0px" });

  sections.forEach(function (s) { observer.observe(s); });
});