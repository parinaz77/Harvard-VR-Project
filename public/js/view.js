$(document).ready(function() {
	$('.nav-wrapper').html(
    '<a href="/" class="brand-logo">WebVision</a>'+
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
      '<h5 class="white-text">Contribute to WebVision</h5>'+
      '<p class="grey-text text-lighten-4">WebVision is an open source project. You can contribute to add more functionality for your study purposes or ask us to help you with that. </p>'+
    '</div>'+
    '<div class="col l4 offset-l2 s12">'+
      '<h5 class="white-text">Links</h5>'+
      '<ul>'+
        '<li><a class="grey-text text-lighten-3" href="/">Home</a></li>'+
        '<li><a class="grey-text text-lighten-3" href="https://github.com/parinaz77/Harvard-VR-Project">Github</a></li>'+

        '<li><i class="color-white tiny material-icons">perm_identity</i><a class="grey-text text-lighten-3" href="https://www.linkedin.com/in/parinaz-khosraviani/">Parinaz khosraviani</a></li>'+
        '<li><i class="color-white tiny material-icons">perm_identity</i><a class="grey-text text-lighten-3" href="https://www.linkedin.com/in/tony-t-nguyen/">Tony Nguyen</a></li>'+
      '</ul>'+
    '</div>' )

  $('.footer-copyright').html(        
    '  © 2017 WebVision, All rights reserved.' )
})
