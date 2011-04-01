$(document).ready(function(){
	var inputElement = $("#textbox");
	inputElement.focus();
	
	var all = $("*");
	all.click(function(){inputElement.focus();return false;});
	
	prepareAction();
});
