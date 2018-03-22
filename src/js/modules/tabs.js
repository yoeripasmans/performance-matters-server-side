const tabs = {

	disabled: function(){
		const links = document.getElementById('map').getElementsByTagName('a');
		const buttons = document.getElementById('map').getElementsByTagName('button');
		for (let i = 0; i < links.length; i++) {
			links[i].setAttribute( 'tabindex', '-1' );
		}
		for (let i = 0; i < buttons.length; i++) {
			buttons[i].setAttribute( 'tabindex', '-1' );
		}
	},
	active: function(){
		const links = document.getElementById('map').getElementsByTagName('a');
		const buttons = document.getElementById('map').getElementsByTagName('button');
		for (let i = 0; i < links.length; i++) {
			links[i].setAttribute( 'tabindex', '-1' );
		}
		for (let i = 0; i < buttons.length; i++) {
			buttons[i].setAttribute( 'tabindex', '0' );
		}
	}
};
export default tabs;
