/* util functions */
var DateHelper = {
  // Takes the format of "Jan 15, 2007 15:45:00 GMT" and converts it to a relative time
  // Ruby strftime: %b %d, %Y %H:%M:%S GMT
  time_ago_in_words_with_parsing: function(from) {
    var date = new Date(); 
    date.setTime(Date.parse(from));
    return this.time_ago_in_words(date);
  },
  
  time_ago_in_words: function(from) {
    return this.distance_of_time_in_words(new Date(), from);
  },

  distance_of_time_in_words: function(to, from) {
    var distance_in_seconds = ((to - from) / 1000);
    var distance_in_minutes = Math.max( 0, Math.floor(distance_in_seconds / 60) );
    if (distance_in_minutes == 0) { return '刚刚'; }
    if (distance_in_minutes == 1) { return '一分钟前'; }
    if (distance_in_minutes < 45) { return distance_in_minutes + '分钟前'; }
    if (distance_in_minutes < 90) { return '一小时前'; }
    if (distance_in_minutes < 1440) { return Math.floor(distance_in_minutes / 60) + '小时前'; }
    if (distance_in_minutes < 2880) { return '一天前'; }
    if (distance_in_minutes < 43200) { return Math.floor(distance_in_minutes / 1440) + '天前'; }
    if (distance_in_minutes < 86400) { return '一个月了'; }
    if (distance_in_minutes < 525960) { return ''+Math.floor(distance_in_minutes / 43200) + '个月之前'; }
    if (distance_in_minutes < 1051199) { return '一年多了'; }
    return '' + Math.floor(distance_in_minutes / 525960) + '年了';
  }
};
//
// Processing Utils
//
if (!Array.prototype.indexOf) { // for IE7-
    Array.prototype.indexOf = function (searchElement /*, fromIndex */ ) {
        "use strict";
        if (this == null) {
            throw new TypeError();
        }
        var t = Object(this);
        var len = t.length >>> 0;
        if (len === 0) {
            return -1;
        }
        var n = 0;
        if (arguments.length > 0) {
            n = Number(arguments[1]);
            if (n != n) { // shortcut for verifying if it's NaN
                n = 0;
            } else if (n != 0 && n != Infinity && n != -Infinity) {
                n = (n > 0 || -1) * Math.floor(Math.abs(n));
            }
        }
        if (n >= len) {
            return -1;
        }
        var k = n >= 0 ? n : Math.max(len - Math.abs(n), 0);
        for (; k < len; k++) {
            if (k in t && t[k] === searchElement) {
                return k;
            }
        }
        return -1;
    }
}

String.prototype.trim = function() 
{ 
    return this.replace(/(^\s*)|(\s*$)/g, ""); 
} 

var IsValidEmail = function(val) {
    var pattern= /^(\w+[\-\.])*\w+@(\w+\.)+[A-Za-z]+$/;
    if(pattern.test(val))
        return true;
    return false;
};

var IsValidURL = function(val) {
    var urlregex = new RegExp(
            "^(http|https|ftp)\://([a-zA-Z0-9\.\-]+(\:[a-zA-Z0-9\.&amp;%\$\-]+)*@)*((25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9])\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])|([a-zA-Z0-9\-]+\.)*[a-zA-Z0-9\-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(\:[0-9]+)*(/($|[a-zA-Z0-9\.\,\?\'\\\+&amp;%\$#\=~_\-]+))*$");
    return urlregex.test(val);
};

var IsValidIP = function(val) {
    var pattern = /^\d+\.\d+\.\d+\.\d+$/
    if(pattern.test(val))
        return true;
    return false;
};

var IsValidDate = function(val) {
    var pattern= /^\d{4}-\d{1,2}-\d{1,2}$/;
    if(pattern.test(val))
        return true;
    return false;
};

var IsChinese = function(val) {
    return /^[\u4e00-\u9fa5]{2,6}$/.test(val);
};

var ExtractEmails = function( text ){
    return text.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi);
};

var GetNum = function(val) {
    return val.replace(/\D/g,'');
};

var GenerateDays = function(year, month) {
    var mDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if(year%400==0 || (year%4==0 && year%100!=0))
        mDays[1] += 1;
    return mDays.join(',');
};
    
var GetHostName = function(str) {
	var re = new RegExp('^(?:f|ht)tp(?:s)?\://([^/]+)', 'im');
	return str.match(re)[1].toString();
};

var GetExt = function(fileName) {
    var ridx = fileName.lastIndexOf('.');
    if(ridx!=-1)
        return fileName.substr(ridx);
    return '';
};

var GetRealName =  function(fileName) {
    var ridx = fileName.lastIndexOf('.');
    if(ridx!=-1)
        return fileName.substr(0,ridx);
    return fileName;
};

