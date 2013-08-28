'use strict';
var boot = window.boot || {};
boot = (function () {
	var method = {strap: function () {yepnope([{load: ['_/js/lib/zepto.js','_/js/app.js'],complete: function () {app.boot();}}]);}};
	var api = {strap: function () {method.strap();}};
	return api;
}());