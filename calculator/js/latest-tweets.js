function TwitterDateConverter(time){
	var date = new Date(time),
		diff = (((new Date()).getTime() - date.getTime()) / 1000),
		day_diff = Math.floor(diff / 86400);
 
	if ( isNaN(day_diff) || day_diff < 0 || day_diff >= 31 )
		return;
 
	return day_diff == 0 && (
			diff < 60 && "just now" ||
			diff < 120 && "1 minute ago" ||
			diff < 3600 && Math.floor( diff / 60 ) + " minutes ago" ||
			diff < 7200 && "1 hour ago" ||
			diff < 86400 && Math.floor( diff / 3600 ) + " hours ago") ||
		day_diff == 1 && "Yesterday" ||
		day_diff < 7 && day_diff + " days ago" ||
		day_diff < 31 && Math.ceil( day_diff / 7 ) + " weeks ago";
}
function latestTweets(containerElement, username){
	var container = $(containerElement);
	container.html('<div class="loading center"><p><img src="/wp-content/themes/bradmorris/img/ajax-loader.gif" alt="loading" /></p></div><ul class="hidden"></ul>');
	var tweetUrl = 'http://twitter.com/status/user_timeline/'+username+'.json?count=5&callback=?';
	$.getJSON(tweetUrl, function(data){
		$.each(data, function(i, item){
			var txt = item.text
			.replace(/(https?:\/\/[-a-z0-9._~:\/?#@!$&\'()*+,;=%]+)/ig,'<a target="_blank" rel="nofollow" href="$1">$1<\/a>')
			.replace(/@+([_A-Za-z0-9-]+)/ig, '<a target="_blank" rel="nofollow" href="http://twitter.com/$1">@$1<\/a>')
			.replace(/#+([_A-Za-z0-9-]+)/ig, '<a target="_blank" rel="nofollow" href="http://search.twitter.com/search?q=$1">#$1<\/a>');
			tweetdate = item.created_at;
			if(i==0){ 
				$('<li class="first"></li>').html("<p>"+txt+"</p><span>"+TwitterDateConverter(tweetdate)+"</span>").appendTo($(containerElement+" ul")); 

				
			} else { 
				$('<li></li>').html("<p>"+txt+"</p><span>"+TwitterDateConverter(tweetdate)+"</span>").appendTo($(containerElement+" ul")); 
			}
		});
		$(containerElement+" div.loading").remove();
		$(containerElement+" ul").fadeIn("fast");
	});
}

$(document).ready(function() {
	latestTweets("#tweets", "bradmorris82");
})
