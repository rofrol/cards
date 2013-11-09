$(document).ready(function(){

	images = ['1.jpg','6.jpg','7.jpg'];
	var cards = "";
	for(var i = 0; i < images.length; i++) {
		cards +=
		'<div class="card_wrapper" style="z-index: '+(1000+i)+'">'+
			'<a class="image-popup-no-margins" href="'+images[i]+'">'+
				'<img src="'+images[i]+'" class="card" />'+
			'</a>'+
			'<div class="card_buttons">'+
				'<button class="rotate">r</button>'+
				'<button class="zoom">z</button>'+
				'<button class="up">u</button>'+
				'<button class="down">d</button>'+
			'</div>'+
		'</div>';
	}
	$('#card_table').append(cards);
	var container = document.querySelector('#card_table');
	
	var Draggabilly = window.Draggabilly;
	var elems = container.querySelectorAll('.card_wrapper');

	for(var i=0, len = elems.length; i < len; i++) {
		var elem = elems[i];
		new Draggabilly( elem, {
			containment: true
		});
	}

	//disable normal click on a surrounding card image
	$('#card_table').on('click', '.card_wrapper a', function(e){
		e.preventDefault();
	});

	$('#card_table').on('click', '.up', function(){
		var card_wrapper = $(this).closest('.card_wrapper');
		var cur_z_index = parseInt(card_wrapper.css('z-index'), 10);

		above = $('#card_table .card_wrapper').filter(function () { return $(this).css('z-index') > cur_z_index });
		
		indexes = [];
		above.each(function() {
			var index = parseInt($(this).css("z-index"), 10);
			indexes.push(index);
		});

		var min = Math.min.apply(null, indexes);
		card_wrapper_min = $('#card_table .card_wrapper').filter(function () { return $(this).css('z-index') == min }).eq(0);
		card_wrapper.css({'z-index':min});
		card_wrapper_min.css({'z-index':cur_z_index});
	});

	$('#card_table').on('click', '.down', function(){
		var card_wrapper = $(this).closest('.card_wrapper');
		var cur_z_index = parseInt(card_wrapper.css('z-index'), 10);

		below = $('#card_table .card_wrapper').filter(function () { return $(this).css('z-index') < cur_z_index });
		
		indexes = [];
		below.each(function() {
			var index = parseInt($(this).css("z-index"), 10);
			indexes.push(index);
		});

		var max = Math.max.apply(null, indexes);
		card_wrapper_max = $('#card_table .card_wrapper').filter(function () { return $(this).css('z-index') == max }).eq(0);
		card_wrapper.css({'z-index':max});
		card_wrapper_max.css({'z-index':cur_z_index});
	});

	$('#card_table').on('click', '.rotate', function(){
		var card = $(this).closest('.card_wrapper').find('.card');
		card.toggleClass('rotated');
	});
	
	$('#card_table').on('click', '.zoom',  function(e) {
		// http://webdesign.tutsplus.com/tutorials/htmlcss-tutorials/super-simple-lightbox-with-css-and-jquery/
		// http://www.net-kit.com/10-css3-lightbox-alternatives/
		// http://lokeshdhakar.com/projects/lightbox2/
		// http://dimsemenov.com/plugins/magnific-popup/
		// http://brutaldesign.github.io/swipebox/

		//prevent default action (hyperlink)
		
		//Get clicked link href
		var image_href = $(this).closest('.card_wrapper').find('.card').attr("src");
		
		/* 	
		If the lightbox window HTML already exists in document, 
		change the img src to to match the href of whatever link was clicked
		
		If the lightbox window HTML doesn't exists, create it and insert it.
		(This will only happen the first time around)
		*/
		
		if ($('#lightbox').length > 0) { // #lightbox exists
			
			//place href as img src value
			$('#content').html('<img src="' + image_href + '" />');
			
			//show lightbox window - you could use .show('fast') for a transition
			$('#lightbox').show();
		} else { //#lightbox does not exist - create and insert (runs 1st time only)
			//create HTML markup for lightbox window
			var lightbox = 
			'<div id="lightbox">' +
					'<img src="' + image_href +'" />' +
			'</div>';
				
			//insert lightbox HTML into page
			$('body').append(lightbox);
		}
	});

	$(document).on('click', '#lightbox', function(){  
		$('#lightbox').hide();
	});

	// http://stackoverflow.com/a/1922012/588759
	$('#card_table').on(		{
		mouseenter: function(){
			$(this).find('.card_buttons').slideDown();
		},
		mouseleave: function(){
			$(this).find('.card_buttons').slideUp();
		}
	}, '.card_wrapper:not(.is-dragging)');
});