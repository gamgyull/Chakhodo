/* =====================================================================
   착호도 (捉虎圖 · Chakhodo) — 인터랙션 스크립트
   순수 바닐라 JS · 외부 라이브러리 없음
   - 헤더 스크롤 상태
   - 모바일 네비 토글
   - 스크롤 리빌 (IntersectionObserver)
   - 라이트박스 (스크린샷 확대)
   - 커서 글로우 (데스크톱)
   - 현재 연도 자동 입력
   - prefers-reduced-motion 존중
   ===================================================================== */
(function () {
  'use strict';
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  document.addEventListener('DOMContentLoaded', function () {

    /* ---- 헤더: 스크롤 시 배경 표시 ---- */
    var header = document.querySelector('.site-header');
    function onScroll() {
      if (!header) return;
      if (window.scrollY > 40) header.classList.add('scrolled');
      else header.classList.remove('scrolled');
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    /* ---- 모바일 네비 토글 ---- */
    var toggle = document.querySelector('.nav-toggle');
    var nav = document.querySelector('.nav');
    if (toggle && nav) {
      toggle.addEventListener('click', function () {
        var open = nav.classList.toggle('open');
        toggle.classList.toggle('open', open);
        toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        document.body.style.overflow = open ? 'hidden' : '';
      });
      nav.querySelectorAll('a').forEach(function (a) {
        a.addEventListener('click', function () {
          nav.classList.remove('open');
          toggle.classList.remove('open');
          document.body.style.overflow = '';
        });
      });
    }

    /* ---- 스크롤 리빌 ---- */
    var revealEls = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window && !reduceMotion) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
      revealEls.forEach(function (el) { io.observe(el); });
    } else {
      revealEls.forEach(function (el) { el.classList.add('in'); });
    }

    /* ---- 라이트박스 ---- */
    var lb = document.querySelector('.lightbox');
    if (lb) {
      var lbInner = lb.querySelector('.lightbox__inner');
      var lbCap = lb.querySelector('.lightbox__cap');
      var closeBtn = lb.querySelector('.lightbox__close');

      function openLightbox(html, caption) {
        lbInner.querySelectorAll('.lb-content').forEach(function (n) { n.remove(); });
        var holder = document.createElement('div');
        holder.className = 'lb-content';
        holder.innerHTML = html;
        lbInner.appendChild(holder);
        lbCap.textContent = caption || '';
        lb.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
      function closeLightbox() {
        lb.classList.remove('open');
        document.body.style.overflow = '';
      }

      document.querySelectorAll('[data-lightbox]').forEach(function (el) {
        el.addEventListener('click', function () {
          var inner = el.querySelector('.ph, img, .shot__img');
          var html = inner ? inner.outerHTML : el.innerHTML;
          openLightbox(html, el.getAttribute('data-caption') || '');
        });
      });
      closeBtn && closeBtn.addEventListener('click', closeLightbox);
      lb.addEventListener('click', function (e) { if (e.target === lb) closeLightbox(); });
      document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeLightbox(); });
    }

    /* ---- 제작 과정 캐러셀 ---- */
    document.querySelectorAll('.carousel').forEach(function (car) {
      var track = car.querySelector('.carousel__track');
      if (!track) return;
      var slides = track.querySelectorAll('.cslide');
      var prev = car.querySelector('.carousel__nav.prev');
      var next = car.querySelector('.carousel__nav.next');
      var curEl = car.querySelector('.carousel__count .cur');
      var totalEl = car.querySelector('.carousel__count .total');
      if (totalEl) totalEl.textContent = slides.length;

      function currentIndex() {
        return Math.round(track.scrollLeft / track.clientWidth);
      }
      function go(dir) {
        var i = Math.max(0, Math.min(slides.length - 1, currentIndex() + dir));
        track.scrollTo({ left: i * track.clientWidth, behavior: reduceMotion ? 'auto' : 'smooth' });
      }
      prev && prev.addEventListener('click', function () { go(-1); });
      next && next.addEventListener('click', function () { go(1); });
      track.addEventListener('scroll', function () {
        if (curEl) curEl.textContent = currentIndex() + 1;
      }, { passive: true });
    });

    /* ---- 커서 글로우 (포인터 정밀 입력 장치에서만) ---- */
    if (window.matchMedia('(pointer:fine)').matches && !reduceMotion) {
      var glow = document.querySelector('.cursor-glow');
      if (glow) {
        document.body.classList.add('has-cursor');
        var tx = 0, ty = 0, cx = 0, cy = 0;
        window.addEventListener('mousemove', function (e) { tx = e.clientX; ty = e.clientY; });
        (function loop() {
          cx += (tx - cx) * 0.12; cy += (ty - cy) * 0.12;
          glow.style.transform = 'translate(' + cx + 'px,' + cy + 'px)';
          requestAnimationFrame(loop);
        })();
      }
    }

    /* ---- 배경 동영상: 자동재생 보장 & 모션 최소화 존중 ---- */
    var heroVideo = document.querySelector('.hero__video');
    if (heroVideo) {
      if (reduceMotion) {
        // 모션 최소화를 켠 사용자에게는 정지 (접근성)
        heroVideo.removeAttribute('autoplay');
        heroVideo.pause();
      } else {
        var tryPlay = function () {
          var p = heroVideo.play();
          if (p && typeof p.catch === 'function') p.catch(function () {});
        };
        tryPlay();
        // 일부 브라우저가 자동재생을 막을 경우, 첫 상호작용 시 재생
        document.addEventListener('click', tryPlay, { once: true });
        document.addEventListener('touchstart', tryPlay, { once: true, passive: true });
        // 탭으로 돌아왔을 때 다시 재생
        document.addEventListener('visibilitychange', function () {
          if (!document.hidden) tryPlay();
        });
      }
    }

    /* ---- 현재 연도 ---- */
    document.querySelectorAll('[data-year]').forEach(function (el) {
      el.textContent = new Date().getFullYear();
    });

  });
})();
