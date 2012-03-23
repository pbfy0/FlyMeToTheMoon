(function(){
window.addEventListener('load', onLoad, false);
function $(el){
	return toArray(document.getElementById(el));
}
function $$(sel){
	return document.querySelectorAll(sel);
}
function onLoad(){
	var l = location.hash.substring(1);
	if(l){
		switchEl(l);
	}
	var i;
	var cn = $$("a.switch");
	for(i in cn){
		if(!l){
			l = cn[i].getAttribute("href").substring(1);
			switchEl(l);
		}
		if(!(cn[i] instanceof Element))continue;
		cn[i].addEventListener('click', function(){switchEl(this.getAttribute("href").substring(1))}, false);
	}
}

function switchEl(n){
	var cn = $$(".panel");
	for(i in cn){
		if(!(cn[i] instanceof Element))continue;
		cn[i].style.display = "none";
	}
	if(n){
		var els = $$("." + n);
		var i;
		for(i in els){
			if(!(cn[i] instanceof Element))continue;
			els[i].style.display = "";
		}
	}
}

function toArray(a){
	return Array.prototype.slice.call(a);
}
window.Switcher = {switch: switchEl};
})();