var CountSubstr = function(sub, str) {
    var cnt = 0;
    var idx = str.indexOf(sub);
    while(idx != -1) {
        cnt += 1;
        idx = str.indexOf(sub, idx+1);
    }
    return cnt;
};

function pll_comment_excerpt(val, len)
{
    if(val.length>len) {
        return val.substr(0,len) + '...';
    } else {
        return val;
    }
}

var pll_play_video = function(elem) {
    var flash_url = $(elem).find("span").text();
    $(elem).hide().after('<div class="pll_video_frame"><embed src="'+flash_url+'" quality="high" width="100%" height="400" align="middle" allowScriptAccess="always" allowFullScreen="true" wmode="opaque" type="application/x-shockwave-flash"></embed><br /><br><a class="pll_video_stop_link" href="#" onclick="javascipt:pll_close_video(this);return false;">关闭视频</a></div>');
};

var pll_close_video = function(elem) {
    $(elem).parent().parent().find("a.pll_video_play_link").show();
    $(elem).parent().parent().find("div.pll_video_frame").remove();
};


function maybe_short(val, limit_length) {
    if(val.length > limit_length) {
        return val.substr(0, limit_length) + ' ...';
    }
    return val;
}
//
// UI Utils
//

var ShowInfoTip = function(msg) {
    var left = ($(document).width()-$('#infoTip').width())/2;
    $('#infoTip').text(msg).css({'left':left, "top":0}).slideDown('fast');
};
var HideInfoTip = function() {
    $('#infoTip').slideUp();
};

var ShowDialog = function(title, content, ok_button_msg) {
    HideDialog();
    if(ok_button_msg==undefined) {
        ResetDialogButton();
        $('#dialogBox').find('.buttons').show();
    } 
    else if(ok_button_msg=='') {
        $('#dialogBox').find('.buttons').hide();
    } else {
        $('#dialogBox').find('button#dialog_ok').text(ok_button_msg);
        $('#dialogBox').find('.buttons').show();
    }
    $('#dialogBox').find('.title').text(title);
    if(content != undefined) {
        $('#dialogBox').find('.content').html(content);
    }
    
    $('#dialog_cancel').click(function() {
        HideDialog();
        $('#dialogBox').width('');
    });
    
    DialogCenter();
    $('#dialogBox').show();
    $('#dialogBox').find('button#dialog_ok').focus();
};
var ResetDialogButton = function() {
    $('#dialogBox').find('button#dialog_ok').text('确定').unbind('click').click(function() {$('#dialog_cancel').click();});
};
var DialogCenter = function() {
    var top_ = $(document).scrollTop()+45; // top was DOMObject in webkit
    var left_ = ($(document).width()-$('#dialogBox').width())/2;
    $('#dialogBox').css({'top':top_,'left':left_});
};
var HideDialog = function() {
    $('#dialogBox').find('.content').html('');$('#dialogBox').hide();ResetDialogButton();
};
var HideDialogButtons = function() {
    $('#dialogBox').find('.buttons').hide();
};
var ShowDialogButtons = function() {
    $('#dialogBox').find('.buttons').show();
    $('#dialog_ok').show();
};
var DialogMessage =  function(content) {
    if($('#dialogBox').css('display')=='block') {
        $('#dialogBox').find('.content').html(content);
    }
};

/* util functions end */

/* home related global functions */

function home_gen_facial_expression_box() {
    var arr_ = [pll_qq_bbcode_img_dict, pll_sina_bbcode_img_dict, pll_qq_bbcode_img_dict, pll_renren_bbcode_img_dict, pll_qq_bbcode_img_dict, pll_qq_bbcode_img_dict, pll_kaixin_bbcode_img_dict, pll_qq_bbcode_img_dict, pll_qq_bbcode_img_dict, pll_qq_bbcode_img_dict, pll_qq_bbcode_img_dict, pll_qq_bbcode_img_dict, pll_qq_bbcode_img_dict, pll_qq_bbcode_img_dict];
    var lucky_d = arr_[parseInt($('#home_primary_sns_type').val())];
    var str_ = '<div class="pll_facial_expression_box">';
    for(var p in lucky_d) {
        str_ += '<img title="'+p+'" src="http://s2.pinglun.la/md/img/facial_expression/'+lucky_d[p]+'" />'
    }
    str_ += '</div>';
    return str_;
}

