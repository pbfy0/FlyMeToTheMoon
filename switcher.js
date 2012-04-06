(function(){
window.addEventListener('load', onLoad, false);
window.addEventListener('hashchange', hashChange, false);
var panelHash = "";
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
	for(i in cn){
		if(!(cn[i] instanceof Element))continue;
		if(!l){
			location.hash=cn[i].getAttribute("href").substring(1);
			l=true;
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
	console.log(event);
	var nu = event.newURL.match(".*?#(.*)$")[1];
	var m = nu.match("(.*?/)#(.*)");
	var hash = m ? m[1] : nu;
	console.log(hash);
	if(hash in hashIgnores){
		switchEl(hash);
		return;
	}
//	location.hash = "#" + panelHash + "/" + hash;
}

function toArray(a){
	return Array.prototype.slice.call(a);
}
window.Switcher = {switch: switchEl};
})();