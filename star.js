var _starbound = {
	vars: {zoom:3,gravity:0.5,keymap:{}},
	init: function(event){
		addEventListener('keydown',_starbound.onkeydown);
		addEventListener('keyup',_starbound.onkeyup);
var charElem = $_('char1');
_char.init(charElem);
_char.arm.load();
	},
	onkeydown: function(e){
		//alert(e.which);
var charElem = $_('char1');
		switch(e.which){
			case 32:/* SPACE */
				e.preventDefault();
				if(_starbound.vars.keymap[e.which]){return false;}
				_starbound.vars.keymap[e.which] = true;
				_char.jumpStart(charElem);
				break;
			case 37:/* RIGHT */
				e.preventDefault();
				_char.moveRight(charElem);
				break;
			case 39:/* LEFT */
				e.preventDefault();
				_char.moveLeft(charElem);
				break;
			case 73:
				var elem = document.querySelector('.inventory');if(!elem){return false;}
				var p = ($E.classHas(elem,'hidden')) ? $E.classRemove(elem,'hidden') : $E.classAdd(elem,'hidden');
				break;
		}
	},
	onkeyup: function(e){
		//alert(e.which);
var charElem = $_('char1');
		switch(e.which){
			case 32:
				e.preventDefault();
				_starbound.vars.keymap[e.which] = false;
				_char.jumpEnd(charElem);
				break;
			case 37:/* RIGHT */
				e.preventDefault();
				_char.moveStop(charElem);
				break;
			case 39:/* LEFT */
				e.preventDefault();
				_char.moveStop(charElem);
				break;
		}
	},
};

addEventListener('load',_starbound.init);
