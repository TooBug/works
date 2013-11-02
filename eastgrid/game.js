var infoTip, bgBox, top;
var btnMenu, menuBox, score_span, grid_size, fly_score;
var click_grid, random_grid;
var allow_sound=true, first_run=true;
var used_timer = null;
var game_status;
var _CLEAR = 2, _CORRECT = 1, _WRONG = 3;
var GS_RUNNING = 1, GS_PAUSED = 2, GS_CLEAR = 3, GS_HELP = 4;

soundManager.url = '/md/soundmanager2.swf';
soundManager.useFlashBlock = false;
soundManager.onload = function() {
  // SM2 has loaded - now you can create and play sounds!
  soundManager.createSound('correct','http://s2.pinglun.la/md/correct.mp3');
  soundManager.createSound('error','http://s2.pinglun.la/md/error.mp3');
  soundManager.createSound('clear','http://s2.pinglun.la/md/clear.mp3');
  soundManager.createSound('loser','http://s2.pinglun.la/md/loser.mp3');
};

$(function() {
    bgBox = $('#bgBox');
    ShowBgBox = function(opacity) {
        bgBox.css({display:'block','width':$(document).width(),'height':$(document).height(),
            'left': 0,'top':0,'opacity':opacity});
    };
    
    $('#btnMenu').click(function() {
        btnMenu = $('#btnMenu');
        menuBox = $('#menu_items')
        if(menuBox.css('display')=='none') {
            menuBox.css({left:btnMenu.offset().left-1,top:btnMenu.offset().top+btnMenu.height()})
            .slideDown('fast');
        } else {
            menuBox.slideUp('fast');
        }
        return false;
    });
    $(document).click(function() {
        if(menuBox) {
            menuBox.slideUp();
        }
    });
    
    $('#sound_switch').click(function() {
        if(allow_sound) {
            allow_sound = false;
            $(this).text('声音 on');
        } else {
            allow_sound = true;
            $(this).text('声音 off');
        }
    });
    
    $('#help_item').click(function() {
        help_switch();
    });
    
    grid_size = 5;
    init_stage(grid_size);
});

function help_switch() {
    if(game_status == GS_RUNNING) {
        game_status = GS_HELP;
        ShowBgBox(0.9);
        $('#help_tip').css({height:$(window).height()/2,top:$(document).scrollTop() + $(window).height()/5}).slideDown('fast')
    } else if(game_status == GS_HELP) {
        game_status = GS_RUNNING;
        $('#help_tip').slideUp('fast')
        bgBox.hide();
    }
}

function init_stage(gsize) {
    grid_size  = gsize;
    game_status = GS_RUNNING;
    $('#used_time_span').text(0);
    cur_time = 0;
    $('#stage_span').text(grid_size+'x'+grid_size);
    var css_choose = 0;
    if(gsize-4>11) {
        css_choose = parseInt(Math.random()*11);
    }
    else {
        css_choose = gsize-4;
    }
    $('#client_area').html(generate_grid_str(grid_size,grid_size,'stg'+css_choose));
    $('#client_area td.cell').mouseover(function() {
        if(!$(this).hasClass('correct'))
            $(this).removeClass('cell').addClass('hover');
    }).mouseout(function() {
        if(!$(this).hasClass('correct'))
            $(this).removeClass('hover').addClass('cell');
    }).click(function(event) {
        if($(this).hasClass('correct'))
            return;
        var tdid, x, y, status;
        tdid = $(this).attr('id').substr(3);
        x = parseInt(tdid);
        y = parseInt(tdid.split('_')[1]);
        status = user_click(x, y);
        switch(status) {
            case _CLEAR:
                stage_clear();
                break;
            case _CORRECT:
                $(this).addClass('correct');
                play_sound('correct');
                update_score(5, event.pageX, event.pageY)
                break;
            case _WRONG:
                $(this).addClass('wrong');
                play_sound('error');
                update_score(-20, event.pageX, event.pageY)
                break;
        }
    });
    
    random_grid = generate_random_grid(grid_size,grid_size);
    click_grid = generate_click_grid(grid_size,grid_size);
    init_grid(random_grid);
    if(used_timer)
        clearInterval(used_timer);
    used_timer = setInterval("used_time_go()", 1000);
}

function stage_clear() {
    if(game_status == GS_RUNNING) {
        game_status = GS_CLEAR;
        ShowBgBox(0.7);
        
        var stage_score = parseInt($('#score_span').text());
        var stage_used_time = parseInt($('#used_time_span').text());
        var final_score = stage_score-stage_used_time;
        $('.final_score').text(' '+stage_score+' - '+stage_used_time+' = '+final_score);
        if(final_score <= 0) {
            play_sound('loser');
            $('#loser_tip').css({top:$(document).scrollTop() + $(window).height()/4}).slideDown();
        }else{
            play_sound('clear');
            $('#which_stage').text(''+grid_size+'x'+grid_size);
            $('#next_stage').text(''+(grid_size+1)+'x'+(grid_size+1));
            $('#stage_score').text(stage_score);
            $('#stage_used_time').text(stage_used_time);
            $('#clear_board').css({top:$(document).scrollTop() + $(window).height()/5}).slideDown();
            
            $('#goto_next').one('click', function() {
                game_status = GS_RUNNING;
                $('#clear_board').slideUp('fast');
                bgBox.hide();
                $('#score_span').text(final_score);
                grid_size++;
                init_stage(grid_size);
            });
        }
        
    }
}


