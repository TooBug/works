$(function(){

	$('#words').addClass('show');
	
	$('#words .action').on('click',function(){

		$('#words').addClass('hide');
		$('#login').addClass('show');

	});

	$('#login form').on('submit',function(){

		var $login = $('#login'),
			$this = $(this);

		$login.addClass('loading');
		$this.prop('disabled',true);

		$.getJSON('/api/',$this.serialize()).done(function(data){

			if(data.status){

				if(data.data){

					showtips('');

					

					var $result = $('#result'),
						stuScore = $.parseJSON(data.data.stuScore),
						temphtml = '';

					$login.addClass('showresult');
					$result.addClass('show');

					// 填充信息
					$result.find('.stu_name').text(data.data.stuName).end()
						.find('.subinfo').text('总分'+stuScore.总分+'，年级排名约'+stuScore.年级排名).end();

					for(var scoreName in stuScore){

						if(!stuScore.hasOwnProperty(scoreName) || scoreName === '总分' || scoreName === '年级排名'){
							return;
						}

						temphtml += '<p class="score">'+scoreName+':'+stuScore[scoreName]+'</p>';


					}

					$result.find('.score').remove().end().append(temphtml);

				}else{
					showtips('信息不正确，无法查询。');
				}

			}else{

				showtips('服务器正在开小差，一会回来。');

			}

		}).fail(function(xhr,errText,errObj){

			showtips('服务器正在开小差，一会回来。');

		}).complete(function(){

			$login.removeClass('loading');
			$this.prop('disabled',false);

		});


		return false;

	});

});

function showtips(msg){

	$('#login #errtips').stop(true,true).hide()
		.text(msg).fadeIn();

}