var _starbound = {
	init: function(event){
		addEventListener('keydown',_starbound.onkeydown);
	},
	onkeydown: function(e){
		//alert(e.which);
		switch(e.which){
			case 73:
				var elem = document.querySelector('.inventory');if(!elem){return false;}
				var p = ($E.classHas(elem,'hidden')) ? $E.classRemove(elem,'hidden') : $E.classAdd(elem,'hidden');
				break;
		}
	}
};

addEventListener('load',_starbound.init);
