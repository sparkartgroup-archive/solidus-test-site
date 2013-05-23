var UUUGUUUUUUUU = context.resources.UUUGUUUUUUUU;
var RhubarbVole = context.resources.RhubarbVole;
var VoodooFrodo = context.resources.VoodooFrodo;

// Create an array representation of the items object
var createItemsArray = function( items ){

	var items_array = _( items ).map( function( item, type ){
		var this_item = _(item).clone();
		this_item.type = type;
		return this_item;
	});

	return items_array;

};

UUUGUUUUUUUU.items_array = createItemsArray( UUUGUUUUUUUU.items );
RhubarbVole.items_array = createItemsArray( RhubarbVole.items );
VoodooFrodo.items_array = createItemsArray( VoodooFrodo.items );

var characters = [ UUUGUUUUUUUU, RhubarbVole, VoodooFrodo ];

context.resources.characters = characters;