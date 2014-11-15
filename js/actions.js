//actions
var jQT = new $.jQTouch({
	themeSelectionSelector: '#jqt'
});

var fn = {
	
	device: function(){
		document.addEventListener('deviceready',fn.init,false);
	},
	
	init: function(){
		//iniciar acelerometro
		$('#acelerometro .individual li').eq(0).tap(ace.start);
		//detener acelerometro
			$('#acelerometro .individual li').eq(1).tap(ace.stop);
			
			//iniciar brujula
		$('#brujula .individual li').eq(0).tap(bru.start);
		//detener brujula
			$('#brujula .individual li').eq(1).tap(bru.stop);
	}
};

var ace = {
	start: function(){
			if(ace.wathID == null)
		ace.wathID =navigator.accelerometer.watchAcceleration(ace.success,ace.error,{frequency:800});
	},
	stop: function(){
		if(ace.wathID){
			navigator.accelerometer.clearWatch(ace.wathID);
			ace.wathID = null;
			$('#acelerometro h2').html('Detenido');
		}
	},
	wathID: null,
	success: function(a){
		var text = 'X: <b>'+a.x+'</b><br>'+
					'Y: <b>'+a.y+'</b><br>'+
					'Z: <b>'+a.z+'</b><br>';
					$('#acelerometro h2').html(text);
	},
	error: function(){
		alert('Error en el acelerometro');
	}
};

/////////////////////////////////////////////////////////////////////////BRUJULA

var bru = {
	start: function(){
			if(bru.wathID == null)
			 
		bru.wathID =navigator.compass.watchHeading(bru.success,bru.error,{frequency:800});
		
	},
	stop: function(){
		if(bru.wathID){
			navigator.compass.clearWatch(bru.wathID);
			bru.wathID = null;
			$('#brujula h2').html('Detenido');
		}
	},
	wathID: null,
	success: function(b){
	 var arrow = $('#arrow');
        var arrowOrientation = 360 - b.magneticHeading;
        arrow.css('-webkit-transform','rotate(' + arrowOrientation + 'deg)');
	},
	error: function(){
		alert('Error en la brujula');
	}
};








$(fn.device);