function init_facial_expression_box() {
    $('.su_b_aux_buttons a.facial_expression').unbind('click').click(function() {
        var dst_input = $(this).parent().prev().find('input');
        if($('#pll_fe_box').html() == 'pll_fe_box') { // Yep, lazy loading facial expression imgs
            // comment button fe
            $('#pll_fe_box').html(home_gen_facial_expression_box()).find('img')
            .click(function() {
                dst_input.focus().val(dst_input.val()+$(this).attr('title'));
                $('#pll_fe_box').hide('fast');
                return false;
            });
        }

	    if($('#pll_fe_box').css("display") == 'block') {
            $('#pll_fe_box').hide();
	    }
	    else {
		    var btn_left = $(this).offset().left;
		    var btn_top = $(this).offset().top + $(this).height();
		    $('#pll_fe_box').css({'left':btn_left, 'top':btn_top}).show();
	    }
        return false;
	});
}

var g_at_somebody_input = null;
function init_at_somebody() {
    function d2item(d) {
        var at_ta = ' @'+d['nickname']+' ';
        if(d["primary_sns_type"] == 3) {
            at_ta = ' @'+d['nickname']+'('+d['primary_sns_id']+') ';
        } else if(d["primary_sns_type"] == 4 || d["primary_sns_type"] == 5 || d["primary_sns_type"] == 6) {
            at_ta = ' @'+d['primary_sns_id']+' ';
        }
        return '<div class="as_item" uid="'+d['_id']+'" at_ta="'+at_ta+'"><img src="'+d['avatar']+'" /><div class="asi_text">'+d['nickname']+'</div></div>';
    }
    
    function get_cur_idx() {
        var rtn_idx = -1;
        $("#pll_as_box_list .as_item").each(function(idx) {
            if($(this).hasClass('asi_hover')) {
                rtn_idx = idx;
            }
        });
        return rtn_idx;
    }
    
    $("#pll_as_box_name").unbind('keyup').keyup(function(e) {
        if($(this).val() != '' && (e.which!=40 && e.which!=38 && e.which!=13 && e.which!=10)) {
            var params = {"kw": $(this).val()};
            $.getJSON('/comment_box/get_at_friends', $.param(params) , function(data) {
                $("#pll_as_box_list").html('');
                for(var i=0;i<data.length;i++) {
                    $("#pll_as_box_list").append(d2item(data[i]));
                }
                
                $("#pll_as_box_list .as_item").mouseover(function() {
                    $(this).addClass('asi_hover');
                })
                .mouseout(function() {
                    $(this).removeClass("asi_hover");
                })
                .click(function() {
                    g_at_somebody_input.focus().val(g_at_somebody_input.val()+$(this).attr('at_ta'));
                    $("#pll_as_box").hide();
                });
            });
        }
        
        // down - 40, up - 38
        var count = $("#pll_as_box_list .as_item").length;
        var cur_idx = get_cur_idx();
        var new_idx = 0;
        if(e.which == 40) {
            new_idx = (cur_idx + 1) % count;
        } else if(e.which == 38) {
            new_idx = ( cur_idx - 1 + count ) % count;
        } else if(e.which == 13 || e.which == 10) {
            $("#pll_as_box_list .asi_hover").click();
            $("#pll_as_box").hide();
        }
        $("#pll_as_box_list .as_item").removeClass('asi_hover');
        $("#pll_as_box_list .as_item:eq("+new_idx+")").addClass('asi_hover');
    });
    
    $('.su_b_aux_buttons a.at_somebody').unbind('click').click(function() {
        g_at_somebody_input = $(this).parent().prev().find('input');
	    if($('#pll_as_box').css("display") == 'block') {
            $('#pll_as_box').hide();
	    }
	    else {
		    var btn_left = $(this).offset().left;
		    var btn_top = $(this).offset().top + $(this).height();
		    $('#pll_as_box').css({'left':btn_left, 'top':btn_top}).show();
            $("#pll_as_box_name").focus();
	    }
        return false;
	});
}

function init_updates_paginator_lmc(dst_id, up_type, uid, hits_length, cur_page, page_size) {
    if(hits_length>page_size)
    {
        $('#updates_paginator').html('<div id="pll_more_updates">更多动态...</div>');
        $("#pll_more_updates").unbind('click').click(function(){
            $(this).html('<img src="http://s2.pinglun.la/md/img/loading.gif">');
            async_update_list(dst_id, up_type, uid, false, cur_page+1,page_size);
        });
    } else if(hits_length == 0) {
        $('#updates_paginator').html('');
    }
}

function blur_su_b_comment_inputs() {
    var make_comment_fill = "回复...";
    $(".su_b_make_comment input").each(function() {
        if('' == $(this).val()) {
            $(this).val(make_comment_fill);
        }
        $(this).removeClass('ipt_focus');
        $(this).parent().next().hide();
    });
}

