'use strict';
var app = window.app || {};
app = (function () {
	var method = {boot: function () {app.Harness.boot();}};
	var api    = {boot: function () {method.boot();}};
	return api;
}());
app.Harness = (function () {
	var method = {
		boot: function () {//boot all the things!
			app.Analytics.boot();
			app.Sniff.boot();
		}
	};
	var api = {boot: method.boot};
	return api;
}());
app.Analytics = (function () {
	var cfg = {
		appDomain: 'dustbowlmovie.com',
		account: {
			prod: 'UA-43564530-1',
			dev: 'UA-NOPE-1',
			active: null
		}
	};
	var method = {
		boot: function () {
			cfg.account.active = cfg.account.dev;
			if (window.location.host.indexOf(cfg.appDomain) !== -1) {
				cfg.account.active = cfg.account.prod;
				method.broadcast();//for now, only do in prod
			}
			console.log('cfg.account.active: ' + cfg.account.active + 'we have skipped GA if not in prod, phew!');
		},
		broadcast: function () {
			window._gaq = window._gaq || [];
			window._gaq.push(['_setAccount', cfg.account.active]);
			window._gaq.push(['_trackPageview']);
			var g = document.createElement('script'), s = document.getElementsByTagName('script')[0];
			g.type = 'text/javascript';
			g.src = ('https:' === document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
			g.async = true;
			s.parentNode.insertBefore(g, s);
		}
	};
	var api = {
		boot: method.boot
	};
	return api;
}());
app.Sniff = (function () {
	var property = {
		isMobile: false,
		iframeDesktop: '<iframe width="100%" height="100%" src="http:&#x2F;&#x2F;www.kickstarter.com&#x2F;projects&#x2F;hdilla&#x2F;wrong-side-up-a-dust-bowl-inspired-short-film&#x2F;widget&#x2F;video.html" frameborder="0"> </iframe>',
		iframeMobile: '<iframe width="285" height="214" src="http:&#x2F;&#x2F;www.kickstarter.com&#x2F;projects&#x2F;hdilla&#x2F;wrong-side-up-a-dust-bowl-inspired-short-film&#x2F;widget&#x2F;video.html" frameborder="0"> </iframe>',
		iframeEmbed: null
	};
	var method = {
		boot: function () {
			method.hide();
			if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
				console.log('you are mobile');
				property.iframeEmbed = property.iframeMobile;
			} else {
				console.log('you are NOT mobile');
				property.iframeEmbed = property.iframeDesktop;
				document.getElementById('h3').className += ' hide';//also hide this for desktop
				document.getElementById('clp').className += ' hide';
				document.getElementById('hdm').className += ' hide';
			}
			method.embed();
		},
		hide: function () {
			document.getElementById('h1').className += ' hide';
			document.getElementById('h2').className += ' hide';
		},
		embed: function () {console.log(property.iframeEmbed);
			document.getElementById('h1').insertAdjacentHTML('afterend', property.iframeEmbed);
		}
	};
	var api = {
		boot: method.boot
	};
	return api;
}());
app.boot();