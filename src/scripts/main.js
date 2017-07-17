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
  var lastId,
    topMenu = $("#mainNav"),
    topMenuHeight = topMenu.closest('.main-header').outerHeight(),
    // All list items
    menuItems = topMenu.find("a"),
    // Anchors corresponding to menu items
    scrollItems = menuItems.map(function () {
      var item = $($(this).attr("href"));
      if (item.length) {
        return item;
      }
    });


  $('a', topMenu).on('click', function(){
    if ($('body').hasClass('show-mobile-menu')) {
      $('body').addClass('animating').removeClass('show-mobile-menu');
    }
  })


// Bind to scroll
  $(window).scroll(function () {
    // Get container scroll position
    var fromTop = $(this).scrollTop() + topMenuHeight;

    // Get id of current scroll item
    var cur = scrollItems.map(function () {
      if ($(this).offset().top < fromTop)
        return this;
    });
    // Get the id of the current element
    cur = cur[cur.length - 1];
    var id = cur && cur.length ? cur[0].id : "";

    if (lastId !== id) {
      lastId = id;
      // Set/remove active class
      menuItems
        .parent().removeClass("active")
        .end().filter("a[href=\\#" + id + "]").parent().addClass("active");
    }
  });

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
    if (document.body.scrollTop >= heightToShowMenu && !$('body').hasClass('fix-menu') && $('#press').offset().top + ($('#press').outerHeight() - $(window).height() + topMenuHeight) > document.body.scrollTop) {
      $('body').addClass('fix-menu');
    } else if ($('body').hasClass('fix-menu') && document.body.scrollTop < heightToShowMenu || $('#press').offset().top + ($('#press').outerHeight() - $(window).height() + topMenuHeight) < document.body.scrollTop) {
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

  $('[data-toggle="popover"]').popover({
      template: '<div class="popover" role="tooltip"><a role="button" class="close-popover"></a><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
    }
  )
    .on('shown.bs.popover', function(){
      var self = this;

      var popoverHeight = $('.popover').outerHeight();

      $('html, body').animate({
        scrollTop: $(this).offset().top - topMenuHeight - popoverHeight - 30
      }, 1000);

    $('.close-popover')
      .click(function(){
      $(self).popover('hide');
    });
  })



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
            scrollTop: target.offset().top - topMenuHeight + 1
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

  $('#subscribe #submit').on('click', function (e) {
    e.preventDefault();
    $.ajax({
      url: "https://www.mocky.io/v2/596bbb280f0000fc0a1670d5",
      cache: false
    })
      .done(function (html) {
        $("#results").addClass('success').html(html);
      })
      .fail(function (html) {
        $("#results").addClass('error').html(html);
      })
  })
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