function home_gen_comment(uid, msg, creator, portrait, create_time) {
    if(create_time == undefined) {
        create_time = "刚刚";        
    } else {
        create_time = DateHelper.time_ago_in_words_with_parsing(create_time);
    }
    var str_ = '<div class="home_reply">'+
        '<a href="/_'+uid+'"><img class="home_reply_portrait" src="'+portrait+'" /></a>'+
        '<div class="home_reply_r">'+
        '<div class="home_reply_msg"><a href="/_'+uid+'">'+creator+'</a>: '+convert_comment(msg)+'</div>'+
        '<div class="home_reply_time">'+create_time+'</div>'+
        '</div>'+
    '</div>';
    return str_;
}

function init_video_play() {
    $("a.pll_video_play_link").each(function() {
        if($(this).css('display') != 'none') {
            $(this).click();
        }
    });
    
}

function init_update_deletes() {
    $('.single_update a.su_delete').unbind('click').click(function() {
        var iid = $(this).attr('iid');
        if(iid=='0') {
           return false;    
        }
        $("div.single_update[interaction='"+iid+"']").fadeOut();
        var cb_params = {
            "_xsrf":$("input[name='_xsrf']").val(),
            "dt": 3,
            "di": iid
        };
        $.post('/delete', cb_params);
    });
};

function init_update_replies() {
    $('div.single_update').each(function() { 
        var extra = $(this).attr('extra');
        var interaction_id = $(this).attr('interaction');
        var owner_id = $(this).attr('owner');
        var owner_nickname = $(this).attr('owner_nickname');
        var page_url =  $(this).attr('page_url');
        var page_title =  $(this).attr('page_title');
        var page_id =  $(this).attr('page_id');
        var site_url = $(this).attr('site_url');
        var site_id =  $(this).attr('site_id');
        var it = parseInt($(this).attr('it'));
        
        if(it == 1) {
            var make_comment_fill = "回复...";
            var comment_ipt = $(this).find('.su_b_make_comment input');
            comment_ipt.unbind('focus').focus(function() {
                blur_su_b_comment_inputs();
                if(make_comment_fill == $(this).val()) {
                    $(this).val('');
                }
                
                if($(this).val() == '') {
                    $(this).parent().next().find('button').attr('disabled', true).addClass("ipt_disabled");
                } else {
                    $(this).parent().next().find('button').attr('disabled', false).removeClass("ipt_disabled");
                }
                
                $(this).addClass('ipt_focus');
                $(this).parent().next().show();
            }).keyup(function(e) {
                var txt_ = $(this).val();
                if(txt_ != '' && txt_ != make_comment_fill) {
                    $(this).parent().next().find('button').attr('disabled', false).removeClass("ipt_disabled");
                    if(e.which == 13 || e.which == 10) {
                        $(this).parent().next().find('button').click();
                    }
                } else {
                    $(this).parent().next().find('button').attr('disabled', true).addClass("ipt_disabled");
                }
            });
            
            var make_comment_button = $(this).find('.su_b_aux_buttons button');
            var make_comment_checkbox = $(this).find('.su_b_aux_buttons input:checkbox');
            var comment_list = $(this).find('.su_b_comment_list');
            make_comment_button.unbind('click').click(function() {
                var msg_val = comment_ipt.val();
                if(msg_val == '' || msg_val == make_comment_fill) {
                    alert("回复内容为空");
                    return;
                }

                $("#pll_as_box").hide();
                var fake_comment = home_gen_comment($("#cb_user_id").val(), msg_val, $("#cb_user_nickname").val(), $("#cb_user_portrait").val());
                comment_list.append( fake_comment );
                comment_ipt.val('').blur();
                blur_su_b_comment_inputs();
                
                // post to server
                var tmp_arr = extra.split('#pll#');
                var reply_to_comment_id = '';
                if(tmp_arr.length == 4) {
                    reply_to_comment_id = tmp_arr[2];
                } else if(tmp_arr.length == 2) {
                    reply_to_comment_id = tmp_arr[0];
                }
                var share_sns = '';
                if(make_comment_checkbox.attr("checked")) {
                    share_sns = $('#home_primary_sns').val();
                }
                
                // try to get videos or images
                var possible_video = '';
                if(extra.indexOf('[video]') != -1) {
                    var re_video = new RegExp('\\[video\\](http://[^\\[]+)\\[/video\\]', 'i');
                    var matches = extra.match(re_video);
                    possible_video = matches[1];
                }
                var possible_image = '';
                if(extra.indexOf('[img]') != -1) {
                    var re_image = new RegExp('\\[img\\](http://[^\\[]+)\\[/img\\]', 'i');
                    var matches = extra.match(re_image);
                    possible_image = matches[1];
                }
                var cb_params = {
                    "_xsrf":$("input[name='_xsrf']").val(),
                    "ui" : $("#cb_user_id").val(),
                    "un" : $("#cb_user_nickname").val(),
                    "up" : $("#cb_user_portrait").val(),
                    "pi" : page_id,
                    "pu" : page_url,
                    "opu" : page_url,
                    "pt" : page_title,
                    "su" : site_url,
                    "si" : site_id,
                    "it" : 1,
                    "cmnt" : msg_val.substr(0, 500),
                    "share" : share_sns,
                    "ir" : 1,
                    "rc" : reply_to_comment_id,
                    "ri" : owner_id,
                    "rn" : owner_nickname,
                    "fi" : 1,
                    "ii" : interaction_id,
                    "possible_video": possible_video,
                    "possible_image": possible_image,
                    "pll": 1
                }
                
                $.post("/comment_box/add_comment", cb_params, function(data) {
                    if(data.errcode != 0) {
                        alert(data.msg);
                        comment_list.find(".home_reply:last").fadeOut();
                    }
                }, "json");
                
            });
        }
    });
    // OK, blur them all
    blur_su_b_comment_inputs();
    init_facial_expression_box();
    init_at_somebody();
}

