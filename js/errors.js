/**
 * Javascript error handling
 */
var ErrorHandler = Class.extend({
    init:function(elem) {
	this.elem = elem;
	this.errors = [];
    },

    render: function() {
	elem.empty();
	$.map(this.errors, function( error ) {
	    elem.append('<div class="error">' + "");
	});
    }});

   
    