const tweet_char_limit = 140;

function createTweetElement(tweet) {
  return $(
    `<article class='tweet'>
     <header>
       <img class='avatar' src=${tweet.user.avatars.small}>
       <h1>${tweet.user.name}</h1>
       <span class="handle">${tweet.user.handle}</span>
     </header>
     <div class="tweet-body">${tweet.content.text}</div>
     <footer>
       <span>${tweet.created_at}</span>
       <a href="#" class="button"><i class="fa fa-flag" aria-hidden="true"></i></a>
       <a href="#" class="button"><i class="fa fa-retweet" aria-hidden="true"></i></a>
       <a href="#" class="button"><i class="fa fa-heart" aria-hidden="true"></i></a>
     </footer>
    </article>`);
}

function renderTweets(tweets) {
  tweets.forEach(function(tweet) {
    createTweetElement(tweet).appendTo('#all-tweets');
  });
}

function resetCounter() {
  $(".counter").text(tweet_char_limit);
}

function clearTextarea() {
  $("form").find("textarea").val("");
}

function resetComposer() {
  clearTextarea();
  resetCounter();
}

function onTweetSuccess(data) {
  resetComposer();
  loadTweets();
}

function validate(data) {
  if ($('textarea').val() === "") {
      $(".counter").text("Please enter text!");
      $(".counter").addClass("count-error");
      return false;
  } else if ($('textarea').val().length > tweet_char_limit) {
      $(".counter").text("Please keep tweets under 140 characters!");
      $(".counter").addClass("count-error");
      return false;
  }
}

function loadTweets() {
  $.ajax({
      url: '/tweets/',
      method: 'GET',
      success: function (data) {
        $(".tweet").remove();
        renderTweets(data);
      }
  });
}

$(document).ready(function() {

  loadTweets();

  $("form").on("submit", function(event) {
    event.preventDefault();
    let newTweet = $(this).serialize();
    validate(newTweet);
    $.ajax({
      url: '/tweets/',
      method: 'POST',
      data: newTweet,
      dataType: "json",
      success: onTweetSuccess
    });
  });
});