$(document).ready(function() {
  post();
});

var post = function(){
  $('.submit-ajax').on('submit',function(event){
    event.preventDefault();

    var method = $(this).attr("method");
    var action = $(this).attr("action");
    var input  = $(this).serialize();

   $.ajax({
      url: action,
      method: method,
      data: input
    }).done(function(response){
      $('.ajax-response').append(response)
      // $('.submit-ajax').trigger('reset')
    })
    .fail(function(response){
      console.log(response)
    })
  });
}