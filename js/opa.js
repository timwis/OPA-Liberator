var map = null;
var markers = [];
var infowindows = [];

function initialize() {
	var latlng = new google.maps.LatLng(39.970069,-75.168686);
	var myOptions = {
	  zoom: 12,
	  center: latlng,
	  mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	map = new google.maps.Map(document.getElementById('map_canvas'),
		myOptions);
	return map;
}


$(document).ready(function() {

	// When owner is searched for
	$('#name_search').submit(function() {
		var name = $('input#name').val();

		if(name) { // don't send a json request if input is blank
			$.getJSON('fetch.php?owner='+name+'&callback=?', function(data){
				$('#names').html(''); // Clear names box
				for(var i=0;i<data.length;i++){
					$('#names').append('<option value="'+data[i]['owner']+'">'+data[i]['owner']+' ('+data[i]['count']+')</option>');
				}
			});
		}
		return false;
	});

	// When name is selected
	$('#names').change(function() {
		var owner = $('#names option:selected').val();
		if(owner)
			populateAddresses(owner);
	});

	// When address is selected
	$('#addresses').change(function() {
		var address = $('#addresses option:selected').val();
		if(address) {
			alert('Selected '+address);
			// TODO: Pull up the bubble of that address on the map
		}
	});

});
		
function populateAddresses(owner){
	var addresses = [];
	$('#addresses').html('');
	
	$.getJSON('fetch.php?owner='+owner+'&exact=true&callback=?', function(data) {
		for(var i=0;i<data.length;i++){
			addresses.push( [parseFloat(data[i].lat), parseFloat(data[i].lon), data[i].address] );
			$('#addresses').append('<option>'+data[i].address+'</option>')
		}
		populateMap(addresses);
	});
}

// The markers are in the right location, but clicking them always opens the same bubble
function populateMap(addresses) {
	if (markers){
		for (i in markers) {
			markers[i].setMap(null);
		}
	}

	var latlon = null;
	for (a in addresses){
		latlon = new google.maps.LatLng(addresses[a][0], addresses[a][1]);
		markers.push(new google.maps.Marker({
			position: latlon,
			map: map,
			title: 'test'+a
		}));
		infowindows.push(new google.maps.InfoWindow({content: 'Address goes here test'+a}));
		google.maps.event.addListener(markers[a], 'click', function() {
			infowindows[a].open(map,markers[a]);
		});
	}
}