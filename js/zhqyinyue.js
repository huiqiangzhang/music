$(function(){
	var musics=[
	{src:'music/绅士.mp3',name:'绅士',artistan:'薛之谦',duration:'04:51'},
	{src:'music/离开的时候.mp3',name:'离开的时候',artistan:'A-Lin',duration:'03:36'},
    {src:'music/演员.mp3',name:'演员',artistan:'薛之谦',duration:'04:23'},
    {src:'music/终于等到你.mp3',name:'终于等到你',artistan:'张靓颖',duration:'04:58'},
    {src:'music/时间煮雨.mp3',name:'时间煮雨',artistan:'吴亦凡',duration:'04:16'},
    {src:'music/那个男人.mp3',name:'那个男人',artistan:'陈松伶',duration:'05:33'},
    {src:'music/一次就好.mp3',name:'一次就好',artistan:'杨宗纬',duration:'04:35'},
    {src:'music/燕归巢.mp3',name:'燕归巢',artistan:'张靓颖',duration:'03:37'},
    {src:'music/十年.mp3',name:'十年',artistan:'韩红',duration:'05:13'},
    {src:'music/白天不懂夜的黑.mp3',name:'白天不懂夜的黑',artistan:'刘涛',duration:'04:14'},
    {src:'music/有一点动心.mp3',name:'有一点动心',artistan:'陈奕迅',duration:'02:00'},
    {src:'music/第一夫人.mp3',name:'第一夫人',artistan:'张杰',duration:'03:44'}
	
	];
	$(musics).each(function(index,val){
		$('<li class="playlistin" data-id="'+index+'"><span>'+val.name+'</span><h1>'+val.artistan+'</h1><h2>'+val.duration+'</h2><div class="liover"><div class="lioverlove" ></div><div class="lioverzhuan"></div><div class="lioverdow"></div><div class="lioverdele"></div></div></li>')
		.appendTo('.playlist ul');
	})
	//鼠标点击唱歌
	//创过来建一个audio把html中的audio赋值
	var audio=$('#audio').get(0);
	var $audio=$('#audio');
	var currentIndex;
	$('.playlist li').on('click',function(){
		currentIndex=parseInt($(this).attr('data-id'));
		audio.src=musics[currentIndex].src;
		audio.play();
	})
	//删除歌曲
	$('.playlist .lioverdele').on('click',function(e){
		e.stopPropagation();
		var i=$('.playlist .lioverdele').index(this);
		$(this).closest('li').remove();
		musics.splice(i,1);
		//总数减1
		$('.cilist span').text(musics.length);
	})
	//自动切换下一首
	$(".danqu").on("click",function(){
		  $("danqu").css("display","block");
		$(".shunxu").css("display","none");
	})

	if($("danqu").css("display","block")){

$audio.on('ended',function(){
			$('.btnleft').trigger('click');
$('.btnright').trigger('click');
})
	}
	else{$audio.on('ended',function(){
		// if(){}

		$('.btnright').trigger('click');
	})}
	
	//播放暂停
	$('.btnplay').on('click',function(){
		if(audio.paused){
			audio.play();
		}
		else{
			audio.pause();}
	})
	$audio.on('play',function(){
		$('.btnplay').addClass('shutiao');
		$('.playlist li').removeClass('lvse').eq(currentIndex).addClass('lvse');
		var v=musics[currentIndex];
		$('.youle p').text(v.name);
		$('.youle span').text(v.artistan);
	    $('.youle .gettime').text(v.duration);
	})	
	//play  shutiao切换
	$audio.on('pause',function(){
		$('.btnplay').removeClass('shutiao');
	})
	//shif+p可以播放或暂停
	$(document).on('keyup',function(e){
		if(e.shiftKey&&e.keyCode===80){
		$('.btnplay').trigger('click');
		}
	})
//歌曲上一首
$('.btnleft').on('click',function(){
	currentIndex-=1;
	if(!currentIndex){
		currentIndex=0;
	}
	if(currentIndex<0){
		currentIndex=musics.length-1;
	}
	audio.src=musics[currentIndex].src;
	audio.play();
})
//上一首
$('.btnright').on('click',function(){
	currentIndex+=1;
	if(!currentIndex){
		currentIndex=0;
	}
	if(currentIndex>musics.length){
		currentIndex=0;
	}
	audio.src=musics[currentIndex].src;
	audio.play();
})
$('.viocelength').on('click',function(e){
	audio.volume=e.offsetX/$(this).width();
})
$('.vioce').on('click',function(){
	if(!$(this).attr('aa')){
		$(this).attr('aa',audio.volume);
		audio.volume=0;

	}else{
		audio.volume=$(this).attr('aa');
		$(this).removeAttr('aa');
	}
})

$audio.on('volumechang',function(){
	if(audio.volume===0){
		$('.vioce').addClass('mute');

	}else{
		$('.vioce').removeClass('mute');
	}
	var w=audio.volume*$('.viocelength').width();
	$('.viocel').width(w);
	$('.viocelength .viocedian').css({left:w-$('.viocedian').width()/2});
})
$('.viocelength .viocedian').on('click',function(e){
	e.stopPropagation();
})
//拖拽音量
$('.viocelength .viocedian').on('mousedow',function(e){
	e.stopPropagation();
	$(this).closest('.viocelength').addClass('moving');
	$(document).on('mousemove',function(e){
		var left=e.pageX-$('.viocelength').offset().left;
		var v=left/$('.viocelength').width();
		v=(v>1)?1:v;
		v=(v<0)?0:v;
		audio.volume=v;
	})
})
$(document).on('mouseup',function(e){
	$('.viocelength').removeClass('moving');
	$(document).off('mousemove');
})
//歌曲进度
var $jindu=$('.foot .jindu');
var $jindutiao=$('.foot .jindutiao');
var $jindudian=$('.foot .jindudian');
$audio.on('timeupdate',function(){
	var x=(audio.currentTime/audio.duration)*$jindu.width();
	$jindutiao.width(x);
	$jindudian.css({left:x-$jindudian.width()/2});
})
$jindu.on('click',function(e){
	audio.currentTime=e.offsetX/$jindu.width()*audio.duration;

})
$jindudian.on('click',function(e){
	e.stopPropagation();
})
//
//拖拽效果
$jindudian.on('mousedown',function(e){
	e.stopPropagation();
	$(document).on('mousemove',function(e){
		var left=e.pageX-$jindu.offset().left;
		var v=left/$jindu.width()*audio.duration;
		audio.currentTime=v;

	})

})
$(document).on('mouseup',function(e){
	$(document).off('mousemove');
})
//
//进度条  时间
$tishi=$('.foot .tishi');
$jindu.on('mouseover',function(e){
	time=e.offsetX/$jindu.width()*audio.duration;
	$tishi.find('span').html(change(time));
	$tishi.css({
		display:'block',
		left:e.offsetX-$tishi.width()/2
	})
	$jindu.on('mousemove',function(e){
		time=e.offsetX/$jindu.width()*audio.duration;
		$tishi.find('span').html(change(time));
		$tishi.css({
			display:'block',
			left:e.offsetX-$tishi.width()/2
		})
	})
})
$jindu.on('mouseout',function(){
	$jindu.off('mousemove');
	$tishi.css('display','none');
})
var change=function(time){
	if(isNaN(time)){
		return '--:--';
	}
	time=parseInt(time);
	var min=parseInt(time/60);
	min=(min<0)?('0'+min):min;
	var second=time%60;
	second=(second<10)?('0'+second):second;
	return min+':'+second;
	}
//
//清理
$('.boxtopr').on('click',function(){
	$('.playlist ul').empty();
	audio.src='';
	$('.youle p').text('YouLe音乐');
	$('.youle span').text('听我想听的歌');
	$('.youle .gettime').text('');
	$('.cilist span').text('0');


})
//循环删除
// $('.caozuo .shunxu').on('click',function(){
//  $('.shunxu').css('display','none');


// })
$(".shunxu").mouseenter(function(){
	$(".danqu").show();
})
// $(".danqu").mouseleave(function(){
// 	$(".danqu").hide();
// })

})