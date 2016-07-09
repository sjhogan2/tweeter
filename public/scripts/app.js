function createTweetElement(tweet) {
  return $(
    `<article class='tweet'>
     <header>
       <img class='avatar' src=${tweet.user.avatars.small}>
       <h1>${tweet.user.name}</h1>
       <span class="handle">${tweet.user.handle}</span>
     </header>
     <div class="tweet-body">${tweet.content.text} </div>
     <footer>
       <span> ${tweet.created_at} </span>
       <a href="#" class="button"> <i class="fa fa-flag" aria-hidden="true"></i> </a>
       <a href="#" class="button"> <i class="fa fa-retweet" aria-hidden="true"></i> </a>
       <a href="#" class="button"> <i class="fa fa-heart" aria-hidden="true"></i> </a>
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

   $('textarea').on("click",() => {
      if ($(".counter").text() === ("Please enter text!")) {
        $(".counter").text(140);
        $(".counter").removeClass("count-error");
      } else if ($(".counter").text() === ("Please enter text!")) {
        $(".counter").text(140);
        $(".counter").removeClass("count-error");
      }
    });

  $("form").on("submit", function(event) {
    event.preventDefault();
    let newTweet = ($(this).serialize());
    if ($('textarea').val() == "" || null) {
      $(".counter").text("Please enter text!");
      $(".counter").addClass("count-error");
      return false;
     } else if ($('textarea').val().length > 140) {
      $(".counter").text("Please keep tweets under 140 characters!");
      $(".counter").addClass("count-error");
      return false;
     }
    let $inputText = $("form").find("input[type=text], textarea")
    $inputText.val("");
    $.ajax({
        url: '/tweets/',
        method: 'POST',
        data: newTweet,
        dataType: "json",
        success: onTweetSuccess
      });
    });
  });

const onTweetSuccess = function(data) {
  $(data).remove();
  $(".counter").text(140);
  loadTweets();
}

const loadTweets = function() {
  $.ajax({
      url: '/tweets/',
      method: 'GET',
      success: function (data) {
        $(".tweet").remove();
        renderTweets(data);
      }
  });
}