var spam_filter_d = {};
function async_update_list(dst_id, up_type, uid, first_load, page, page_size) {
    if(page == undefined) {page=1;}
    if(page_size == undefined) {page_size = 50;}
    if(first_load == undefined) {first_load = false;}
    
    if(first_load) {
        $(dst_id).prepend('<p><img src="http://s2.pinglun.la/md/img/loading.gif" /></p>');
    }
    
    var params = {"update_type": up_type, "uid": uid, "page": page, "page_size": page_size};
    $.getJSON("/home/async_update_list?"+$.param(params), function(raw_data) {
        if(first_load) {
            $(dst_id).html('');
            if(raw_data['data'].length == 0) {
                var empty_str = '<p class="ha_error empty">';
                switch(up_type) {
                    case 'maybe_like':
                        empty_str += '猜不出来 %>_<%';
                        break;
                    case 'about_me':
                        empty_str += '置身事外, 都与我无关';
                        break;
                    case 'update_home':
                        empty_str += '混沌初开, 乾坤始奠, 暂无动态';
                        break;
                    case 'update_profile':
                        empty_str += 'ta也是新来的 ;)';
                        break;
                    case 'community_update':
                        empty_str += '还未加入任何社区, 去<a href="/discover">发现</a>吧';
                        break;
                }
                $(dst_id).html(empty_str + '</p>');
            }
            if(typeof more_updates_bonus_click_times != 'undefined') {
                more_updates_bonus_click_times = 5;
            }
        }
        var hits_length = raw_data['hits_length'];
        var data = raw_data['data'];
        for(var i=0;i<data.length;i++) {
            if(data[i]["interaction_type"] == 2 || data[i]["interaction_type"] == 1) {
                 var spam_id = ''+data[i]["interaction_type"]+'_'+data[i]['page_title'];
                 if(typeof spam_filter_d[spam_id] == "undefined") {
                    spam_filter_d[spam_id] = 1;
                 } else {
                    continue;
                 }
            }
            $(dst_id).append( make_single_update(data[i]["_id"], data[i]["owner_id"], data[i]["owner_nickname"], data[i]["owner_portrait"], data[i]["interaction_type"], data[i]["page_url"], data[i]['page_id'], data[i]["page_title"], data[i]["site_url"], data[i]['site_id'], data[i]["site_domain"], data[i]["extra"].replace('\n', ' ').replace('\r', ''), data[i]['replies'], data[i]["create_time"]) );
        }
        
        // do some initialization
        $('#updates_paginator').show();
        init_update_replies();
        init_update_deletes();
        init_video_play();
        init_updates_paginator_lmc(dst_id, up_type, uid, hits_length, page, page_size);
        if(data.length < page_size) {
            if(first_load) {
                $('#updates_paginator').hide();
            } else {
                $('#updates_paginator').html('没有更多动态了');
            }
        }
    });
}

function make_single_update_replies(replies) {
    var str_ = '';
    for(var i=0;i<replies.length;i++) {
        var r = replies[i];
        str_ += home_gen_comment(r['owner_id'], r['msg'], r['owner_nickname'], r['owner_portrait'], r['create_time']);
    }
    return str_;
}

