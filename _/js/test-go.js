'use strict';
var go = function () {
	if (window.location.host.indexOf('dustbowlmovie.com') !== -1) {
		window._gaq = window._gaq || [];
		window._gaq.push(['_setAccount', 'UA-43564530-1']);
		window._gaq.push(['_trackPageview']);
		var g = document.createElement('script'), s = document.getElementsByTagName('script')[0];
		g.type = 'text/javascript';
		g.src = ('https:' === document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
		g.async = true;
		s.parentNode.insertBefore(g, s);
	}

	document.getElementById('h1').className += ' hide';
	document.getElementById('h2').className += ' hide';

	var ifd = document.getElementById('ifd');
	var ifm = document.getElementById('ifm');

	if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
		document.getElementById('h3').className += ' hide';//also hide this for desktop
		document.getElementById('clp').className += ' hide';
		document.getElementById('hdm').className += ' hide';
		ifd.className = ifd.className.replace( /(?:^|\s)hide(?!\S)/ , '');
	} else {
		ifm.className = ifm.className.replace( /(?:^|\s)hide(?!\S)/ , '');
	}
};
go();