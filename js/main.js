function requestProperties(who) {
    $( ".loader" ).show();

    $.ajax({
	url: "http://opa.timwis.com/fetch.php",
	dataType: "jsonp",
	data: {
	    owner: who,
	    exact: "true"
	},
	success: function( d ) { $.publish("/ajax/address/update", [d]); }
    });
}


var l = new ListManager("#properties", function () {});

$(function() {

    // Wire up events...
    $.subscribe("/ajax/address/update", function (objs) {
	l.setObjects($.map(objs, function( obj ) {
	    return obj.address;
	}));
    });

    $.subscribe("/ajax/address/update", function( objs ) {
	errors.reset();
	$(".loader").hide();
    });

    $.subscribe("/local/map/select", function( obj ) {
	l.selectNoUpdate(obj.address);
    });

    var errors = new ErrorHandler($(".errors"));
    $(".loader").hide(); // start out hidden

    $( "#properties" ).change(function() {
	$( "#properties" ).children("option:selected").each(function() {
	    $.publish("/local/address/select", [$(this).text()]);
	});
    }).change();

    $( "#owner" ).keyup(function( event ) {
	if(event.keyCode == 13){
	    requestProperties($( "#owner" ).val());
	}
    });


    $( "#owner" ).autocomplete({
	source: function( request, response ) {
	    $( ".loader" ).show();

	    $.ajax({
		url: "http://opa.timwis.com/fetch.php", 
		dataType: "jsonp",
		data: {
		    owner: request.term
		},
		success: function( data ) {
		    if (typeof(data) == "undefined") {
			$( ".loader" ).hide();
			$.publish("/ajax/address/update", [[]]);
			errors.addError("No owners found");
			return;
		    }

		    response( $.map( data, function( item ) {
			return {
			    label: item.owner, 
			    value: item.oweer
			}
		    }));
		}
	    });
	},
	minLength: 4,
	select: function( event, ui ) {
	    // Clear out table
	    $.publish("/ajax/address/update", [[]]);

	    if (ui.item) {
		requestProperties(ui.item.label);
	    }
	},
	open: function() {
	    $( ".loader" ).hide();
	    $( this ).removeClass( "ui-corner-all" ).addClass( "ui-corner-top" );
	},
	close: function() {
	    $( this ).removeClass( "ui-corner-top" ).addClass( "ui-corner-all" );
	}
    });
});
