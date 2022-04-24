// vars
("use strict");

const projectSwiper = new Swiper(".swiper-projects", {
  slidesPerView: "auto",
  centeredSlides: true,
  grabCursor: true,
  loop: false,
  loopFillGroupWithBlank: false,

  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

//TESTIMONIALS SLIDER ELEMENT
const testimonial = document.getElementById("testim");

// TESTIMONIALS CONTENT
const testimonialContent = Array.prototype.slice.call(
  document.getElementById("testim-content").children
);

//NAVIGATION DOTS
const navDots = Array.prototype.slice.call(
  document.getElementById("testim-dots").children
);

//NAVIGATION ARROWS
const leftArrow = document.getElementById("left-arrow"),
  rightArrow = document.getElementById("right-arrow");

let testimonialPlaySpeed = 4500,
  currentSlide = 0,
  currentActive = 0,
  testimonialTimer,
  touchStartPos,
  touchEndPos,
  touchPosDiff,
  ignoreTouch = 30;

window.onload = function () {
  // Testimonials Script
  function playSlide(slide) {
    for (var k = 0; k < navDots.length; k++) {
      testimonialContent[k].classList.remove("active");
      testimonialContent[k].classList.remove("inactive");
      testimonialContent[k].classList.remove("active");
    }

    if (slide < 0) {
      slide = currentSlide = testimonialContent.length - 1;
    }

    if (slide > testimonialContent.length - 1) {
      slide = currentSlide = 0;
    }

    if (currentActive != currentSlide) {
      testimonialContent[currentActive].classList.add("inactive");
    }
    testimonialContent[slide].classList.add("active");
    navDots[slide].classList.add("active");

    currentActive = currentSlide;

    clearTimeout(testimonialTimer);
    testimonialTimer = setTimeout(function () {
      playSlide((currentSlide += 1));
    }, testimonialPlaySpeed);
  }

  leftArrow.addEventListener("click", function () {
    playSlide((currentSlide -= 1));
  });

  rightArrow.addEventListener("click", function () {
    playSlide((currentSlide += 1));
  });

  for (var l = 0; l < navDots.length; l++) {
    navDots[l].addEventListener("click", function () {
      playSlide((currentSlide = navDots.indexOf(this)));
    });
  }

  playSlide(currentSlide);

  // keyboard shortcuts
  document.addEventListener("keyup", function (e) {
    switch (e.keyCode) {
      case 37:
        leftArrow.click();
        break;

      case 39:
        rightArrow.click();
        break;

      case 39:
        rightArrow.click();
        break;

      default:
        break;
    }
  });

  testim.addEventListener("touchstart", function (e) {
    touchStartPos = e.changedTouches[0].clientX;
  });

  testim.addEventListener("touchend", function (e) {
    touchEndPos = e.changedTouches[0].clientX;

    touchPosDiff = touchStartPos - touchEndPos;

    console.log(touchPosDiff);
    console.log(touchStartPos);
    console.log(touchEndPos);

    if (touchPosDiff > 0 + ignoreTouch) {
      leftArrow.click();
    } else if (touchPosDiff < 0 - ignoreTouch) {
      rightArrow.click();
    } else {
      return;
    }
  });
};
