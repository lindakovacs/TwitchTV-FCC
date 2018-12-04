$(document).ready(function() {
	var filter_btn = $(".btn-group .btn");
	var channel_div = $(".channel");
	var channelList_div = $("#channel-list");
	var channelList = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
	
	channelList.forEach(function(val) {
		var url = "https://wind-bow.glitch.me/twitch-api/streams/"+val;
		$.getJSON(url, function(channel) {
			var data = channel.stream;
			if(data===null) {
				var url2 = "https://wind-bow.glitch.me/twitch-api/channels/"+val;
				$.getJSON(url2, function(data){
					channelList_div.append(getChannelCard(status="Offline", data));
				});
			}
			else{
				channelList_div.append(getChannelCard(status="Online",  data.channel));
			}
		});
	});

	filter_btn.click(function() {
		$(".channel").show();
		var t = $(this).text();
		filter_btn.removeClass("active");
		$(this).addClass('active');
		if(t==="All") {
			return;
		}
		var fil = (t==="Online")?".Offline":".Online";
		$(fil).hide();
	});

	$("#filter").keyup(function() {
		filter_btn.removeClass("active");
		var w = $(this).val().toLowerCase();
		//alert(w);
		$(".channel").filter(function() {
			var rw = $(".details", this).text().toLowerCase();
			$(this).toggle(rw.indexOf(w)>-1);
		});
	});

});


function getChannelCard(status, data) {
	var name, logo, stCol, icon, ongoing, link;
	name = data.display_name;
	logo = data.logo;
	link = data.url;
	if(status==="Offline") {
		stCol = "danger";
		icon = "&times;";
		ongoing = "none";
	}
	else {
		ongoing = data.game;
		stCol = "success";
		icon = "&#10003;";
	}
	var text = '<div class="channel '+status+'">\
				<img class="img-fluid channel-logo" src="'+logo+'" />\
				<div class="details">\
					<h3>'+name+'</h3>\
					<p class="now">\
						'+ongoing+'\
					</p>\
				</div>\
				<div class="alert alert-'+stCol+'"><b>'+icon+'</b> '+status+'</div>\
				<a href="'+link+'" target="_blank" class="btn btn-block btn-info">view channel</a>\
			</div>'
	return text;
}