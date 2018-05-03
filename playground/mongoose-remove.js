const { ObjectID } = require( 'mongodb' );

const { mongoose } = require( './../server/db/mongoose' );
const { Todo } = require( './../server/models/todo' );
const { User } = require( './../server/models/user' );
/**
Todo.remove( {} ).then( ( result ) =>
{
	console.log( result );
});
*/
Todo.findOneAndRemove( { _id: '5aeac0213772e20d5cf41f86' } ).then( ( todo ) =>
{
	console.log( todo );
});

Todo.findByIdAndRemove( '5aeac0213772e20d5cf41f86' ).then( ( todo ) =>
{
	console.log( todo );
});