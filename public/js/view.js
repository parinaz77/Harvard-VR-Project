$(document).ready(function() {
	$('.nav-wrapper').html(
    '<a href="/" class="brand-logo">Harvard VR</a>'+
    '<ul id="nav-mobile" class="right hide-on-med-and-down">'+
      '<li><a href="/collections">Collections</a></li>'+
      '<li><a href="#TOP">About us</a></li>'+
      '<li><a href="#BOTTOM">Contact us</a></li>'+
    '</ul>')

	$('.parallax').parallax();

	$(".button").on('click', function(){
     window.location = "/collections";    
	});

	$('.modal').modal();
  $('.carousel').carousel();

	$('.submit-ajax').on('click', function(){
    $('.load-bar').html(
      '<div class="progress">'+
      '<div class="indeterminate"></div>'+
      '</div>')
    }
  )

	$('.row-footer').html(
    '<div class="col l6 s12">'+
      '<h5 class="white-text">Footer Content</h5>'+
      '<p class="grey-text text-lighten-4">You can use rows and columns here to organize your footer content.</p>'+
    '</div>'+
    '<div class="col l4 offset-l2 s12">'+
      '<h5 class="white-text">Links</h5>'+
      '<ul>'+
        '<li><a class="grey-text text-lighten-3" href="#!">Link 1</a></li>'+
        '<li><a class="grey-text text-lighten-3" href="#!">Link 2</a></li>'+
        '<li><a class="grey-text text-lighten-3" href="#!">Link 3</a></li>'+
        '<li><a class="grey-text text-lighten-3" href="#!">Link 4</a></li>'+
      '</ul>'+
    '</div>' )

  $('.footer-copyright').html(        
    '© 2017 Copyright Text'+
    '<a class="grey-text text-lighten-4 right" href="#!">More Links</a>' )
})
