(function(){
window.addEventListener('load', onLoad, false);
window.addEventListener('hashchange', hashChange, false);
var panelHash = "";
var linkHash = "";
var hashIgnores = {};
function $(el){
	return document.getElementById(el);
}
function $$(sel){
	return toArray(document.querySelectorAll(sel));
}
function onLoad(){
	var i;
	var cn = $$("a.switch");
	var l = location.hash.substring(1);
	var f = !l;
	for(i in cn){
		if(!(cn[i] instanceof Element))continue;
		if(f){
			location.hash=cn[i].getAttribute("href").substring(1);
			f=false;
		}
//		cn[i].addEventListener('click', function(){switchEl(this.getAttribute("href").substring(1))}, false);
		hashIgnores[cn[i].getAttribute("href").substring(1)] = true;
	}
	if(l){
		hashChange({newURL: location.href});
	}
}

function switchEl(n){
	var cn = $$(".panel");
	panelHash = n;
	for(i in cn){
		if(!(cn[i] instanceof Element))continue;
		cn[i].style.display = "none";
	}
	if(n){
		var els = $$("." + n.substring(0, n.length-1));
		var i;
		for(i in els){
			if(!(cn[i] instanceof Element))continue;
			els[i].style.display = "";
		}
	}
}

function hashChange(event){
	var parts = event.newURL.match(".*?#(.*)")[1].split("/");
	var slashed = parts[0] + "/";
	if(slashed in hashIgnores && slashed != panelHash && !(parts[1])){
		switchEl(slashed);
		return;
	}
	var nh = "#" + panelHash + (panelHash == parts[1] + "/" ? "" : parts[1]);
	if(location.hash==nh)return;
	location.hash = nh;
}

function toArray(a){
	return Array.prototype.slice.call(a);
}
window.Switcher = {switch: switchEl};
})();