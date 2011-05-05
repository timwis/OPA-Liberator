
$(function initialize() {
    var myLatlng = new google.maps.LatLng(39.95222, -75.1641667);
    var myOptions = {
      zoom: 12,
      center: myLatlng,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);

    var markers = [];

    $.subscribe("/local/address/select", function( addr ) {
	for(var m in markers) {
	    marker = markers[m];
	    if (m == addr) {
		map.setZoom(18);
		map.setCenter(marker.getPosition());

		google.maps.event.trigger(marker, "click");
	    }
	}
    });

    // This event is called when a new set of address are available
    $.subscribe("/ajax/address/update", function(objs) {
	for(var m in markers) {
	    markers[m].setMap(null); 
	}

	markers.length = 0;

	var bounds = new google.maps.LatLngBounds();
	var windows = [];
	var foundMarkers = false;

	$.map(objs, function ( obj ) {
	    var lat = obj.lat;
	    var lon = obj.lon;

	    if (lat == null || lon == null || lat == 0 || lon == 0) {
		return;
	    }

	    var ll = new google.maps.LatLng(obj.lat, obj.lon);
	    
	    bounds.extend(ll);

	    var m = new google.maps.Marker({
		position: ll,
		map: map,
		title: obj.address});

	    foundMarkers = true;

	    google.maps.event.addListener(m, 'click', function() {
		$.publish("/local/map/select", [ obj ]);

		$.map(windows, function( win ) {
		    win.close();
		});
		
		windows.length = 0;

		var iwin = new google.maps.InfoWindow({
		    content:	'<font size="+1"><b>' + obj.address + '</b></font><br />' +
						'<a href="http://opa.phila.gov/opa.apps/Search/SearchResults.aspx?id=' + obj.tencode + '" target="_blank">OPA # ' + obj.parcel_number + '</a><br /><br />' +
						'<b>Mailing Address</b><br />' +
						obj.mail_street + '<br />' +
						obj.mail_city + ' ' + obj.mail_state + ' ' + obj.mail_zip
			});

		iwin.open(map, m);
		windows.push(iwin);
	    });

	    markers[obj.address] = m;
	});
	
	if (foundMarkers == false) {
	    return;
	}

	map.fitBounds(bounds);

	if (map.getZoom() > 16) {
	    map.setZoom(16);
	}
    });
	
});
