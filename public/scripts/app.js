function createTweetElement(tweet) {
  return $(
    `<article class='tweet'>
    <header>
      <img class='avatar' src=${tweet.user.avatars.small}>
      <h1>${tweet.user.name}</h1>
      <span class="handle">${tweet.user.handle}</span>
    </header>
    <div>
     ${tweet.content.text}
    </div>
    <footer>
      <span> ${tweet.created_at} </span>
      <a href="#" class="button"> a </a>
      <a href="#" class="button"> b </a>
      <a href="#" class="button"> c </a>
    </footer>
   </article>`);

}

function renderTweets(tweets) {
  tweets.forEach(function(tweet) {
    createTweetElement(tweet).appendTo('#all-tweets');
  });
}

$(document).ready(function() {

  loadTweets();

  $("form").on("submit", function(event) {
    event.preventDefault();
    var newTweet = ($(this).serialize() );
    if ($('textarea').val() == "" || null) {
       alert("Please enter text!");
       return false;
     } else if ($('textarea').val().length > 140) {
       alert("Please keep tweets under 140 characters!");
       return false;
     }
    var $inputText = $("form").find("input[type=text], textarea")
    $inputText.val("");
    $.ajax({
        url: '/tweets/',
        method: 'POST',
        data: newTweet,
        dataType: "json",
        success: onTweetSuccess
      });
      // error.function() {
      //   alert('error')
      // }
    });
  });

  var onTweetSuccess = function(data) {
    $(data).remove();
    loadTweets();
  }

  var loadTweets = function() {
    $.ajax({
        url: '/tweets/',
        method: 'GET',
        success: function (data) {
          console.log(data);
          $(".tweet").remove();
          renderTweets(data);

        }
      });
}

