~function(){
	var qrtext = location.href,
		imgurl = 'https://chart.googleapis.com/chart?cht=qr&chs=500x500&choe=UTF-8&chld=L|4&chl='+qrtext;

	var img = new Image();
	img.src=imgurl;
	img.style.position='fixed';
	img.style.zIndex=9999;
	img.style.right='20px';
	img.style.top='20px';
	img.style.border='1px solid #ccc';
	img.onclick = function(){

		document.body.removeChild(img);

	};
	img.onload = function(){

		document.body.appendChild(img);

	};

}()
