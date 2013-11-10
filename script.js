$(document).ready(function(){

	images = ['1.jpg','6.jpg','7.jpg'];
	var cards = "";
	for(var i = 0; i < images.length; i++) {
		cards +=
		'<div class="card_wrapper">'+
			'<a class="image-popup-no-margins" href="'+images[i]+'">'+
				'<img src="'+images[i]+'" class="card" />'+
			'</a>'+
			'<div class="card_buttons">'+
				'<button class="rotate">r</button>'+
				'<button class="zoom">z</button>'+
			'</div>'+
		'</div>';
	}
	$('#card_table').append(cards);

	//disable normal click on a surrounding card image
	$('#card_table').on('click', '.card_wrapper a', function(e){
		e.preventDefault();
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

	$(function() {
		$('.card_wrapper').draggable({
            stack: '.card_wrapper',
			cursor: 'move',        // sets the cursor apperance
			containment: '#card_table'    // sets to can be dragged only within "#drg" element
        });
	});
});
