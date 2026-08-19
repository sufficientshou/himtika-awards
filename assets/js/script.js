(function ($) {
	"use strict";

	function handlePreloader() {
		if ($('.preloader').length) {
			$('body').addClass('page-loaded');
			$('.preloader').delay(1000).fadeOut(300);
		}
	}

	var $header = $('.main-header');
	var $backToTop = $('#backToTop');

	function headerStyle(scrollY) {
		if (!$header.length) return;
		if (scrollY === undefined) scrollY = $(window).scrollTop();

		if (scrollY <= 400) {
			$header.removeClass('header-fixed').addClass('header-absolute');
			$header.css({
				"transform": "translateY(0)",
				"opacity": "1"
			});
		} else if (scrollY > 400 && scrollY <= 550) {
			$header.css({
				"transform": "translateY(-100px)",
				"opacity": "0"
			});
		} else {
			$header.addClass('header-fixed').removeClass('header-absolute');
			$header.css({
				"transform": "translateY(0)",
				"opacity": "1"
			});
		}
	}

	function updateBackToTop(scrollY) {
		if (!$backToTop.length) return;
		if (scrollY === undefined) scrollY = $(window).scrollTop();

		if (scrollY > 300) {
			$backToTop.addClass('show');
		} else {
			$backToTop.removeClass('show');
		}
	}

	var isScrolling = false;
	$(window).on('scroll', function () {
		if (!isScrolling) {
			window.requestAnimationFrame(function () {
				var scrollY = $(window).scrollTop();
				headerStyle(scrollY);
				updateBackToTop(scrollY);
				isScrolling = false;
			});
			isScrolling = true;
		}
	});

	headerStyle();
	updateBackToTop();

	if ($('.main-header li.dropdown ul').length) {
		$('.main-header .navigation li.dropdown').append('<div class="dropdown-btn"><span class="fa fa-angle-right"></span></div>');
	}

	if ($('.mobile-menu').length) {
		$('.mobile-menu .menu-box').mCustomScrollbar();

		var mobileMenuContent = $('.main-header .nav-outer .main-menu').html();
		$('.mobile-menu .menu-box .menu-outer').append(mobileMenuContent);
		$('.sticky-header .main-menu').append(mobileMenuContent);

		$('.mobile-menu li.dropdown .dropdown-btn').on('click', function () {
			$(this).toggleClass('open');
			$(this).prev('ul').slideToggle(500);
		});

		$('.mobile-nav-toggler').on('click', function () {
			$('body').addClass('mobile-menu-visible');
		});

		$('.mobile-menu .menu-backdrop,.mobile-menu .close-btn').on('click', function () {
			$('body').removeClass('mobile-menu-visible');
		});
	}

	$(document).on('click', 'a[href^="#"]', function (e) {
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

	if ($('.scroll-to-target').length) {
		$(".scroll-to-target").on('click', function () {
			var target = $(this).attr('data-target');
			$('html, body').animate({
				scrollTop: $(target).offset().top
			}, 1500);
		});
	}

	$('#backToTop').on('click', function (e) {
		e.preventDefault();
		window.scrollTo({ top: 0, behavior: 'auto' });
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
				var $card = $(this);
				var category = $card.attr('data-category');
				var status = $card.attr('data-status');
				var isUpcoming = status === 'upcoming' || $card.find('.award-status.upcoming').length > 0;
				var shouldShow = (filterValue === 'all') ? !isUpcoming : (category === filterValue);

				if (shouldShow) {
					$card.removeClass('hide').css('opacity', '1');
				} else {
					$card.addClass('hide').css('opacity', '0');
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

	if ($.easing) {
		$.easing.smoothSlide = function (x, t, b, c, d) {
			return c * (1 - Math.pow(1 - t / d, 4)) + b;
		};
	}

	function initAwardsDots() {
		var $grid = $('#awardsGrid');
		var $dotsContainer = $('#awardsDots');
		var trackIndex = 1;
		var touchStartX = 0;
		var touchStartY = 0;
		var touchCurrentX = 0;
		var isDragging = false;
		var isTransitioning = false;

		function getRealCards() {
			return $grid.find('.award-card-item:not(.hide):not(.award-card-clone)');
		}

		function isMobile() {
			return window.matchMedia('(max-width: 768px)').matches || $(window).width() <= 768;
		}

		function updateDotsUI(realIndex) {
			$dotsContainer.find('.award-dot').removeClass('active');
			$dotsContainer.find('.award-dot').eq(realIndex).addClass('active');
		}

		function setupClonesAndDots() {
			$grid.find('.award-card-clone').remove();
			$dotsContainer.empty();

			var $realCards = getRealCards();

			if ($realCards.length <= 1 || !isMobile()) {
				$dotsContainer.addClass('hide');
			} else {
				$dotsContainer.removeClass('hide');

				var $firstClone = $realCards.last().clone().addClass('award-card-clone');
				var $lastClone = $realCards.first().clone().addClass('award-card-clone');

				$grid.prepend($firstClone);
				$grid.append($lastClone);

				setTimeout(function() {
					var cardWidth = $grid.width();
					$grid.scrollLeft(cardWidth);
				}, 10);

				$realCards.each(function(i) {
					var $dot = $('<button>', {
						class: 'award-dot' + (i === 0 ? ' active' : ''),
						'data-dot-index': i,
						'aria-label': 'Go to card ' + (i + 1)
					});

					$dot.on('click', function(e) {
						e.preventDefault();
						var cardWidth = $grid.width();
						var targetScrollLeft = (i + 1) * cardWidth;
						if ($grid[0].scrollTo) {
							$grid[0].scrollTo({ left: targetScrollLeft, behavior: 'smooth' });
						} else {
							$grid.stop(true, true).animate({ scrollLeft: targetScrollLeft }, 350);
						}
					});

					$dotsContainer.append($dot);
				});
			}
		}

		var scrollTimer = null;
		$grid.off('scroll.infinite').on('scroll.infinite', function() {
			if (!isMobile()) return;
			
			var cardWidth = $grid.width();
			if (!cardWidth) return;
			
			var scrollPos = $grid.scrollLeft();
			var currentIndex = Math.round(scrollPos / cardWidth);
			var totalCards = $grid.children('.award-card-item:not(.hide)').length;
			var $realCards = getRealCards();
			
			var realIndex = currentIndex - 1;
			if (realIndex < 0) realIndex = $realCards.length - 1;
			if (realIndex >= $realCards.length) realIndex = 0;
			updateDotsUI(realIndex);

			clearTimeout(scrollTimer);
			scrollTimer = setTimeout(function() {
				var newScrollPos = $grid.scrollLeft();
				var newIndex = Math.round(newScrollPos / cardWidth);
				
				if (newIndex === 0) {
					$grid.scrollLeft(cardWidth * (totalCards - 2));
				} else if (newIndex === totalCards - 1) {
					$grid.scrollLeft(cardWidth);
				}
			}, 150);
		});

		$(window).off('resize.dots').on('resize.dots', function() {
			setupClonesAndDots();
		});

		$('.awards-tab-btn').off('click.dots').on('click.dots', function() {
			setTimeout(function() {
				setupClonesAndDots();
			}, 100);
		});

		setupClonesAndDots();
	}

	function initCardLightbox() {
		var $modal = $('#imageLightbox');
		var $modalImg = $('#lightboxImg');
		var $modalTitle = $('#lightboxTitle');

		$(document).on('click', '.award-card-item', function () {
			var $img = $(this).find('.award-card-img');
			if ($img.length && $img.attr('src')) {
				var imgSrc = $img.attr('src');
				var titleText = $(this).find('.award-card-title').text() || '';

				$modalImg.attr('src', imgSrc);
				$modalTitle.text(titleText);
				$modal.addClass('active');
				$('body').css('overflow', 'hidden');
			}
		});

		function closeModal() {
			$modal.removeClass('active');
			$('body').css('overflow', '');
		}

		$('#lightboxClose, .lightbox-backdrop').on('click', function () {
			closeModal();
		});

		$(document).on('keydown', function (e) {
			if (e.key === 'Escape' && $modal.hasClass('active')) {
				closeModal();
			}
		});
	}

	$(window).on('load', function () {
		handlePreloader();
		initTypewriter();
		initAwardTabs();
		initAwardsDots();
		initCardLightbox();
	});

})(window.jQuery);