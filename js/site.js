/* ==========================================================================
   site.js — the small amount of behaviour the Framer project relies on
   Project: "Portfolio Tony" (4pRs8QyCSry0wVCAGf6n)

   1. Navigation variant switch  (Phone <-> Phone Open)
   2. Language ES/EN variant switch
   3. "current page" underline on the nav links
   4. appearEffect  — fade + rise when a block scrolls into view
   5. textEffect    — per-word reveal on the page titles
   6. Contact page  — Framer's fontSize: auto-fit(100%) on "Hablemos"

   Everything here is progressive enhancement: with JavaScript disabled the
   page is fully readable, nothing stays hidden, and only the motion is lost.
   ========================================================================== */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ------------------------------------------------------------------------
     1. NAVIGATION — Framer variants "Phone" and "Phone Open"
     ------------------------------------------------------------------------ */
  function initNav() {
    var nav = document.querySelector('.nav');
    if (!nav) return;
    var toggle = nav.querySelector('.nav__toggle');
    if (!toggle) return;

    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    // Close the drawer on Escape, and whenever we leave the Phone breakpoint.
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
    window.matchMedia('(max-width: 809.98px)').addEventListener('change', function (e) {
      if (!e.matches) {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ------------------------------------------------------------------------
     2. LANGUAGE TOGGLE — Framer variants "ES" and "EN"

     In the Framer project this only swaps which of the two labels is
     highlighted; the project has no locales configured, so no text is
     translated. Each instance keeps its own state, exactly as in Framer.
     ------------------------------------------------------------------------ */
  function initLanguage() {
    Array.prototype.forEach.call(document.querySelectorAll('.lang'), function (el) {
      el.addEventListener('click', function () {
        var en = el.classList.toggle('is-en');
        el.setAttribute('aria-pressed', en ? 'true' : 'false');
      });
    });
  }

  /* ------------------------------------------------------------------------
     3. CURRENT PAGE — drives the Nav Link "current" underline
     ------------------------------------------------------------------------ */
  function initCurrentPage() {
    var norm = function (path) {
      return path.replace(/index\.html$/, '').replace(/\/+$/, '') || '/';
    };
    var here = norm(window.location.pathname);
    Array.prototype.forEach.call(document.querySelectorAll('a[href]'), function (a) {
      if (a.origin !== window.location.origin) return;   // skip mailto / external
      if (norm(a.pathname) === here) a.setAttribute('aria-current', 'page');
    });
  }

  /* ------------------------------------------------------------------------
     4. appearEffect — Framer: trigger onInView, replay false
     ------------------------------------------------------------------------ */
  function initReveals() {
    var nodes = document.querySelectorAll('[data-reveal]');
    if (!nodes.length) return;

    if (reduceMotion || !('IntersectionObserver' in window)) return; // stay visible

    Array.prototype.forEach.call(nodes, function (el) {
      el.classList.add('reveal');
      if (el.dataset.revealY === '22') el.classList.add('reveal--22');
      if (el.dataset.revealDur === '95') el.classList.add('reveal--95');
    });

    // Framer thresholds: 0.1 on / and /about and /cv, 0.08 on project pages.
    var groups = {};
    Array.prototype.forEach.call(nodes, function (el) {
      var t = el.dataset.reveal || '0.1';
      (groups[t] = groups[t] || []).push(el);
    });

    Object.keys(groups).forEach(function (t) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);     // replay: false
        });
      }, { threshold: Math.min(parseFloat(t), 1) });
      groups[t].forEach(function (el) { io.observe(el); });
    });
  }

  /* ------------------------------------------------------------------------
     5. textEffect — Framer: tokenization "word", 0.04s stagger, threshold 0.2
     ------------------------------------------------------------------------ */
  function initTextReveal() {
    var nodes = document.querySelectorAll('[data-text-reveal]');
    if (!nodes.length || reduceMotion || !('IntersectionObserver' in window)) return;

    Array.prototype.forEach.call(nodes, function (el) {
      splitWords(el);
      el.classList.add('text-reveal');
    });

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      });
    }, { threshold: 0.2 });

    Array.prototype.forEach.call(nodes, function (el) { io.observe(el); });
  }

  /* Wrap every word in a <span class="word">, preserving inline markup
     (the titles mix roman and italic runs) and the original whitespace. */
  function splitWords(root) {
    var index = { n: 0 };
    walk(root);

    function walk(node) {
      var kids = Array.prototype.slice.call(node.childNodes);
      kids.forEach(function (child) {
        if (child.nodeType === 3) {
          var frag = document.createDocumentFragment();
          child.nodeValue.split(/(\s+)/).forEach(function (part) {
            if (!part) return;
            if (/^\s+$/.test(part)) {
              frag.appendChild(document.createTextNode(part));
            } else {
              var span = document.createElement('span');
              span.className = 'word';
              span.style.setProperty('--i', index.n++);
              span.textContent = part;
              frag.appendChild(span);
            }
          });
          node.replaceChild(frag, child);
        } else if (child.nodeType === 1) {
          walk(child);
        }
      });
    }
  }

  /* ------------------------------------------------------------------------
     6. auto-fit type — Framer's fontSize: auto-fit(100%) on /contact
        Scales the single line so it exactly fills its container width.
     ------------------------------------------------------------------------ */
  function initAutoFit() {
    var el = document.querySelector('[data-autofit]');
    if (!el) return;

    // The element is width:100%, so its own box width tells us nothing about
    // the text. Measure the text run itself with a Range.
    function textWidth() {
      var range = document.createRange();
      range.selectNodeContents(el);
      return range.getBoundingClientRect().width;
    }

    function fit() {
      var parent = el.parentElement;
      if (!parent) return;
      var cs = getComputedStyle(parent);
      var available = parent.clientWidth
        - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
      if (!(available > 0)) return;

      // Type advance is linear in font-size, so one probe measurement is
      // enough to solve for the size that fills the line exactly.
      var probe = 100;
      el.style.fontSize = probe + 'px';
      var measured = textWidth();
      if (!measured) return;
      el.style.fontSize = (probe * available / measured).toFixed(2) + 'px';
    }

    if (document.fonts && document.fonts.ready) document.fonts.ready.then(fit);
    fit();

    var raf;
    window.addEventListener('resize', function () {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(fit);
    });
  }

  /* ---------------------------------------------------------------------- */
  function init() {
    initNav();
    initLanguage();
    initCurrentPage();
    initReveals();
    initTextReveal();
    initAutoFit();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
