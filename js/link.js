function getQueryString(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return null;
}
function InitFn() {
	var hostname = "http://182.92.82.188:8084";
	var uid = getQueryString('uid');
	$.get(hostname+"/yfax-htt-api/api/htt/queryLotteryAwardHis",{phoneNum: uid},function(res){
		console.log(res.data);
		for(var i = 0, Len = res.data.length; i < Len; i++) {
			$(".list ul .list_special").before('<li><div class="list_font_left"><div class="list_font1">'+res.data[i].awardName+'</div><div class="list_font2">'+res.data[i].createDate+'</div></div><div class="list_font_right">'+res.data[i].gold+'金币</div></li>')
		}
	});
}
InitFn();