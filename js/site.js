/* ==========================================================================
   site.js — the small amount of behaviour the Framer project relies on
   Project: "Portfolio Tony" (4pRs8QyCSry0wVCAGf6n)

   1. Navigation variant switch  (Phone <-> Phone Open)
   2. Language ES/EN switch — goes to the same page in the other language
   3. "current page" underline on the nav links
   4. appearEffect  — fade + rise when a block scrolls into view
   5. textEffect    — per-word reveal on the page titles
   6. Contact page  — Framer's fontSize: auto-fit(100%) on the headline
   7. Projects      — image carousels, «Ver proceso» reveal, fullscreen lightbox
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
     Helpers shared by the carousels (7 and 9)
     ------------------------------------------------------------------------ */
  var MAX_DOTS = 10;   // above this, a «01 / 22» counter replaces the dots

  function chevron(d) {
    return '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
      'stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      '<path d="' + d + '"/></svg>';
  }
  function makeButton(className, label, html) {
    var b = document.createElement('button');
    b.type = 'button';
    b.className = className;
    if (label) b.setAttribute('aria-label', label);
    b.innerHTML = html || '';
    return b;
  }
  function pad(n) { return (n < 10 ? '0' : '') + n; }

  /* ------------------------------------------------------------------------
     7. PROJECT CAROUSEL — Framer code component CompositionCarousel
        (/projects/tony-nieve, /projects/matchflix, /projects/metamorfosis)

     The slides are plain markup in a horizontally scrolling, snapping track,
     so the images show and swipe works without JavaScript. This adds:
       - a lightbox trigger around every image (and the reveal video);
       - for a series, ‹ dots › (a counter above 10) and ← / → keys — the
         active slide is read back from the track's scroll position, so
         swipe, arrows, dots and keys stay in sync. No autoplay, no loop;
       - for data-mode="reveal", the «Ver proceso» toggle that crossfades to
         the process video, which plays muted from the start while shown,
         on screen and not covered by the lightbox;
       - the fullscreen lightbox: same series, swipe / arrows / ← → / Esc,
         page scroll locked, focus trapped and returned on close.
     Labels are read from the nearest data-label-* attribute (the shared
     ones sit on <main>); a series' own name is its aria-label.
     ------------------------------------------------------------------------ */
  function labelFor(el, name) {
    var host = el.closest('[data-label-' + name + ']');
    return host ? host.getAttribute('data-label-' + name) : '';
  }
  function altOf(media) {
    return media.tagName === 'IMG' ? media.alt : (media.getAttribute('aria-label') || '');
  }

  // Plays from the start when it becomes active, pauses otherwise.
  function setPlaying(video, on) {
    if (!video || (video.dataset.playing === 'true') === on) return;
    video.dataset.playing = on ? 'true' : 'false';
    if (on) {
      video.currentTime = 0;
      var playing = video.play();
      if (playing) playing.catch(function () {});
    } else {
      video.pause();
    }
  }

  // Scroll-snap track whose active slide comes from its own scroll position.
  function snapTrack(track, count, onChange) {
    var index = 0;
    function set(n) {
      if (n !== index) { index = n; onChange(index); }
    }
    track.addEventListener('scroll', function () {
      if (track.clientWidth) set(Math.round(track.scrollLeft / track.clientWidth));
    }, { passive: true });
    // Keep the current slide in place when the width changes.
    window.addEventListener('resize', function () {
      if (track.isConnected) track.scrollTo({ left: index * track.clientWidth });
    });
    return {
      index: function () { return index; },
      goTo: function (n, instant) {
        var clamped = Math.max(0, Math.min(count - 1, n));
        track.scrollTo({ left: clamped * track.clientWidth, behavior: instant || reduceMotion ? 'auto' : 'smooth' });
        if (instant) set(clamped);
      }
    };
  }

  // ‹ dots › controls; labelHost is the carousel the labels are read from.
  function buildControls(labelHost, count, goTo) {
    var el = document.createElement('div');
    el.className = 'tn-carousel__controls';
    var prev = makeButton('tn-carousel__arrow', labelFor(labelHost, 'previous'), chevron('M15 5l-7 7 7 7'));
    var next = makeButton('tn-carousel__arrow', labelFor(labelHost, 'next'), chevron('M9 5l7 7-7 7'));
    var index = 0, dots = [], counter = null, middle;
    if (count > MAX_DOTS) {
      middle = counter = document.createElement('span');
      counter.className = 'tn-carousel__counter ts-label';
      counter.setAttribute('aria-live', 'polite');
    } else {
      middle = document.createElement('div');
      middle.className = 'tn-carousel__dots';
      for (var i = 0; i < count; i++) {
        var dot = makeButton('tn-carousel__dot', labelFor(labelHost, 'slide') + ' ' + (i + 1), '<span></span>');
        dot.addEventListener('click', goTo.bind(null, i, false));
        middle.appendChild(dot);
        dots.push(dot);
      }
    }
    prev.addEventListener('click', function () { goTo(index - 1); });
    next.addEventListener('click', function () { goTo(index + 1); });
    el.appendChild(prev);
    el.appendChild(middle);
    el.appendChild(next);

    function update(i) {
      index = i;
      prev.disabled = i <= 0;
      next.disabled = i >= count - 1;
      if (counter) counter.textContent = pad(i + 1) + ' / ' + pad(count);
      dots.forEach(function (d, k) {
        if (k === i) d.setAttribute('aria-current', 'true');
        else d.removeAttribute('aria-current');
      });
    }
    update(0);
    return { el: el, update: update };
  }

  function initCarousels() {
    Array.prototype.forEach.call(document.querySelectorAll('[data-carousel]'), function (root) {
      var track = root.querySelector('.tn-carousel__track');
      if (!track) return;
      var slides = Array.prototype.slice.call(track.children);
      var media = slides.map(function (slide) { return slide.querySelector('img, video'); });
      var count = slides.length;
      var reveal = root.getAttribute('data-mode') === 'reveal';
      var isCarousel = count > 1 && !reveal;
      var triggers = [];
      var nav = null, controls = null;
      var video = null, toggle = null;
      var showVideo = false, inView = false, lightboxOpen = false;

      // Every image (and the reveal video) opens the lightbox.
      slides.forEach(function (slide, i) {
        var open = labelFor(root, 'open');
        var alt = altOf(media[i]);
        var trigger = makeButton('tn-carousel__open', alt ? open + ': ' + alt : open);
        trigger.setAttribute('aria-haspopup', 'dialog');
        slide.insertBefore(trigger, media[i]);
        trigger.appendChild(media[i]);
        trigger.addEventListener('click', function () { openLightbox(i); });
        triggers.push(trigger);
      });

      if (isCarousel) {
        nav = snapTrack(track, count, function (i) { controls.update(i); });
        controls = buildControls(root, count, nav.goTo);
        root.appendChild(controls.el);
        root.addEventListener('keydown', function (e) {
          if (e.key === 'ArrowLeft') { e.preventDefault(); nav.goTo(nav.index() - 1); }
          else if (e.key === 'ArrowRight') { e.preventDefault(); nav.goTo(nav.index() + 1); }
        });
      }

      if (reveal) {
        video = track.querySelector('video');
        toggle = makeButton('tn-carousel__reveal ts-label');
        toggle.addEventListener('click', function () {
          showVideo = !showVideo;
          renderReveal();
        });
        root.appendChild(toggle);
        if ('IntersectionObserver' in window) {
          new IntersectionObserver(function (entries) {
            inView = entries[0].isIntersecting;
            syncVideo();
          }, { threshold: 0.4 }).observe(track);
        } else {
          inView = true;
        }
        renderReveal();
      }

      function syncVideo() { setPlaying(video, showVideo && inView && !lightboxOpen); }

      function renderReveal() {
        root.classList.toggle('is-video', showVideo);
        slides.forEach(function (slide, i) {
          var visible = (slide.getAttribute('data-kind') === 'video') === showVideo;
          slide.setAttribute('aria-hidden', visible ? 'false' : 'true');
          triggers[i].tabIndex = visible ? 0 : -1;
        });
        toggle.setAttribute('aria-pressed', showVideo ? 'true' : 'false');
        toggle.innerHTML = showVideo ? '' :
          '<svg width="7" height="8" viewBox="0 0 7 8" aria-hidden="true"><path d="M0 0L7 4L0 8Z" fill="currentColor"/></svg>';
        toggle.appendChild(document.createTextNode(labelFor(root, showVideo ? 'hide' : 'reveal')));
        syncVideo();
      }

      function openLightbox(start) {
        lightboxOpen = true;
        syncVideo();

        var dialog = document.createElement('div');
        dialog.className = 'tn-lightbox';
        dialog.setAttribute('role', 'dialog');
        dialog.setAttribute('aria-modal', 'true');
        dialog.setAttribute('aria-label', isCarousel ? root.getAttribute('aria-label') : altOf(media[start]));

        var bar = document.createElement('div');
        bar.className = 'tn-lightbox__bar';
        var closeButton = makeButton('tn-lightbox__close ts-nav');
        closeButton.textContent = '( ' + labelFor(root, 'close') + ' )';
        bar.appendChild(closeButton);

        var lightTrack = document.createElement('div');
        lightTrack.className = 'tn-lightbox__track';
        var copies = media.map(function (m, i) {
          var slide = document.createElement('div');
          slide.className = 'tn-lightbox__slide';
          slide.setAttribute('role', 'group');
          slide.setAttribute('aria-roledescription', 'slide');
          slide.setAttribute('aria-label', labelFor(root, 'slide') + ' ' + (i + 1) + ' / ' + count);
          var copy;
          if (m.tagName === 'VIDEO') {
            copy = document.createElement('video');
            copy.muted = true;
            copy.loop = true;
            copy.playsInline = true;
            copy.preload = 'metadata';
            copy.setAttribute('aria-label', altOf(m));
          } else {
            copy = document.createElement('img');
            copy.alt = m.alt;
            copy.draggable = false;
          }
          copy.src = m.currentSrc || m.src;
          slide.appendChild(copy);
          // Clicking the empty area around the image closes the lightbox.
          slide.addEventListener('click', function (e) { if (e.target === slide) closeLightbox(); });
          lightTrack.appendChild(slide);
          return copy;
        });

        var foot = document.createElement('div');
        foot.className = 'tn-lightbox__foot';
        dialog.appendChild(bar);
        dialog.appendChild(lightTrack);
        dialog.appendChild(foot);
        document.body.appendChild(dialog);

        var lightControls = null;
        var lightNav = snapTrack(lightTrack, count, function (i) {
          if (lightControls) lightControls.update(i);
          playActive(i);
        });
        if (count > 1) {
          lightControls = buildControls(root, count, lightNav.goTo);
          foot.appendChild(lightControls.el);
        }
        function playActive(i) {
          copies.forEach(function (c, k) { if (c.tagName === 'VIDEO') setPlaying(c, k === i); });
        }
        lightNav.goTo(start, true);
        if (lightControls) lightControls.update(start);
        playActive(start);

        var previousOverflow = document.documentElement.style.overflow;
        document.documentElement.style.overflow = 'hidden';
        closeButton.addEventListener('click', closeLightbox);
        document.addEventListener('keydown', onKey);
        closeButton.focus({ preventScroll: true });
        requestAnimationFrame(function () { dialog.classList.add('is-visible'); });

        function onKey(e) {
          if (e.key === 'Escape') { e.preventDefault(); closeLightbox(); }
          else if (e.key === 'ArrowLeft') { e.preventDefault(); lightNav.goTo(lightNav.index() - 1); }
          else if (e.key === 'ArrowRight') { e.preventDefault(); lightNav.goTo(lightNav.index() + 1); }
          else if (e.key === 'Tab') {
            // Keep focus inside the dialog.
            var focusable = Array.prototype.slice.call(dialog.querySelectorAll('button:not(:disabled)'));
            var first = focusable[0], last = focusable[focusable.length - 1];
            if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
            else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
          }
        }

        function closeLightbox() {
          var last = lightNav.index();
          document.removeEventListener('keydown', onKey);
          copies.forEach(function (c) { if (c.tagName === 'VIDEO') c.pause(); });
          dialog.remove();
          document.documentElement.style.overflow = previousOverflow;
          lightboxOpen = false;
          // Leave the inline carousel on the slide the lightbox ended on.
          if (nav) nav.goTo(last, true);
          var target = reveal ? triggers[showVideo ? 1 : 0] : triggers[last];
          target.focus({ preventScroll: true });
          syncVideo();
        }
      }
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
    Array.prototype.forEach.call(document.querySelectorAll('[data-mentions]'), function (root) {
      var track = root.querySelector('.mentions__track');
      if (!track) return;
      var cards = Array.prototype.slice.call(track.children);
      var count = cards.length;
      if (count < 2) return;

      var index = 0;
      var controls = document.createElement('div');
      controls.className = 'mentions__controls';
      var prev = makeButton('mentions__arrow', root.getAttribute('data-label-previous'), chevron('M15 5l-7 7 7 7'));
      var next = makeButton('mentions__arrow', root.getAttribute('data-label-next'), chevron('M9 5l7 7-7 7'));
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
          var dot = makeButton('mentions__dot', root.getAttribute('data-label-slide') + ' ' + (i + 1), '<span></span>');
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
