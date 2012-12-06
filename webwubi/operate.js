var codetokey=new Array("a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z");
var codetopunc1=new Array(";","=",",","-",".","/","`");
var codetopunc2=new Array("[","\\","]","'");
var waitwords=new Array();
var currcode="";
var currpart=0;

function codeinput(key) {
	while(waitwords.pop());
	$("#wordarea").html("");
	if (currcode.length % 4 == 0) 
	{
		if (key == "h" || key == "i" || key == "j" || key == "k" || key == "l" || key == "m" || key == "n") 
		{
				currpart=1;
		}
		else if (key == "o" || key == "p" || key == "q" || key == "r" || key == "s" || key == "t") 
		{
				currpart=2;
		}
		else if (key == "u" || key == "v" || key == "w" || key == "x" || key == "y") 
		{
				currpart=3;
		}
		else
		{
			currpart=0;	
		}
		currcode = key;	
	}
	else {
		currcode += key;
	}
	dealword(currcode);
}

function getword(index) {
	if(waitwords[index])
	{
		$(document.activeElement).val($(document.activeElement).val() + waitwords[index]); 
	}
	while(waitwords.pop());
	$("#codearea").html("");
	$("#wordarea").html("");
	currcode="";
}

function dealword(currcode) 
{
	$("#wordarea").html("");
	var wordnum=0;
	for (i = 0; i < ck[currpart].length; i++) {
		if(ck[currpart][i].substr(0,currcode.length) == currcode && ck[currpart][i].length<=currcode.length+1)
		{
			wordnum++;
			$("#wordarea").html($("#wordarea").html() + wordnum + "." +  ck[4+currpart][i] + "  ");
			waitwords.push(ck[4+currpart][i]);
		}
	}
	$("#codearea").html(currcode);
	if (currcode.length == 4 && wordnum<=1)
	{
		getword(0);
	}
}

function codeback() {
	if (currcode != "")	//Code框回退
	{
		currcode = currcode.substr(0,currcode.length-1);
		if (currcode == "")
		{
			while(waitwords.pop());
			$("#codearea").html("");
			$("#wordarea").html("");
		}
		else 
		{
			dealword(currcode);	
		}
	}
	else	//输入框回退
	{
		$(document.activeElement).val($(document.activeElement).val().substr($(document.activeElement).val(),$(document.activeElement).val().length-1));
	}
}

function puncinput(punc,shiftkey) 
{
	if (currcode == "") 
	{
		var outputpunc="";
		switch (punc) {
			case ";" :
				outputpunc = shiftkey ? "：" : "；";
				break;
			case "=" :
				outputpunc = shiftkey ? "+" : "=";
				break;
			case "," :
				outputpunc = shiftkey ? "《" : "，";
				break;
			case "-" :
				outputpunc = shiftkey ? "——" : "-";
				break;
			case "." :
				outputpunc = shiftkey ? "》" : "。";
				break;
			case "/" :
				outputpunc = shiftkey ? "？" : "/";
				break;
			case "`" :
				outputpunc = shiftkey ? "~" : "·";
				break;
			case "[" :
				outputpunc = shiftkey ? "｛" : "【";
				break;
			case "\\" :
				outputpunc = shiftkey ? "~" : "、";
				break;
			case "]" :
				outputpunc = shiftkey ? "｝" : "】";
				break;
			case "'" :
				outputpunc = shiftkey ? "\"" : "'";
				break;
		}
		$(document.activeElement).val($(document.activeElement).val() + outputpunc);
	}
}

function dealnum(num,shiftkey)
{
	if (currcode != "") //选字 
	{
		 getword(num-1); 
	}
	else	//数字或者标点 
	{
		var outputnum="";
		switch (num) {
			case 0 :
				outputnum = shiftkey ? "）" : "0";
				break;
			case 1 :
				outputnum = shiftkey ? "！" : "1";
				break;
			case 2 :
				outputnum = shiftkey ? "@" : "2";
				break;
			case 3 :
				outputnum = shiftkey ? "#" : "3";
				break;
			case 4 :
				outputnum = shiftkey ? "￥" : "4";
				break;
			case 5 :
				outputnum = shiftkey ? "%" : "5";
				break;
			case 6 :
				outputnum = shiftkey ? "……" : "6";
				break;
			case 7 :
				outputnum = shiftkey ? "&" : "7";
				break;
			case 8 :
				outputnum = shiftkey ? "*" : "8";
				break;
			case 9 :
				outputnum = shiftkey ? "（" : "9";
				break;
		}
		$(document.activeElement).val($(document.activeElement).val() + outputnum);
	}
}


$(document).ready(function(){
	$("<div id='shuhanime'><div id='codearea'></div><div id='wordarea'></div></div>").css({"position":"absolute","bottom":0,"left":0}).appendTo($("body"));
		$("#inputarea").keydown(function(e){
			//键入字母
			if (e.keyCode >=65 && e.keyCode <=89) {
				codeinput(codetokey[e.keyCode-65]);
			}
			else if (e.keyCode == 32){
				getword(0);
			}
			//退格
			else if (e.keyCode == 8)
			{
				codeback();
			}
			//标点1
			else if (e.keyCode>=186 && e.keyCode<=192)
			{
				puncinput(codetopunc1[e.keyCode-186],e.shiftKey);
			}
			//标点2
			else if (e.keyCode>=219 && e.keyCode<=222)
			{
				puncinput(codetopunc2[e.keyCode-219],e.shiftKey);
			}
			//数字
			else if (e.keyCode>=48 && e.keyCode<=57)
			{
				dealnum(e.keyCode-48,e.shiftKey);
			}
			return false;
		});
	});