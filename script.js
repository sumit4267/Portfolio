// =========================================================
// FOOTER YEAR
// =========================================================
document.getElementById('year').textContent = new Date().getFullYear();

// =========================================================
// HEADER: solid background once the page is scrolled
// =========================================================
const siteHeader = document.getElementById('siteHeader');
const updateHeaderState = () => {
  siteHeader.classList.toggle('scrolled', window.scrollY > 12);
};
updateHeaderState();
window.addEventListener('scroll', updateHeaderState, { passive: true });

// =========================================================
// MOBILE NAV TOGGLE
// =========================================================
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.classList.toggle('open', isOpen);
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

// Close the mobile menu once a link is tapped
navLinks.querySelectorAll('.nav-link').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// =========================================================
// ACTIVE NAV LINK WHILE SCROLLING
// =========================================================
const sections = document.querySelectorAll('main section[id]');
const navLinkEls = document.querySelectorAll('.nav-link');

const setActiveLink = (id) => {
  navLinkEls.forEach((link) => {
    link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
  });
};

const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) setActiveLink(entry.target.id);
    });
  },
  { rootMargin: '-40% 0px -55% 0px' }
);
sections.forEach((section) => navObserver.observe(section));

// =========================================================
// SCROLL REVEAL (fade + rise as elements enter the viewport)
// =========================================================
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);
revealEls.forEach((el) => revealObserver.observe(el));

// =========================================================
// SKILL BARS: animate width only once the card is visible
// =========================================================
const skillBars = document.querySelectorAll('.bar span');

const skillObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('filled');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.4 }
);
skillBars.forEach((bar) => skillObserver.observe(bar));

// =========================================================
// ANIMATED STAT COUNTERS (About section)
// =========================================================
const counters = document.querySelectorAll('[data-count]');

const animateCounter = (el) => {
  const target = parseInt(el.dataset.count, 10);
  const suffix = el.dataset.suffix || '';
  const duration = 1200;
  const start = performance.now();

  const step = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const value = Math.floor(progress * target);
    el.textContent = `${value}${suffix}`;
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
};

const counterObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.6 }
);
counters.forEach((counter) => counterObserver.observe(counter));

// =========================================================
// BACK TO TOP
// =========================================================
const backToTop = document.getElementById('backToTop');

window.addEventListener(
  'scroll',
  () => backToTop.classList.toggle('show', window.scrollY > 500),
  { passive: true }
);

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// =========================================================
// CONTACT FORM
// No backend is wired up yet. This validates the fields and gives the
// visitor feedback; connect it to a form service (e.g. Formspree) or your
// own API endpoint by replacing the block marked below.
// =========================================================
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  if (!contactForm.checkValidity()) {
    formStatus.textContent = 'Please fill in your name, email, and message.';
    formStatus.classList.add('error');
    return;
  }

  const submitBtn = contactForm.querySelector('button[type="submit"]');
  const label = submitBtn.querySelector('.btn-label');
  submitBtn.disabled = true;
  formStatus.classList.remove('error');
  formStatus.textContent = 'Sending…';
  label.textContent = 'Sending…';

  try {
    // ---- Replace this block with a real submit call, e.g.: ----
    // await fetch('https://formspree.io/f/your-id', {
    //   method: 'POST',
    //   headers: { 'Accept': 'application/json' },
    //   body: new FormData(contactForm),
    // });
    await new Promise((resolve) => setTimeout(resolve, 700));

    formStatus.textContent = "Thanks! Your message has been sent — I'll reply soon.";
    contactForm.reset();
  } catch (err) {
    formStatus.textContent = 'Something went wrong. Please try again or email me directly.';
    formStatus.classList.add('error');
  } finally {
    submitBtn.disabled = false;
    label.textContent = 'Send message';
  }
});

//  <!-- Setup and start animation! -->
  
    var typed = new Typed('#element', {
      strings: ['<i></i> FULL-STACK DEVELOPER', '&amp; DESIGNER.'],
      typeSpeed: 50,
    });
  