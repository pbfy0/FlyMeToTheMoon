window.SimileAjax.History.enabled = false;
window.addEventListener('load', onLoad, false);
window.addEventListener('resize', onResize, false);
var song, tl;
function $(id){
	return document.getElementById(id);
}
function onLoad() {
	ytLoad();
  var eventSource = new Timeline.DefaultEventSource();
  var bandInfos = [
    Timeline.createBandInfo({
	eventSource:	eventSource,
	date:		"Jan 31 1958 00:00:00 GMT",
        width:		"70%", 
        intervalUnit:	Timeline.DateTime.MONTH, 
        intervalPixels:	100
    }),
    Timeline.createBandInfo({
	overview:	true,
	eventSource:	eventSource,
	date:		"Jan 31 1958 00:00:00 GMT",
        width:		"30%", 
        intervalUnit:	Timeline.DateTime.YEAR, 
        intervalPixels:	100
    })
  ];
  bandInfos[1].syncWith = 0;
  bandInfos[1].highlight = true;
  var tle = $("timeline");
  tl = Timeline.create(tle, bandInfos);
  Timeline.loadXML("timeline.xml", function(xml, url) { eventSource.loadXML(xml, url); });
  tle.addEventListener('mousedown', function(event){event.preventDefault(); return false;}, false);
//  tle.addEventListener('mousemove', function(event){event.preventDefault(); return false;}, false);
}
var resizeTimerID = null;
function onResize() {
    if (resizeTimerID == null) {
        resizeTimerID = window.setTimeout(function() {
            resizeTimerID = null;
            tl.layout();
        }, 500);
    }
}

function ytLoad(){
	swfobject.embedSWF("http://www.youtube.com/v/5VXieTCqWzc?enablejsapi=1&version=3",
			   "song", "1", "1", "8", null, null, {allowScriptAccess: "always"}, {id: "song"});	
}

function onYouTubePlayerReady(){
	song = $("song");
	var div = document.createElement("div");
	var a = document.createElement("a");
	a.addEventListener("click", toggleSong, false);
	a.innerHTML = "Play song";
	a.setAttribute("href", "#");
	a.setAttribute("id", "songt");
	div.appendChild(a);
	$("links").insertBefore(div, $("links").firstChild);
}

function toggleSong(event){
	event.preventDefault();
	if(song.getPlayerState() == 1){
		song.pauseVideo();
		$("songt").innerHTML = "Play song";
	}else{
		song.playVideo();
		$("songt").innerHTML = "Pause song";
	}
	return false;
}