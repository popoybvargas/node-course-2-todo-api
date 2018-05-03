const { ObjectID } = require( 'mongodb' );

var express = require( 'express' );
var bodyParser = require( 'body-parser' );

var { mongoose } = require( './db/mongoose' );
var { Todo } = require( './models/todo' );
var { User } = require( './models/user' );

var app = express();

const port = process.env.PORT || 3000;

app.use( bodyParser.json() );

app.post( '/todos', ( req, res ) =>
{
	var todo = new Todo(
	{
		text: req.body.text
	});

	todo.save().then( ( doc ) =>
	{
		res.send( doc );
	}, ( e ) =>
	{
		res.status( 400 ).send( e );
	});
});

app.get( '/todos', ( req, res ) =>
{
	Todo.find().then( ( todos ) =>
	{
		res.send( { todos } );
	}, ( e ) =>
	{
		res.status( 400 ).send( e );
	});
});

app.get( '/todos/:id', ( req, res ) =>
{
	var id = req.params.id;

	if ( ! ObjectID.isValid( id ) ) return res.status( 404 ).send();

	Todo.findById( id ).then( ( todo ) =>
	{
		todo ? res.send( { todo } ) : res.status( 404 ).send();
	}, ( e ) =>
	{
		res.status( 400 ).send();
	});
});

app.listen( port, () => console.log( `Started on port ${ port }` ) );

/**
var newTodo = new Todo(
{
	text: 'Cook dinner'
});

var anotherTodo = new Todo(
{
	text: 'Keep on learning'
});

anotherTodo.save().then( ( doc ) =>
{
	console.log( 'Saved todo', JSON.stringify( doc, undefined, 2 ) );
}, ( e ) =>
{
	console.log( 'Unable to save todo', e );
});

var newUser = new User(
{
	email: '    popoy email     '
});

newUser.save().then( ( doc ) =>
{
	console.log( 'Saved user', JSON.stringify( doc, undefined, 2 ) );
}, ( e ) => console.log( 'Unableto save user', e ) );
*/

module.exports = { app };