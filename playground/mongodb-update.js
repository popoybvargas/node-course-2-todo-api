const { MongoClient, ObjectID } = require( 'mongodb' );

MongoClient.connect( 'mongodb://localhost:27017/TodoApp', ( err, client ) =>
{
	if ( err ) return console.log( 'Unable to connect to MongoDB server' );
	
	console.log( 'Connected to MongoDB server' );
	const db = client.db( 'TodoApp' );
	/**
	db.collection( 'Todos' ).findOneAndUpdate(
	{
		_id: new ObjectID( "5ae6b1103745bfd8c8abc481" )
	},
	{
		$set:
		{
			completed: true
		}
	},
	{
		returnOriginal: false
	}).then( ( result ) =>
	{
		console.log( result );
	});
	*/
	db.collection( 'Users' ).findOneAndUpdate(
	{
		_id: new ObjectID( '5ae2ea81eba42c18bd6d4e69' )
	},
	{
		$set: { name: 'Popoy Vargas' },
		$inc: { age: 1 }
	},
	{
		returnOriginal: false
	}).then( ( result ) => console.log( result ) );

	// client.close();
});