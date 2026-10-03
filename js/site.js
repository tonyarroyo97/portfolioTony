/* ==========================================================================
   site.js — the small amount of behaviour the Framer project relies on
   Project: "Portfolio Tony" (4pRs8QyCSry0wVCAGf6n)

   1. Navigation variant switch  (Phone <-> Phone Open)
   2. Language ES/EN switch — goes to the same page in the other language
   3. "current page" underline on the nav links
   4. appearEffect  — fade + rise when a block scrolls into view
   5. textEffect    — per-word reveal on the page titles
   6. Contact page  — Framer's fontSize: auto-fit(100%) on the headline
   7. Tony Nieve    — composition carousel controls (arrows, dots, keys)
   8. About         — accordions, one open at a time
   9. About         — mentions carousel controls (arrows, counter, keys)

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
     2. LANGUAGE SWITCH — ES (site root) / EN (under en/, same slugs)

     The highlight is not state: each page is written with its own language
     marked aria-current="true". The other option carries data-href, the
     same page in that language as a relative URL (so it works in a
     subfolder or from disk). Clicking the active language or the "/"
     does nothing. The language is whatever the URL says — nothing is
     remembered and nothing redirects on the browser's language.
     ------------------------------------------------------------------------ */
  function initLanguage() {
    Array.prototype.forEach.call(document.querySelectorAll('.lang [role="button"]'), function (el) {
      var go = function () {
        var href = el.getAttribute('data-href');
        if (href) window.location.assign(href);
      };
      el.addEventListener('click', go);
      el.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          go();
        }
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
        Scales the headline so its longest line exactly fills the container.
     ------------------------------------------------------------------------ */
  function initAutoFit() {
    var el = document.querySelector('[data-autofit]');
    if (!el) return;

    // The element is width:100%, so its own box width tells us nothing about
    // the text. Measure the text run itself with a Range; across a <br> its
    // bounding box is as wide as the longest line.
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

  /* ------------------------------------------------------------------------
     7. CAROUSEL — Framer code component CompositionCarousel (/projects/tony-nieve)

     The slides are plain markup in a horizontally scrolling, snapping track,
     so swipe works without JavaScript. This adds the ‹ dots › controls and
     ← / → keys. The active slide is read back from the track's own scroll
     position, so swipe, arrows and dots stay in sync. No autoplay, no loop.
     Labels come from data-label-previous / -next / -slide on the root.
     ------------------------------------------------------------------------ */
  function initCarousels() {
    Array.prototype.forEach.call(document.querySelectorAll('[data-carousel]'), function (root) {
      var track = root.querySelector('.tn-carousel__track');
      if (!track) return;
      var count = track.children.length;
      if (count < 2) return;

      var index = 0;
      var chevron = function (d) {
        return '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
          'stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
          '<path d="' + d + '"/></svg>';
      };
      var button = function (className, label, html) {
        var b = document.createElement('button');
        b.type = 'button';
        b.className = className;
        b.setAttribute('aria-label', label);
        b.innerHTML = html;
        return b;
      };

      var controls = document.createElement('div');
      controls.className = 'tn-carousel__controls';
      var prev = button('tn-carousel__arrow', root.getAttribute('data-label-previous'), chevron('M15 5l-7 7 7 7'));
      var next = button('tn-carousel__arrow', root.getAttribute('data-label-next'), chevron('M9 5l7 7-7 7'));
      var dotsWrap = document.createElement('div');
      dotsWrap.className = 'tn-carousel__dots';
      var dots = [];
      for (var i = 0; i < count; i++) {
        var dot = button('tn-carousel__dot', root.getAttribute('data-label-slide') + ' ' + (i + 1), '<span></span>');
        dot.addEventListener('click', goTo.bind(null, i));
        dotsWrap.appendChild(dot);
        dots.push(dot);
      }
      controls.appendChild(prev);
      controls.appendChild(dotsWrap);
      controls.appendChild(next);
      root.appendChild(controls);

      function goTo(n) {
        var clamped = Math.max(0, Math.min(count - 1, n));
        track.scrollTo({ left: clamped * track.clientWidth, behavior: reduceMotion ? 'auto' : 'smooth' });
      }
      function update() {
        prev.disabled = index <= 0;
        next.disabled = index >= count - 1;
        dots.forEach(function (d, i) {
          if (i === index) d.setAttribute('aria-current', 'true');
          else d.removeAttribute('aria-current');
        });
      }

      prev.addEventListener('click', function () { goTo(index - 1); });
      next.addEventListener('click', function () { goTo(index + 1); });
      track.addEventListener('scroll', function () {
        if (!track.clientWidth) return;
        var n = Math.round(track.scrollLeft / track.clientWidth);
        if (n !== index) { index = n; update(); }
      }, { passive: true });
      root.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowLeft') { e.preventDefault(); goTo(index - 1); }
        else if (e.key === 'ArrowRight') { e.preventDefault(); goTo(index + 1); }
      });
      // Keep the current slide in place when the width changes.
      window.addEventListener('resize', function () {
        track.scrollTo({ left: index * track.clientWidth });
      });

      update();
    });
  }

  /* ------------------------------------------------------------------------
     8. ACCORDIONS — Framer code component AboutAccordion (/about)

     Every panel is open in the markup, so the content is readable without
     JavaScript. Setting data-ready on the list switches the CSS to its
     closed-by-default state; closed panels are made inert so their content
     can't be tabbed into. Opening one closes the others in the same list.
     ------------------------------------------------------------------------ */
  function initAccordions() {
    Array.prototype.forEach.call(document.querySelectorAll('.about-acc-list'), function (list) {
      var items = Array.prototype.slice.call(list.querySelectorAll('.about-acc'));

      function set(item, open) {
        item.setAttribute('data-open', open ? 'true' : 'false');
        item.querySelector('.about-acc__head').setAttribute('aria-expanded', open ? 'true' : 'false');
        item.querySelector('.about-acc__clip').inert = !open;
      }

      items.forEach(function (item) {
        set(item, false);
        item.querySelector('.about-acc__head').addEventListener('click', function () {
          var open = item.getAttribute('data-open') !== 'true';
          items.forEach(function (other) { set(other, other === item && open); });
        });
      });
      list.setAttribute('data-ready', '');
    });
  }

  /* ------------------------------------------------------------------------
     9. MENTIONS — Framer code component MentionsCarousel (/about)

     Cards have different widths (4:5 and 3:2), so the active card is the one
     whose left edge is nearest the track's scroll position, and the last
     card counts as active once the track can't scroll further. Up to 10
     cards the position shows as dots; above that as an «01 / 22» counter.
     Labels come from data-label-previous / -next / -slide on the root.
     ------------------------------------------------------------------------ */
  function initMentions() {
    var MAX_DOTS = 10;
    Array.prototype.forEach.call(document.querySelectorAll('[data-mentions]'), function (root) {
      var track = root.querySelector('.mentions__track');
      if (!track) return;
      var cards = Array.prototype.slice.call(track.children);
      var count = cards.length;
      if (count < 2) return;

      var index = 0;
      var pad = function (n) { return (n < 10 ? '0' : '') + n; };
      var chevron = function (d) {
        return '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
          'stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
          '<path d="' + d + '"/></svg>';
      };
      var button = function (className, label, html) {
        var b = document.createElement('button');
        b.type = 'button';
        b.className = className;
        b.setAttribute('aria-label', label);
        b.innerHTML = html;
        return b;
      };

      var controls = document.createElement('div');
      controls.className = 'mentions__controls';
      var prev = button('mentions__arrow', root.getAttribute('data-label-previous'), chevron('M15 5l-7 7 7 7'));
      var next = button('mentions__arrow', root.getAttribute('data-label-next'), chevron('M9 5l7 7-7 7'));
      var counter = null;
      var dots = [];
      var position;
      if (count > MAX_DOTS) {
        counter = document.createElement('span');
        counter.className = 'mentions__counter ts-label';
        counter.setAttribute('aria-live', 'polite');
        position = counter;
      } else {
        position = document.createElement('div');
        position.className = 'mentions__dots';
        cards.forEach(function (_, i) {
          var dot = button('mentions__dot', root.getAttribute('data-label-slide') + ' ' + (i + 1), '<span></span>');
          dot.addEventListener('click', function () { goTo(i); });
          position.appendChild(dot);
          dots.push(dot);
        });
      }
      controls.appendChild(prev);
      controls.appendChild(position);
      controls.appendChild(next);
      root.appendChild(controls);

      var offset = function (i) { return cards[i].offsetLeft - cards[0].offsetLeft; };

      function goTo(n) {
        var clamped = Math.max(0, Math.min(count - 1, n));
        track.scrollTo({ left: offset(clamped), behavior: reduceMotion ? 'auto' : 'smooth' });
      }
      function update() {
        var left = track.scrollLeft;
        var max = track.scrollWidth - track.clientWidth;
        var nearest = 0;
        for (var i = 1; i < count; i++) {
          if (Math.abs(offset(i) - left) < Math.abs(offset(nearest) - left)) nearest = i;
        }
        index = left >= max - 2 ? count - 1 : nearest;
        prev.disabled = left <= 2;
        next.disabled = left >= max - 2;
        if (counter) counter.textContent = pad(index + 1) + ' / ' + pad(count);
        dots.forEach(function (d, i) {
          if (i === index) d.setAttribute('aria-current', 'true');
          else d.removeAttribute('aria-current');
        });
      }

      prev.addEventListener('click', function () { goTo(index - 1); });
      next.addEventListener('click', function () { goTo(index + 1); });
      track.addEventListener('scroll', update, { passive: true });
      window.addEventListener('resize', update);
      root.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowLeft') { e.preventDefault(); goTo(index - 1); }
        else if (e.key === 'ArrowRight') { e.preventDefault(); goTo(index + 1); }
      });

      update();
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
    initCarousels();
    initAccordions();
    initMentions();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
