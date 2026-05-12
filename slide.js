document.addEventListener("DOMContentLoaded", function () {
   const slides = document.querySelectorAll('.fullscreen_slide');
   const progressContainer = document.getElementById('sliderProgress');
   const progressBarFill = document.getElementById('progressBarFill');
   const tickers = document.querySelectorAll('.jackpot_ticker');

   const totalSlides = slides.length;
   const slideDuration = 6000;
   const totalDuration = slideDuration * totalSlides;

   let currentIdx = -1;
   let animationFrameId;

   const JACKPOT_CONFIG = [{
         start: 319698717,
         speed: 4.5
      },
      {
         start: 12543890,
         speed: 1.2
      },
      {
         start: 45120350,
         speed: 2.8
      }
   ];

   function formatMoney(num) {
      return Math.floor(num).toLocaleString('ru-RU') + "$";
   }

   function setActiveSlide(index) {
      if (index !== currentIdx) {
         if (currentIdx >= 0 && slides[currentIdx]) {
            slides[currentIdx].classList.remove('active');
         }
         currentIdx = index;
         if (slides[currentIdx]) {
            slides[currentIdx].classList.add('active');
         }
      }
   }

   function startTimeline(offsetTime = 0) {
      const startTime = performance.now() - offsetTime;

      function step(now) {
         const elapsed = now - startTime;
         const loopElapsed = elapsed % totalDuration;
         const globalProgress = loopElapsed / totalDuration;

         progressBarFill.style.width = (globalProgress * 100) + '%';

         const calculatedIdx = Math.min(Math.floor(globalProgress * totalSlides), totalSlides - 1);
         setActiveSlide(calculatedIdx);

         const secondsElapsed = elapsed / 1000;
         tickers.forEach((ticker, idx) => {
            if (JACKPOT_CONFIG[idx]) {
               const currentAmount = JACKPOT_CONFIG[idx].start + (secondsElapsed * JACKPOT_CONFIG[idx].speed);
               ticker.textContent = formatMoney(currentAmount);
            }
         });

         animationFrameId = requestAnimationFrame(step);
      }
      animationFrameId = requestAnimationFrame(step);
   }

   progressContainer.addEventListener('click', function (e) {
      cancelAnimationFrame(animationFrameId);

      const rect = progressContainer.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const percentage = Math.max(0, Math.min(clickX / rect.width, 1));

      const targetTime = percentage * totalDuration;
      const targetIdx = Math.min(Math.floor(percentage * totalSlides), totalSlides - 1);

      setActiveSlide(targetIdx);
      startTimeline(targetTime);
   });

   setActiveSlide(0);
   startTimeline(0);
});