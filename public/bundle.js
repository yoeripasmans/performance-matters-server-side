(function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
const toggle = require('./modules/toggle.js');
const filter = require('./modules/filter.js');

(function() {

	const app = {
		init: function() {
			toggle.init();
			filter.getInput();
		},
	};
	//Start app
	app.init();

})();

},{"./modules/filter.js":2,"./modules/toggle.js":3}],2:[function(require,module,exports){
const filter = {
	getInput: function(data) {
		const searchForm = document.querySelector('.search');
		searchForm.addEventListener('keyup', e => this.filter(searchForm.value, data));
	},

	filter: function(value, data) {
		const filterData = data.filter(obj => {
			if (obj.date.value.includes(value)) {
				return true;
			} else {
				return false;
			}
			return filterData;
		});

	}
};

module.exports = filter;

},{}],3:[function(require,module,exports){
const toggle = {
	chevronDown: document.querySelector(".fa-chevron-down"),
	chevronUp: document.querySelector(".fa-chevron-up"),
	header: document.querySelector("body>header"),
	introText: document.querySelector(".intro"),
	init: function() {
		const _this = this;
		this.show();
		this.chevronUp.addEventListener("click", () => this.hide());
		this.chevronDown.addEventListener("click", () => this.show());

	},
	show: function() {
		this.introText.style.opacity = 0.8;
		this.chevronDown.classList.remove("show");
		this.chevronUp.classList.add("show");
		this.header.classList.remove("hidden");
		this.introText.classList.add("show");
	},
	hide: function() {
		this.introText.style.opacity = 0;
		this.chevronDown.classList.add("show");
		this.chevronUp.classList.remove("show");
		this.header.classList.add("hidden");
		this.introText.classList.remove("show");
	}
};

module.exports = toggle;

},{}]},{},[1]);
