(function($) {
	"use strict";
	
	function handlePreloader() {
		if($('.preloader').length){
			$('body').addClass('page-loaded');
			$('.preloader').delay(1000).fadeOut(300);
		}
	}
	
	function headerStyle() {
		if($('.main-header').length){
			var scrollY = $(window).scrollTop();
			var header = $('.main-header');
			var headerTop = $('.header-top');

			if (scrollY <= 400) {
				header.removeClass('header-fixed').addClass('header-absolute');
				header.css({
					"transform": "translateY(0)",
					"opacity": "1"
				});
			} else if (scrollY > 400 && scrollY <= 550) {
				header.css({
					"transform": "translateY(-100px)",
					"opacity": "0"
				});
			} else {
				header.addClass('header-fixed').removeClass('header-absolute');
				header.css({
					"transform": "translateY(0)",
					"opacity": "1"
				});
			}
		}
	}
	
	$(window).on('scroll', function() {
		headerStyle();
	});
	
	headerStyle();

	$(window).on('scroll', function() {
		headerStyle();
	});

	if($('.main-header li.dropdown ul').length){
		$('.main-header .navigation li.dropdown').append('<div class="dropdown-btn"><span class="fa fa-angle-right"></span></div>');
	}

	if($('.mobile-menu').length){
		$('.mobile-menu .menu-box').mCustomScrollbar();
		
		var mobileMenuContent = $('.main-header .nav-outer .main-menu').html();
		$('.mobile-menu .menu-box .menu-outer').append(mobileMenuContent);
		$('.sticky-header .main-menu').append(mobileMenuContent);
		
		$('.mobile-menu li.dropdown .dropdown-btn').on('click', function() {
			$(this).toggleClass('open');
			$(this).prev('ul').slideToggle(500);
		});

		$('.mobile-nav-toggler').on('click', function() {
			$('body').addClass('mobile-menu-visible');
		});

		$('.mobile-menu .menu-backdrop,.mobile-menu .close-btn').on('click', function() {
			$('body').removeClass('mobile-menu-visible');
		});
	}

	$(document).on('click', 'a[href^="#"]', function(e) {
		var targetId = $(this).attr('href');
		if (targetId && targetId !== '#' && $(targetId).length) {
			e.preventDefault();
			var targetPosition = $(targetId).offset().top - 40;
			window.scrollTo({
				top: targetPosition,
				behavior: 'smooth'
			});
		}
	});

	if($('.scroll-to-target').length){
		$(".scroll-to-target").on('click', function() {
			var target = $(this).attr('data-target');
			$('html, body').animate({
				scrollTop: $(target).offset().top
			}, 1500);
		});
	}

	$(window).on('scroll', function() {
		var scrollPos = $(window).scrollTop();
		var btn = $('#backToTop');

		if (scrollPos > 300) {
			btn.addClass('show');
		} else {
			btn.removeClass('show');
		}
	});

	$('#backToTop').on('click', function(e) {
		e.preventDefault();
		$('html, body').animate({
			scrollTop: 0
		}, 0);
	});
	
	function initTypewriter() {
		var $target = $('#typewriter-text');
		if (!$target.length) return;

		var text = 'Awards';
		var charIndex = 0;
		var isDeleting = false;

		$target.text('');

		function type() {
			$target.text(text.substring(0, charIndex));

			var typingSpeed = isDeleting ? 90 : 150;

			if (!isDeleting && charIndex === text.length) {
				typingSpeed = 2500;
				isDeleting = true;
			} else if (isDeleting && charIndex === 0) {
				isDeleting = false;
				typingSpeed = 400;
			}

			charIndex += isDeleting ? -1 : 1;

			setTimeout(type, typingSpeed);
		}

		setTimeout(type, 600);
	}

	function initAwardTabs() {
		function filterCards(filterValue) {
			$('.award-card-item').each(function() {
				var category = $(this).attr('data-category');
				var status = $(this).attr('data-status');
				var isUpcoming = status === 'upcoming' || $(this).find('.award-status.upcoming').length > 0;

				if (filterValue === 'all') {
					if (isUpcoming) {
						$(this).addClass('hide').fadeOut(200);
					} else {
						$(this).removeClass('hide').fadeIn(400);
					}
				} else {
					if (category === filterValue) {
						$(this).removeClass('hide').fadeIn(400);
					} else {
						$(this).addClass('hide').fadeOut(200);
					}
				}
			});
		}

		$('.awards-tab-btn').on('click', function() {
			var filterValue = $(this).attr('data-filter');
			$('.awards-tab-btn').removeClass('active');
			$(this).addClass('active');

			filterCards(filterValue);
		});

		var initialFilter = $('.awards-tab-btn.active').attr('data-filter') || 'all';
		filterCards(initialFilter);
	}
	
	$(window).on('load', function() {
		handlePreloader();
		initTypewriter();
		initAwardTabs();
	});	

})(window.jQuery);