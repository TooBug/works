$(function(){

	$('#words').addClass('show');
	
	$('#words .action').on('click',function(){

		$('#words').addClass('hide');
		$('#login').addClass('show');

	});

})