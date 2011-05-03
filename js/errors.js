/**
 * Javascript error handling
 */
var ErrorHandler = Class.extend({
    init:function(elem) {
	this.elem = elem;
	this.errors = [];
    },

    render: function() {
	var elem = this.elem;
	elem.empty();
	$.map(this.errors, function( error ) {
	    elem.append('<div class="error">' + error + '</div>');
	});
    },

    reset: function() {
	this.errors.length = 0;
	this.render();
    },

    addError: function( err ) {
	this.errors.push(err);
	this.render();
    }
});

   
    