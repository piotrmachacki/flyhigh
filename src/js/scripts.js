(function() {

	$(document).ready(function() {



		// Assigning elements to variables
		// ---------------------------------------------- //
		var $select2 = $('.select2');
		// ---------------------------------------------- //
		
		
		
		// Init functions
		// ---------------------------------------------- //
		MobileMenuInit();
		Select2Init();
		// ---------------------------------------------- //



		// Mobile Menu Init
		// ---------------------------------------------- //
		function MobileMenuInit() {
			var $menu = $('#mob-menu');
			var $showMenuBtn = $('#show-menu-btn');
			var $hideMenuBtn = $('#hide-menu-btn');

			$showMenuBtn.on('click', function(e) {
				e.preventDefault();
				var $this = $(this);
				var isActive = $this.hasClass('is-active');
				$this.toggleClass('is-active', !isActive);
				$menu.toggleClass('active', !isActive);
			});

			$hideMenuBtn.on('click', function(e) {
				e.preventDefault();
				$menu.removeClass('active');
				$showMenuBtn.removeClass('is-active');
			});
		}
		// ---------------------------------------------- //



		// Select2 Init
		// ---------------------------------------------- //
		function Select2Init() {
			$select2.each(function(index, el) {
				var $this = $(this);
				var $parent = $this.parent();
				var placeholder = $this.attr('placeholder') || '-- Wybierz --';
				$parent.css('position', 'relative');
				$this.select2({
					dropdownParent: $parent,
					placeholder: placeholder,
					minimumResultsForSearch: -1,
					dropdownAutoWidth: true,
					width: 'style'
				});
			});
		}
		// ---------------------------------------------- //



	});
	
})($);