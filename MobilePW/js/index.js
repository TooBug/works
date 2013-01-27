// $(document).on('deviceready',function(){
$(document).on('ready',function(){
    
    $('#addwork input[name=work_load]').change(function(){
        $('#work_load_show span').text($(this).val());
    });
   
    $('#addwork form').submit(function(){

    	// TODO 提交表单

    	$('#addwork').slideUp();

    	return false;

    });

    $('#my_task_table').on('click','.task .add_work',function(){

    	$('#addwork').slideDown();

    });

});