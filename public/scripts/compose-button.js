$(document).ready(function() {
  $('.submitButton').on("click", function() {
    $(".new-tweet").toggle("slow");
    $( ".new-tweet textarea" ).focus();
  });
});