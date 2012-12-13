$(function()
{
	if (typeof(window.localStorage) == 'undefined')
		return;
	
	var left = parseInt(localStorage.getItem('left'), 10) || 0;
	$("html").css("background-position", left + "px 0px");

	var interval = setInterval(function()
	{	
		left = ++left%4210;
		$("html").css("background-position", left + "px 0px");
		localStorage.setItem('left',left+'');
	}, 50);
});
