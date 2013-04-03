$(function() {

	$aw2.bind('click', 'button', function() {
		var code = $(this).attr('data-code')
			, result = eval(code);

		alert(result);

	});

});
