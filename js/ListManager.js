   var ListManager = Class.extend({
	init: function(elem, uchange) {
	    this.elem = elem;
	    this.uchange = uchange;

	    $(function() {
		$( elem ).change(function() {
		    var selected = [];
		    //TODO: There has go to be a better way to do this...
		    $(elem).children("option:selected").each(function() {
			selected.push($(this).text()); 
		    });

		    if (selected != null && selected.length > 0) {
			uchange(selected);
		    }
		}).change();	
    });

	    this.objects = [];
	},

	setObjects: function(objs) {
	    this.objects = objs;
	    this.render();
	},

	addObject: function(obj) {
	    this.objects.push(obj);
	    this.render();
	    this.select(obj);
	},

	select: function(obj) {
	    this.selectNoUpdate(obj);
	    this.uchange([obj]);
	},

       selectNoUpdate: function(obj) {
	    $(this.elem).children("option").each(function() {
		q = $(this)
		q.removeAttr("selected");
		if (q.text() == obj) {
		    q.attr('selected','selected');
		}
	    });
	},

	removeObject: function(obj) {
	    this.objects.remove(obj);
	    this.render();
	},

	render: function() {
	    $(this.elem).html($.map(this.objects, function ( item ) { 
		return "<option>" + item + "</option>"
	    }).join('\n'));
	}
    });