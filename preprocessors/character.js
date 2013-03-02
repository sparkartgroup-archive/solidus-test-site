var data = this;
var character = data.resources.character.content;

// Create an array representation of the items object
var createItemsArray = function( character ){

	var items_array = [];

	for( var type in character.items ){
		var item = character.items[type];
		item.type = type;
		items_array.push( item );
	}

	character.items_array = items_array;

};

createItemsArray( character );