var old_portrait_patt = new RegExp("\\d*_\\d+_\\d+_\\d+_\\d+_\\d+_\\d+.\\w{3,4}");
function make_single_update(interaction_id, user_id, user_name, user_portrait, interaction_type, page_url, page_id, page_title, site_url, site_id, site_domain, extra, replies, create_time) {
    var sns_arr = ["", "新浪微博", "QQ", "人人网", "腾讯微博","豆瓣", "开心网", "Google+", "百度", "淘宝", "网易微博"];
    var oper_arr = ["", "评论了", "阅读过", "分享了", "获得来自", "在", "在", "在", "在", "在", "从", "认为"];
    var sync_str = '';
    var syncable_sns_types = [1,2,3,4,5,6,10];
    if(syncable_sns_types.indexOf(parseInt($("#home_primary_sns_type").val())) > -1) {
        sync_str = '<input type="checkbox" checked="checked" id="pll_chk_'+interaction_id+'"  style="vertical-align: middle" /><label for="pll_chk_'+interaction_id+'">同步到'+sns_arr[parseInt($("#home_primary_sns_type").val())]+'</label>';
    }
    
    var sub_b_str = '';
    if(interaction_type == 1) {
        sub_b_str = '<div class="su_b">'+
                '<div class="su_b_comment_list">'+make_single_update_replies(replies)+'</div>'+
                '<div class="su_b_make_comment"><input /></div>'+
                '<div class="su_b_aux_buttons"><button class="pll_button confirm">回复</button><a href="javascript:;" class="aux_button facial_expression" title="表情">&nbsp;</a><a href="javascript:;" class="aux_button at_somebody" title="点名">&nbsp;</a>'+sync_str+'</div>'+
            '</div>';
    }
    if(user_portrait == 'default_face.png' || (user_portrait.indexOf("http://") == -1 && old_portrait_patt.test(user_portrait))) {
        user_portrait = "http://static.pinglun.la/userfile/0/"+user_portrait;
    }
    
    var delete_str = '';
    if(user_id == $("#cb_user_id").val()) {
        delete_str = '<a class="su_delete" iid="'+interaction_id+'" href="javascript:void(0);">X</a>';
    }
    var rtn_str = '<div class="single_update clear" interaction="'+interaction_id+'" owner="'+user_id+'" owner_nickname="'+user_name+'" page_url="'+page_url+'" page_id="'+page_id+'"  page_title="'+page_title+'" site_url="'+site_url+'" site_id="'+site_id+'" it="'+interaction_type+'" extra="'+extra+'">'+
        '<div class="su_l"><a href="http://www.pinglunla.com/_'+user_id+'" target="_blank"><img src="'+user_portrait+'" onerror="this.src=\'http://s2.pinglun.la/md/img/default_avatar.png\'" /></a></div>'+
        '<div class="su_r">'+
            '<div class="su_r_headline">'+delete_str+'<a href="http://www.pinglunla.com/_'+user_id+'" target="_blank">'+user_name+'</a>&nbsp;&nbsp;'+oper_arr[interaction_type]+"&nbsp;&nbsp;"+
            '<a target="_blank" href="'+page_url+'">'+page_title+'</a>&nbsp;&nbsp;'+make_postfix(extra, interaction_type)+'</div>'+
            '<div class="su_r_quote">'+make_extra(extra, interaction_type, page_url)+'</div>'+
            '<div class="su_r_time" title="'+create_time+'">'+DateHelper.time_ago_in_words_with_parsing(create_time)+' 来自 <a href="'+site_url+'" target="_blank">'+site_domain+'</a></div>'+
            sub_b_str+
        '</div>'+
    '</div>';
    return rtn_str;
}
function make_postfix(extra, interaction_type) {
    var rtn ='';
    if(interaction_type == 1) {
        var tmp_arr = extra.split('#pll#');
        if(tmp_arr.length == 4) {
            rtn = '(回复 <a href="http://www.pinglunla.com/_'+tmp_arr[0]+'" target="_blank">'+tmp_arr[1]+'</a>)';
        }
    } else if(interaction_type == 3) {
        var tmp_arr = extra.split('#pll#');
        var sns_arr = ["新浪微博", "QQ", "人人网", "腾讯微博","豆瓣", "开心网", "Google+", "百度"];
        var sns_link_arr = ["weibo.com", "qzone.qq.com", "renren.com", "t.qq.com", "www.douban.com", "www.kaixin001.com", "hi.baidu.com"];
        for(var i=sns_arr.length-1; i>=0;i--) {
            tmp_arr[0] = tmp_arr[0].replace("["+i+"]", '&nbsp;<a target="_blank" href="http://'+sns_link_arr[i]+'">'+sns_arr[i]+'</a>&nbsp;');
        }
        rtn = '到&nbsp;'+tmp_arr[0];
    } else if(interaction_type == 4) {
        var tmp_arr = extra.split('#pll#');
        rtn = '的&nbsp;<a href="javascript:void(0);">'+tmp_arr[1]+'</a>';
    } else if(interaction_type == 5) {
        var tmp_arr = extra.split('#pll#');
        rtn = '升级到了&nbsp;<a href="javascript:void(0);">'+tmp_arr[1]+'</a>';
    } else if(interaction_type == 6) {
        var tmp_arr = extra.split('#pll#');
        rtn = '的<a href="'+tmp_arr[0]+'" target="_blank">评论</a>被大家认为很赞';
    } else if(interaction_type == 7) {
        var tmp_arr = extra.split('#pll#');
        rtn = '关注了<a href="'+tmp_arr[2]+'" target="_blank">'+tmp_arr[1]+'</a>';
    } else if(interaction_type == 8) {
        var tmp_arr = extra.split('#pll#');
        rtn = '登录了<a href="'+tmp_arr[2]+'" target="_blank">'+tmp_arr[1]+'</a>';
    } else if(interaction_type == 9) {
        var tmp_arr = extra.split('#pll#');
        rtn = '注册了<a href="'+tmp_arr[2]+'" target="_blank">'+tmp_arr[1]+'</a>';
    } else if(interaction_type == 10) {
        var tmp_arr = extra.split('#pll#');
        rtn = '购买了<a href="'+tmp_arr[2]+'" target="_blank">'+tmp_arr[1]+'</a>';
    } else if(interaction_type == 11) {
        rtn = {"rubbish":"很差劲", "good":"还不错", "amazing":"非常棒"}[extra];
    }
    return rtn;
}
function resize_myself(elem) {
    var elem = $(elem);
    elem.css('display', 'block');
    if(elem.width() > elem.parent().parent().width()) {
        elem.css('width', "90%");
    } else if(elem.width() > 450 && $.browser.msie && $.browser.version=="6.0") {
        elem.css('width', "450px");
    }
}

