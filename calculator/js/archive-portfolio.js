$(document).ready(function() {
	$(".item-meta").mouseover(function() {
		$(this).animate({height: '190px'})
		$(this).parent().children(".item-meta-bg").animate({height: '190px'})
		$(this).children("p").fadeIn("fast");
	})

})
