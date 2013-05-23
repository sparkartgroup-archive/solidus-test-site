var character = context.resources.character;

// Create an array representation of the items object
var createItemsArray = function( items ){

	var items_array = _( items ).map( function( item, type ){
		var this_item = _(item).clone();
		this_item.type = type;
		return this_item;
	});

	return items_array;

};

character.items_array = createItemsArray( character.items );