function convert_comment(msg, img_link) {
    var re_2 = new RegExp('\\[img\\](http://[^\\[]+)\\[/img\\]', 'gi');
    var re_3 = new RegExp('\\[video\\](http://[^\\[]+)\\[/video\\]', 'gi');
    var re_4 = new RegExp('\\[link\\](http://[^\\[]+)\\[/link\\]', 'gi');
    if(img_link == undefined) {
        img_link = '$1';
    }
    if(msg.indexOf('[img]') > 0 && msg.indexOf('[/img]') > 0) { // move [img] to string's beginning, if equals 0, unnecssary to move
        var result = re_2.exec(msg);
        if(result) {
            msg = result[0]+msg.replace(result[0], ''); 
        }
    }
    msg = pll_comment_excerpt(msg, 360).replace(/[<]/g, "&lt;").replace(/[>]/g, "&gt;").replace(/\n/g, '<br>').replace(re_2, '<a target="_blank" href="'+img_link+'"><img  class="comment_context_img" onerror="this.width=\'32\';this.style.border=\'none\';this.src=\'http://s2.pinglun.la/md/img/photos32.gif\'" src="$1" onload="javascript:resize_myself(this);" /></a>')
    .replace(re_4, '<a target="_blank" href="$1">$1</a>')
    .replace(re_3, '<a class="pll_video_play_link" target="_blank" href="$1" onclick="javascipt:pll_play_video(this);return false;"><img src="http://s2.pinglun.la/md/img/video32.gif" valign="middle" style="padding:0;border:0;margin:0;margin-right:3px" />点击播放<span style="display:none">$1</span></a><br />');
    
    if(typeof pll_qq_bbcode_img_dict != 'undefined') {
        var pll_bbcode_arr = [pll_qq_bbcode_img_dict,pll_renren_bbcode_img_dict,pll_sina_bbcode_img_dict,pll_kaixin_bbcode_img_dict];
        for(var i=0;i<pll_bbcode_arr.length;i++) {
            $.each(pll_bbcode_arr[i],function(code,url) {
                while(msg.indexOf(code) != -1) {
                    msg = msg.replace(code,'<img valign="middle" src="http://s2.pinglun.la/md/img/facial_expression/'+ url+'" />')
                }
            });
        }
    }
    
    return msg;
}

