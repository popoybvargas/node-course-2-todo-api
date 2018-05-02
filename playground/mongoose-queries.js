const { ObjectID } = require( 'mongodb' );

const { mongoose } = require( './../server/db/mongoose' );
const { Todo } = require( './../server/models/todo' );
const { User } = require( './../server/models/user' );

/**
var id = '5ae94a74dee57f08ab4d429a11';

if ( ! ObjectID.isValid( id ) ) console.log( 'ID not valid' );

Todo.find(
{
	_id: id
}).then( ( todos ) =>
{
	console.log( 'Todos', todos );
});

Todo.findOne(
{
	_id: id
}).then( ( todo ) =>
{
	console.log( 'Todo', todo );
});

Todo.findById( id ).then( ( todo ) =>
{
	if ( ! todo ) return console.log( 'ID not found' );

	console.log( 'Todo by ID', todo );
}).catch( ( e ) => console.log( e ) );
*/

var userID = '5ae6d7fb06e464156eb4c9a5';

if ( ! ObjectID.isValid( userID ) ) console.log( 'ID not valid' );

User.findById( userID ).then( ( user ) =>
{
	if ( ! user ) return console.log( 'User not found' );

	console.log( 'User by ID', user );
}).catch( ( e ) => console.log( e ) );