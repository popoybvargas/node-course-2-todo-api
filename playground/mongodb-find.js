const { MongoClient, ObjectID } = require( 'mongodb' );

MongoClient.connect( 'mongodb://localhost:27017/TodoApp', ( err, client ) =>
{
	if ( err ) return console.log( 'Unable to connect to MongoDB server' );
	
	console.log( 'Connected to MongoDB server' );
	const db = client.db( 'TodoApp' );
	/**
	db.collection( 'Todos' )
	.find( { _id: new ObjectID( '5ae698673745bfd8c8abbfbc' ) } )
	.toArray().then( ( docs ) =>
	{
		console.log( 'Todos' );
		console.log( JSON.stringify( docs, undefined, 2 ) );
	}, ( err ) =>
	{
		console.log( 'Unable to fetch todos.', err );
	});
	*/
	/**
	db.collection( 'Users' ).find().count().then( ( count ) =>
	{
		console.log( `Users count: ${ count }` );
	}, ( err ) =>
	{
		console.log( 'Unable to fetch users.', err );
	});
	*/
	db.collection( 'Users' )
	.find( { name: "Popoy Vargas" } )
	.toArray().then( ( docs ) =>
	{
		console.log( JSON.stringify( docs, undefined, 2 ) );
	});

	client.close();
});