$(function()
{
	var left = 0;
	var x = 0;
	var interval = setInterval(function()
	{	
		left = ++left%4210;
		$("html").css("background-position", left + "px 0px")	
	}, 50);
});
