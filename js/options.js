var _options = {
	init: function(){
if(!localStorage.getItem('players.count')){_options.change.players(1);}
else{_starbound.vars.players.count = localStorage.getItem('players.count');}
		var c = document.querySelector('.config-players-count');
		if(c){c.addEventListener('change',function(e){_options.change.players(this.value);});}
	},
	get: {
		players: function(){return (_starbound.vars.players.count) ? _starbound.vars.players.count : 1;}
	},
	change: {
		players: function(n){
			n = parseInt(n);
			if(n < 1){n = 1;}
			_starbound.vars.players.count = n;
			localStorage.setItem('players.count',n);
			return false;
		}
	},
	events: {
		gamepadConnect: function(e){
//FIXME: aqui añadimos el game pad al menú de opciones
		}
	}
};
