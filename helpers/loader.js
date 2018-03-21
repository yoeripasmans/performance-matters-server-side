const loader = {
	 element: window.querySelector('.loader'),
	 show: function(el){
		 this.element.classList.add("show");
	 },
	 hide: function(el){
		 this.element.classList.remove("show");
	 }

};

module.exports = loader;