function make_extra(extra, interaction_type, page_url) {
    if(interaction_type == 1) {
        var tmp_arr = extra.split('#pll#');
        if(tmp_arr.length == 4) {
            extra = tmp_arr[tmp_arr.length-1];
        } else {
            extra = tmp_arr[1];
        }
        extra = convert_comment(extra, page_url);
    } else if(interaction_type == 2) {
        extra = convert_comment( extra, page_url ).replace(/\n/g, '<br>');
    } else if(interaction_type == 3) {
        var tmp_arr = extra.split('#pll#');
        extra = tmp_arr[1].replace(/\n/g, '<br>');
    } else if(interaction_type == 4) {
        var tmp_arr = extra.split('#pll#');
        extra = '<img class="su_badge_img" src="'+tmp_arr[0]+'" /><div class="su_badge_text">'+tmp_arr[2]+'</div>';
    } else if(interaction_type == 5) {
        var tmp_arr = extra.split('#pll#');
        extra = '<img class="su_badge_img" src="'+tmp_arr[0]+'" /><div class="su_badge_text">'+tmp_arr[2]+'</div>';
    } else if(interaction_type == 6) {
        var tmp_arr = extra.split('#pll#');
        extra = tmp_arr[1].replace(/\n/g, '<br>');
    } else if(interaction_type == 7) {
        var tmp_arr = extra.split('#pll#');
        extra = '<a href="'+tmp_arr[2]+'" target="_blank"><img class="su_badge_img" src="'+tmp_arr[0]+'" /></a><div class="su_badge_text">'+tmp_arr[3]+'</div>';
    } else if(interaction_type == 8) {
        var tmp_arr = extra.split('#pll#');
        extra = '<a href="'+tmp_arr[2]+'" target="_blank"><img src="'+tmp_arr[0]+'" /></a><div>'+tmp_arr[3]+'</div>';
    } else if(interaction_type == 9) {
        var tmp_arr = extra.split('#pll#');
        extra = '<a href="'+tmp_arr[2]+'" target="_blank"><img src="'+tmp_arr[0]+'" /></a><div>'+tmp_arr[3]+'</div>';
    } else if(interaction_type == 10) {
        var tmp_arr = extra.split('#pll#');
        extra = '<a href="'+tmp_arr[2]+'" target="_blank"><img src="'+tmp_arr[0]+'" /></a><div>'+tmp_arr[3]+'</div>';
    } else if(interaction_type == 11) {
        var tmp_d = {"rubbish":"sad128.png", "good":"happy128.png", "amazing":"laugh128.png"};
        extra = '<img src="http://s2.pinglun.la/md/img/'+tmp_d[extra]+'" />'
    }
    return extra;
}
/* home related global functions end */

$(function() {
    if(location.href.indexOf("pinglunla.com") != -1 && location.href.indexOf("www.pinglunla.com") == -1) {
        location.replace( location.href.replace("pinglunla.com", "www.pinglunla.com") );
    }
    if(location.href.indexOf("http://pinglun.la") != -1 || location.href.indexOf("http://www.pinglun.la") != -1) {
        location.href = "http://www.pinglunla.com/";
    }
    // global init
    $(document).click(function(event) {
        if(event.target.nodeName.toLowerCase() != 'a') {
            $('div.menu').hide();
        }
    });
    
    $(window).scroll(function() {
        if($(document).scrollTop() > $(window).height() * 1.2) {
            $("#back_to_top").css("visibility", "visible");
        } else {
            $("#back_to_top").css("visibility", "hidden");
        }
    });
    // back_to_top init
    $("#back_to_top").css({"left":$(document).width() - $("#back_to_top").width() - 10, "top": $(window).height() - $("#back_to_top").height(), "visibility":"hidden"});
    //~
    
    // init search bar
    var search_keyword_fill = "寻找人物、社区、评论";
    $("#search_keyword").focus(function() {
        if(search_keyword_fill == $(this).val()) {
            $(this).val('');
        }
        $(this).css('color', 'black');
    }).blur(function() {
        if('' == $(this).val()) {
            $(this).val(search_keyword_fill);
        }
        $(this).css('color', '#cccccc');
    }).blur();
    
    $('#search_button').click(function() {
        var kw = $("#search_keyword").val();
        if(kw != search_keyword_fill && kw != '') {
            document.forms["search_form"].submit();
        }
    });
    //~
    
    // init login form
    $("#login_form").submit(function() {
        var login_email = $.trim( $('#email').val() );
        if($.trim(login_email) == '') {
            alert('邮箱未填写');
            return false;
        }
        if(!IsValidEmail(login_email)) {
            alert('邮箱格式错误');
            return false;
        }
        var login_passwd = $('#passwd').val();
        if($.trim(login_passwd) == '') {
            alert('密码未填写');
            return false;
        }
        return true;
    });
    // init ~
    
    // init account menu
    var am = $("#account_menu");
    $("a#account_link").click(function() {
        if(am.css('display') == 'none') {
            am.css({left:$("#nav_right").offset().left + ($("#nav_right").width() - am.width()), top:$(this).offset().top+$(this).height()}).slideDown('fast');
        } else {
            am.slideUp('fast');
        }
    });
    //~
});