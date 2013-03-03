$(function() {
	function prettyDate(time){
		var date = new Date((time || "").replace(/-/g,"/").replace(/[TZ]/g," ")),
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

	var commentLink = $("a.commentLink").data("api");
	if (!commentLink)
	{
		$("h2.commentCount").text("No comments yet");
		return;
	}
	$.ajax(commentLink, {
    	headers: {Accept: "application/vnd.github.full+json"},
    	success: function(comments){
    		$.each(comments, function(i, comment) {
    			var avatarUrl = comment.user.avatar_url;
    			var profile = comment.user.html_url;
    			var username = comment.user.login;
    			var image = "<figure><img src='"+avatarUrl+"' width='80px' height='80px'></figure>";
    			var pretty = prettyDate(comment.created_at);
    			var userHtml = "<p class='comment-user'><a href='"+profile+"'>"+username+"</a><span>"+pretty+"</p>"
    			$("p.comments").before("<div class='comment'>" + image + "<div class='comment-body'>"+ userHtml + comment.body_html + "</div></div>")
    		})
    		if (!comments.length)
    			$("h2.commentCount").text("No comments yet");
    		else if (comments.length == 1)
    			$("h2.commentCount").text("Just one lonesome comment");
    		else
    			$("h2.commentCount").text("Already " + comments.length + " comments");
   		}
  	});
});
