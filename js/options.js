var _options = {
	vars: {players:{count:0}},
	init: function(){
if(!localStorage.getItem('players.count')){_options.change.players(1);}
else{_options.vars.players.count = localStorage.getItem('players.count');}
		var c = document.querySelector('.config-players-count');
		if(c){c.value = _options.vars.players.count;c.addEventListener('change',function(e){_options.change.players(this.value);});}
	},
	get: {
		players: function(){return (_options.vars.players.count) ? _options.vars.players.count : 1;}
	},
	change: {
		players: function(n){
			n = parseInt(n);
			if(n < 1){n = 1;}
			_options.vars.players.count = n;
			localStorage.setItem('players.count',n);
			var controllerPanels = document.querySelectorAll('.option-controllers > .controller');if(!controllerPanels){return false;}
			$each(controllerPanels,function(k,v){$E.class.add(v,'hidden');});
			while(n--){
				var q = document.querySelector('.controller'+n);if(!q){continue;}
				$E.class.remove(q,'hidden');
			}
			return false;
		}
	},
	events: {
		gamepadConnect: function(e){
//FIXME: aqui añadimos el game pad al menú de opciones
		}
	}
};
