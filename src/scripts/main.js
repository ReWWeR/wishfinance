$(document).ready(function () {
  svg4everybody();

  AOS.init({
    // startEvent: 'load',
    once: true
  });

  /*$(window).on('load', function () {
    AOS.refresh();
  });*/

  var $hamburgerMenuBtn = $('.hamburger-menu');

  $('.navigation').on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function () {
    $('body').removeClass('animating');
  });

  $hamburgerMenuBtn.on('click', function () {
    $('body').toggleClass('show-mobile-menu');
    $('body').addClass('animating');
  })


  var heightToShowMenu = null;

  function checkHeight() {
    var $screenToCheck = document.querySelector('.hero-section');
    heightToShowMenu = $screenToCheck.offsetHeight;
  }

  checkHeight();

  $(window).on('resize', function () {
    checkHeight();
    $('#roadmap').sly('reload');
  });

  $(window).on('scroll', function () {
    if (document.body.scrollTop >= heightToShowMenu && !$('body').hasClass('fix-menu')) {
      $('body').addClass('fix-menu');
    } else if ($('body').hasClass('fix-menu') && document.body.scrollTop < heightToShowMenu) {
      $('body').removeClass('fix-menu');
    }
  })

  $('#roadmap').sly({
    horizontal: 1,
    itemNav: 'basic',
    smart: 1,
    activateOn: 'click',
    mouseDragging: 1,
    touchDragging: 1,
    releaseSwing: 1,
    startAt: 0,
    scrollBar: $('#scrollbar'),
    scrollBy: 1,
    // pagesBar: $wrap.find('.pages'),
    activatePageOn: 'click',
    speed: 300,
    elasticBounds: 1,
    // easing: 'easeOutExpo',
    dragHandle: 1,
    // dynamicHandle: 1,
    clickBar: 1
  });

  $('[data-toggle="popover"]').popover();

  $('.slick-slider').slick({
    dots: true
  });

// Select all links with hashes
  $('a[href*="#"]')
  // Remove links that don't actually link to anything
    .not('[href="#"]')
    .not('[href="#0"]')
    .click(function (event) {
      // On-page links
      if (
        location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
        &&
        location.hostname == this.hostname
      ) {
        // Figure out element to scroll to
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        // Does a scroll target exist?
        if (target.length) {
          // Only prevent default if animation is actually gonna happen
          event.preventDefault();
          $('html, body').animate({
            scrollTop: target.offset().top
          }, 1000, function () {
            // Callback after animation
            // Must change focus!
            var $target = $(target);
            $target.focus();
            if ($target.is(":focus")) { // Checking if the target was focused
              return false;
            } else {
              $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
              $target.focus(); // Set focus again
            }
            ;
          });
        }
      }
    });

  $('#ytplayer-modal').on('shown.bs.modal', function () {
    player.playVideo();
  })

  $('#ytplayer-modal').on('hidden.bs.modal', function () {
    player.pauseVideo();
  });
});

// Load the IFrame Player API code asynchronously.
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/player_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// Replace the 'ytplayer' element with an <iframe> and
// YouTube player after the API code downloads.
var player;
var videoId = $('#ytplayer-modal').data('video-id');
function onYouTubePlayerAPIReady() {
  player = new YT.Player('ytplayer', {
    width: '100%',
    videoId: videoId
  });
  AOS.refresh();
}