function update_score(score, px, py) {
    fly_score = $('#fly_score');
    fly_score.removeClass('good').removeClass('bad');
    if(score>0)
        fly_score.text('+'+score).addClass('good');
    else
        fly_score.text(score).addClass('bad');
        
    score_span = $('#score_span');
    if(fly_score.css('display')=='none') {
        fly_score.css({left:px+25,top:py-35}).css('display', 'block')
        .animate({left:score_span.offset().left+3,top:score_span.offset().top},function(){
            score_span.text(parseInt(score_span.text())+score);
            fly_score.css('display','none');
        });
    }
}

function generate_grid_str(row, col ,base_color) {
    if(!(row>0 && col > 0)) {
        alert("Fucking wrong parameters!");
        return;
    }
    var rrow = row + 1, rcol = col+1;
    var ret = '<table align="center" cellspacing="2" class="'+row+'_'+col+' '+base_color
    if(grid_size > 10)
        ret+= ' bigtable';
    ret += '">';
    var i, j;
    for(i=0; i<rrow; i++) {
        ret += "<tr>";
        for(j=0; j<rcol; j++) {
            ret += '<td id="td_'+i+'_'+j+'"';
            if(i==0 || j==0) {
                ret += ' class="indicator"';
                if(i==0) {
                    ret += ' valign="bottom"';
                } else {
                    ret += ' align="right" width=""';
                }
            } else {
                ret += ' class="cell"';
            }
            ret += '> </td>';
        }
        ret += "</tr>";
    }
    
    return ret + '</table>';
}

function generate_random_grid(row, col) {
    var i, j, val;
    ret_arr = new Array();
    for(i=0; i<row; i++) {
        tmp_arr = new Array();
        for(j=0; j<col; j++) {
            val = Math.random()>0.5?1:0;
            tmp_arr.push(val);
        }
        ret_arr[i] = tmp_arr;
    }
    return ret_arr;
}

function generate_click_grid(row, col) {
    var i, j, val;
    ret_arr = new Array();
    for(i=0; i<row; i++) {
        tmp_arr = new Array();
        for(j=0; j<col; j++) {
            tmp_arr.push(0);
        }
        ret_arr[i] = tmp_arr;
    }
    return ret_arr;
}

function init_grid(random_arr) {
    var row = random_arr.length, col=random_arr[0].length;
    var i, j, cnt, str;
    // col indicator numbers
    for(i=0; i<col; i++) {
        cnt = 0;
        str = '';
        for(j=0; j<row; j++) {
            if(random_arr[j][i]) {
                cnt ++;
            } else {
                if(cnt > 0) {
                    if(str!='')
                        str+='<br>';
                    str += cnt;
                    cnt = 0;
                }
            }
        }
        if(cnt > 0) {
            if(str !='')
                str += '<br>';
            str += cnt;
        }
        $('#td_0_'+(i+1)).html(str);
    }
    
    // row indicator numbers
    for(i=0; i<row; i++) {
        cnt = 0;
        str = '';
        for(j=0; j<col; j++) {
            if(random_arr[i][j]) {
                cnt ++;
            } else {
                if(cnt > 0) {
                    if(str !='')
                        str += '&nbsp;&nbsp;';
                    str += cnt;
                    cnt = 0;
                }
            }
        }
        if(cnt > 0) {
            if(str !='')
                str += '&nbsp;&nbsp;';
            str += cnt;
        }
        $('#td_'+(i+1)+'_0').html(str);
    }
}

function grid_equal(rows, cols) {
    for(i=0; i<rows; i++) {
        for(j=0; j<cols; j++) {
            if(click_grid[i][j] != random_grid[i][j])
                return false;
        }
    }
    return true;
}

function user_click(x, y) {
    var row=x-1, col=y-1;
    if(random_grid[row][col] == 1) {
        click_grid[row][col] = 1;
        check_indicators(row, col);
        if(grid_equal(grid_size, grid_size)) {
            return _CLEAR;//congratulations, stage clear
        }
        return _CORRECT;// correct click
    } else {
        return _WRONG;// wrong click
    }
}

function play_sound(file_name) {
    if(allow_sound)
        soundManager.play(file_name);
}

function check_indicators(row, col) {
    // specified col indicator
    var i, through=true;
    for(i=0; i<grid_size; i++) {
        if(click_grid[i][col] != random_grid[i][col])
            through = false;
    }
    if(through)
        $('#td_0_'+(col+1)).css('color', 'white');
    
    through = true;
    for(i=0; i<grid_size; i++) {
        if(click_grid[row][i] != random_grid[row][i])
            through = false;
    }
    if(through)
        $('#td_'+(row+1)+'_0').css('color', 'white');
}

function used_time_go() {
    if(game_status == GS_RUNNING) {
        var cur_time = parseInt($('#used_time_span').text());
        $('#used_time_span').text(cur_time+1);
    }
}
