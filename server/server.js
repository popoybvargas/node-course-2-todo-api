require( './config/config' );

const _ = require( 'lodash' );
const { ObjectID } = require( 'mongodb' );
const express = require( 'express' );
const bodyParser = require( 'body-parser' );

var { mongoose } = require( './db/mongoose' );
var { Todo } = require( './models/todo' );
var { User } = require( './models/user' );
var { authenticate } = require( './middleware/authenticate' );

var app = express();

const port = process.env.PORT;

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

app.delete( '/todos/:id', ( req, res ) =>
{
	var id = req.params.id;

	if ( ! ObjectID.isValid( id ) ) return res.status( 404 ).send( 'Invalid ID!' );

	Todo.findByIdAndRemove( id ).then( ( todo ) =>
	{
		todo ? res.send( { todo } ) : res.status( 404 ).send( 'Todo does not exist!' );
	}, ( e ) =>
	{
		res.status( 400 ).send();
	});
});

app.patch( '/todos/:id', ( req, res ) =>
{
	var id = req.params.id;
	var body = _.pick( req.body, [ 'text', 'completed' ] );

	if ( ! ObjectID.isValid( id ) ) return res.status( 404 ).send( 'Invalid ID!' );

	if ( _.isBoolean( body.completed ) && body.completed )
	{
		body.completedAt = new Date().getTime();
	}
	else
	{
		body.completed = false;
		body.completedAt = null;
	}

	Todo.findByIdAndUpdate( id, { $set: body }, { new: true } ).then( ( todo ) =>
	{
		! todo ? res.status( 404 ).send() : res.send( { todo } );
	}).catch( ( e ) =>
	{
		res.status( 400 ).send();
	});
});

app.post( '/users', ( req, res ) =>
{
	var body = _.pick( req.body, [ 'email', 'password' ] );

	var user = new User( body );

	user.save().then( () =>
	{
		return user.generateAuthToken();
	}).then( ( token ) =>
	{
		res.header( 'x-auth', token ).send( user );
	}).catch( ( e ) =>
	{
		res.status( 400 ).send( e );
	});
});

app.get( '/users/me', authenticate, ( req, res ) =>
{
	res.send( req.user );
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