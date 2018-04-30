const { MongoClient, ObjectID } = require( 'mongodb' );

MongoClient.connect( 'mongodb://localhost:27017/TodoApp', ( err, client ) =>
{
	if ( err ) return console.log( 'Unable to connect to MongoDB server' );
	
	console.log( 'Connected to MongoDB server' );
	const db = client.db( 'TodoApp' );
	
	// deletMany
	db.collection( 'Users' ).deleteMany( { name: "Popoy Vargas" } ).then( ( result ) =>
	{
		console.log( result );
	});

	// deleteOne
	// db.collection( 'Todos' ).deleteOne( { text: 'Eat lunch' } ).then( ( result ) =>
	// {
	// 	console.log( result );
	// });

	// findOneAndDelete
	db.collection( 'Users' ).findOneAndDelete( { _id: new ObjectID( "5ae693de797c9f0852990c5d" ) } ).then( ( result ) =>
	{
		console.log( result );
	});

	// client.close();
});