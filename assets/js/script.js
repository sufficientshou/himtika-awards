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
			var visibleIndex = 0;

			$('.award-card-item').each(function() {
				var $card = $(this);
				var category = $card.attr('data-category');
				var status = $card.attr('data-status');
				var isUpcoming = status === 'upcoming' || $card.find('.award-status.upcoming').length > 0;

				var shouldShow = (filterValue === 'all') ? !isUpcoming : (category === filterValue);

				if (!shouldShow) {
					$card.stop(true, true).addClass('hide').css({
						'opacity': '0',
						'transform': ''
					});
				}
			});

			$('.award-card-item').each(function() {
				var $card = $(this);
				var category = $card.attr('data-category');
				var status = $card.attr('data-status');
				var isUpcoming = status === 'upcoming' || $card.find('.award-status.upcoming').length > 0;

				var shouldShow = (filterValue === 'all') ? !isUpcoming : (category === filterValue);

				if (shouldShow) {
					var delay = visibleIndex * 60;
					visibleIndex++;

					$card.removeClass('hide');
					$card.stop(true, true).css({
						'opacity': '0',
						'transform': 'scale(0.92) translateY(14px)'
					});

					setTimeout(function() {
						$card.animate({
							'opacity': 1
						}, {
							duration: 300,
							step: function(now, fx) {
								if (fx.prop === 'opacity') {
									var scale = 0.92 + (0.08 * now);
									var transY = 14 * (1 - now);
									$card.css('transform', 'scale(' + scale + ') translateY(' + transY + 'px)');
								}
							},
							complete: function() {
								$card.css({'opacity': '', 'transform': ''});
							}
						});
					}, delay);
				}
			});
		}

		$('.awards-tab-btn').on('click', function() {
			var filterValue = $(this).attr('data-filter');
			$('.awards-tab-btn').removeClass('active');
			$(this).addClass('active');

			$('#awardsGrid').scrollLeft(0);
			filterCards(filterValue);
		});

		var initialFilter = $('.awards-tab-btn.active').attr('data-filter') || 'all';
		filterCards(initialFilter);
	}

	if ($.easing) {
		$.easing.smoothSlide = function(x, t, b, c, d) {
			return c * (1 - Math.pow(1 - t / d, 4)) + b;
		};
	}

	function initAwardsDots() {
		var $grid = $('#awardsGrid');
		var $dotsContainer = $('#awardsDots');

		function getVisibleCards() {
			return $grid.find('.award-card-item:not(.hide)');
		}

		function resetCardOrder() {
			var $visible = getVisibleCards();
			if ($visible.length <= 1) return;

			var sortedCards = $visible.toArray().sort(function(a, b) {
				var idxA = parseInt($(a).attr('data-card-index'), 10) || 0;
				var idxB = parseInt($(b).attr('data-card-index'), 10) || 0;
				return idxA - idxB;
			});

			$.each(sortedCards, function(i, el) {
				$grid.append(el);
			});

			$grid.scrollLeft(0);
		}

		function updateActiveDot() {
			var $visible = getVisibleCards();
			if (!$visible.length) return;

			var cardWidth = $visible.first().outerWidth(true) || $grid.width();
			if (!cardWidth) return;

			var scrollPos = $grid.scrollLeft();
			var activeIndex = Math.round(scrollPos / cardWidth);

			if (activeIndex < 0) activeIndex = 0;
			if (activeIndex >= $visible.length) activeIndex = $visible.length - 1;

			$dotsContainer.find('.award-dot').removeClass('active');
			$dotsContainer.find('.award-dot').eq(activeIndex).addClass('active');
		}

		function renderDots() {
			$dotsContainer.empty();
			resetCardOrder();
			var $visibleCards = getVisibleCards();

			if ($visibleCards.length <= 1) {
				$dotsContainer.addClass('hide');
				return;
			} else {
				$dotsContainer.removeClass('hide');
			}

			$visibleCards.each(function(i) {
				var $dot = $('<button>', {
					class: 'award-dot' + (i === 0 ? ' active' : ''),
					'data-dot-index': i,
					'aria-label': 'Go to card ' + (i + 1)
				});

				$dot.on('click', function(e) {
					e.preventDefault();
					var cardWidth = $visibleCards.first().outerWidth(true) || $grid.width();
					$grid.stop(true, true).animate({
						scrollLeft: i * cardWidth
					}, 350);
				});

				$dotsContainer.append($dot);
			});

			updateActiveDot();
		}

		$grid.off('scroll.dots').on('scroll.dots', function() {
			updateActiveDot();
		});

		$('.awards-tab-btn').off('click.dots').on('click.dots', function() {
			setTimeout(function() {
				renderDots();
			}, 350);
		});

		renderDots();
	}

	function initCardLightbox() {
		var $modal = $('#imageLightbox');
		var $modalImg = $('#lightboxImg');
		var $modalTitle = $('#lightboxTitle');

		$(document).on('click', '.award-card-item', function() {
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

		$('#lightboxClose, .lightbox-backdrop').on('click', function() {
			closeModal();
		});

		$(document).on('keydown', function(e) {
			if (e.key === 'Escape' && $modal.hasClass('active')) {
				closeModal();
			}
		});
	}

	$(window).on('load', function() {
		handlePreloader();
		initTypewriter();
		initAwardTabs();
		initAwardsDots();
		initCardLightbox();
	});	

})(window.jQuery);