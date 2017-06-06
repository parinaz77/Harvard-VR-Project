$(document).ready(function() {
	$('#navbar').html(
		'<nav>'+
	    '<div class="nav-wrapper">'+
	      '<a href="/" class="brand-logo">Harvard VR</a>'+
	      '<ul id="nav-mobile" class="right hide-on-med-and-down">'+
	        '<li><a href="sass.html">Sass</a></li>'+
	        '<li><a href="badges.html">Components</a></li>'+
	        '<li><a href="collapsible.html">JavaScript</a></li>'+
	      '</ul>'+
	    '</div>'+
	  '</nav>')

	$('.parallax').parallax();
})
