$(function() {
	$(".rules_footer").click(function() {
		$(".rules_cover,.rules_footer").hide();
		$(".rules_con").css("height","95vw");
	});
	$(".covers_quit").click(function() {
		$(".cover").fadeOut(500);
		$(this).parent().fadeOut(500);
	});

	function Init() {
		var H = $(window).height(),
			W = $(window).width();
		$(".cover").css({"width": W, "height": H});

		$(".covers_btn").click(function() {
			$(".cover").hide();
			$(this).parent().hide();
			// Rotate();
		});

		$(".covers_btn2").click(function() {
			$(".cover").hide();
			$(this).parent().parent().hide();
			// $(".rules_cover,.rules_footer").hide();
			// $(".rules_con").css("height","95vw");
		});
	}
	Init();
	// 抽奖
    var rotateTimeOut = function (){
        $('#rotate').rotate({
            angle:0,
            animateTo:2160,
            duration:8000,
            callback:function (){
                alert('网络超时，请检查您的网络设置！');
            }
        });
    };
    var bRotate = false;
    var rotateFn = function (awards, angles, txt){
        bRotate = !bRotate;
        $('#rotate').stopRotate();
        $('#rotate').rotate({
            angle:0,
            animateTo:angles+2825,
            duration:8000,
            callback:function (){
            	initCover(4,txt);
                bRotate = !bRotate;
            }
        })
    };
    // var rotateFn = function (awards, angles, txt){
    //     bRotate = !bRotate;
    //     $('#rotate').stopRotate();
    //     $('#rotate').rotate({
    //         angle:0,
    //         animateTo:angles+2825,
    //         duration:8000,
    //         callback:function (){
    //         	initCover(4,txt);
    //             bRotate = !bRotate;
    //         }
    //     })
    // };

    function Rotate(time,index) {
    	// 防止多次点击
    	if(bRotate)return;
			if(time <=0) {
				$(".cover,.covers3").show();
			}else {
				// var item = 3;

				switch (index) {
		            case 0:
		                rotateFn(0, 360, '20金币');
		                break;
		            case 1:
		                rotateFn(1, 36, '10金币');
		                break;
		            case 2:
		                rotateFn(2, 72, '900金币');
		                break;
		            case 3:
		                rotateFn(3, 108, '500金币');
		                break;
		            case 4:
		                rotateFn(4, 144, '300金币');
		                break;
		            case 5:
		                rotateFn(5, 180, '250金币');
		                break;
		            case 6:
		                rotateFn(6, 216, '200金币');
		                break;
		            case 7:
		                rotateFn(7, 252, '150金币');
		                break;
		            case 8:
		                rotateFn(8, 288, '100金币');
		                break;
		            case 9:
		                rotateFn(9, 324, '50金币');
		                break;   
		        }
			}
			time--;
    };
    var initCover = function(index,text) {
    	$(".cover,.covers"+index).show();
        $(".covers"+index+" .covers_font span").text(text);
    }
    function getQueryString(name) {
	    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
	    var r = window.location.search.substr(1).match(reg);
	    if (r != null) {
	        return unescape(r[2]);
	    }
	    return null;
	}
    function apiFn() {
    	var uid = getQueryString('uid');
    		// uid = "164ef6a8de31112";
		var token = getQueryString('token'),
			hostname = "http://182.92.82.188:8084";
			// token = "2b93e6f5-655b-4faa-9442-c9736b8d78f4";

			// {"phoneNum": uid}
		$.get(hostname+"/yfax-htt-api/api/htt/queryLotteryUserInfo",{phoneNum: uid},function(res){
			var Gold = res.data.leftGold,
				status1 = res.data.readTask.isR2m,
				status2 = res.data.readTask.isR4m,
				status3 = res.data.videoTask.isV3m,
				status4 = res.data.videoTask.isV6m,
				mount = res.data.leftAmount;
				// mount = 2;
			$(".turn_font_left font").text(Gold);
			$(".turn_font_right font").text(mount);

			// 阅读任务
			if(status1 == 0) {
				$(".task_read .status1_icon").attr("src","images/task_draw_reward_red_img.gif");
				$(".task_read .task_icon1 .task_icon_already").show();
				$(".task_read .status2_icon").attr("src","images/task_draw_reward_gray_img.png");
			}else {
				$(".task_read .status1_icon").attr("src","images/task_draw_reward_green_img.png");
				if(status2 == 0) {
					$(".task_read .status2_icon").attr("src","images/task_draw_reward_red_img.gif");
					$(".task_read .task_icon2 .task_icon_already").show();
				}else {
					$(".task_read .status2_icon").attr("src","images/task_draw_reward_green_img.png");
				}
			}

			// 视频任务
			if(status3 == 0) {
				$(".task_video .status1_icon").attr("src","images/task_draw_reward_red_img.gif");
				$(".task_video .task_icon1 .task_icon_already").show();
				$(".task_video .status2_icon").attr("src","images/task_draw_reward_gray_img.png");
			}else {
				$(".task_video .status1_icon").attr("src","images/task_draw_reward_green_img.png");
				if(status4 == 0) {
					$(".task_video .status2_icon").attr("src","images/task_draw_reward_red_img.gif");
					$(".task_video .task_icon2 .task_icon_already").show();
				}else {
					$(".task_video .status2_icon").attr("src","images/task_draw_reward_green_img.png");
				}
			}
			
			// 当抽奖次数小于1,打开页面不自动弹窗
			if(mount < 1) {
				$(".cover,.covers1").hide();
				mount = 0;
			}else {
				console.log('54534');
				$(".covers1 .covers_font font").text(mount);
				// rotateFn();
			}


			// 点击抽奖
			// $(".covers_home").click(function() {
			// 	console.log(mount);
			// 	$.get(hostname+"/yfax-htt-api/api/htt/doLotteryAward",{phoneNum: uid,type: 0, gold: 0},function(res){
			// 		console.log(res);
			// 		if(res.data != null) {
			// 			console.log(res.data);
			// 			console.log(mount);
			// 			Rotate(mount,res.data.index);
			// 			mount--;
			// 			$(".turn_font_right font").text(mount);
			// 			// setTimeout(function(){
			// 			// 	$.get(hostname+"/yfax-htt-api/api/htt/queryLotteryUserInfo",{phoneNum: uid},function(res){
			// 			// 		console.log(res.data);
			// 			// 		Gold = res.data.leftGold;
			// 			// 		$(".turn_font_left font").text(Gold);
			// 			// 		$(".turn_font_right font").text(mount);
			// 			// 	});
			// 			// },500);
			// 		}else {
			// 			$(".cover,.covers3").show();
			// 		}
					
			// 	},function(err) {
			// 		console.log(err);
			// 	});
			// });

			$(".covers_home,.covers_btn1,.pointer").click(function() {
				console.log("888888");
				$.get(hostname+"/yfax-htt-api/api/htt/doLotteryAward",{phoneNum: uid,type: 0, gold: 0},function(res){
					console.log(res);
					if(res.data != null) {
						Rotate(mount,res.data.index);
						mount--;
						if(mount < 0) {
							mount = 0;
						}
						$(".turn_font_right font").text(mount);
						// setTimeout(function(){
						// 	$.get(hostname+"/yfax-htt-api/api/htt/queryLotteryUserInfo",{phoneNum: uid},function(res){
						// 		console.log(res.data);
						// 		Gold = 800;
						// 		$(".turn_font_left font").text(Gold);
						// 		$(".turn_font_right font").text(mount);
						// 	});
						// },500);
					}else {
						$(".cover,.covers3").show();
					}
					
				});
			});

			$(".covers_btn3").click(function() {
				$.get(hostname+"/yfax-htt-api/api/htt/doLotteryAward",{phoneNum: uid,type: 1, gold: 200},function(res){
					if(res.data != null) {
						Rotate(100,res.data.index);
						mount--;
						if(mount < 0) {
							mount = 0;
						}
						$(".turn_font_right font").text(mount);
						setTimeout(function(){
							$.get(hostname+"/yfax-htt-api/api/htt/queryLotteryUserInfo",{phoneNum: uid},function(res){
								console.log(res.data);
								Gold = res.data.leftGold;
								$(".turn_font_left font").text(Gold);
								$(".turn_font_right font").text(mount);
							});
						},8000);
					}else {
						$(".cover,.covers3").show();
					}
					
				});
			});
		});
    }
    apiFn();
})