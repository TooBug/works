~function(){
	var longurl = location.href,
		serviceUrl = 'http://113.im/';

	var xhr = new XMLHttpRequest();

	var div = document.createElement('div');
	div.style.position = 'fixed';
	div.style.zIndex = '999999999';
	div.style.right = '20px';
	div.style.top = '20px';
	div.style.padding = '20px';
	div.style.border = '1px solid #eee';
	div.style.background = 'white';
	var msg = '';

	xhr.onreadystatechange = function(){
		if(xhr.readyState===4){
			if(xhr.status==200){
				var res;
				try{
					res = JSON.parse(xhr.responseText);
				}catch(e){
					res = {
						status:0,
						info:'Parse Error'
					};
				}

				if(res.status === 1){
					msg = res.shortUrl;
				}else{
					msg = res.info;
				}

			}else{
				msg = '网络错误';
			}

			div.innerHTML = msg;
			document.body.appendChild(div);
		}

	}

	xhr.open('POST',serviceUrl,true);
	xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	xhr.send('url='+longurl);

}();