var mongoose = require( 'mongoose' );

mongoose.Promise = global.Promise;

// mongoose.connect( process.env.MONGODB_URI || 'mongodb://localhost:27017/TodoApp' );
mongoose.connect( 'mongodb://popoyvargas:trudg1ng-trampLes@ds113640.mlab.com:13640/node-todo-api' || 'mongodb://localhost:27017/TodoApp' );

module.exports = { mongoose };