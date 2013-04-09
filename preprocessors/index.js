var UUUGUUUUUUUU = data.resources.UUUGUUUUUUUU;
var RhubarbVole = data.resources.RhubarbVole;
var VoodooFrodo = data.resources.VoodooFrodo;

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

createItemsArray( UUUGUUUUUUUU );
createItemsArray( RhubarbVole );
createItemsArray( VoodooFrodo );

var characters = [ UUUGUUUUUUUU, RhubarbVole, VoodooFrodo ];

data.resources.characters = characters;