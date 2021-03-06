
var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID}=require('mongodb');

var mongoose = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();

app.use(bodyParser.json());

app.post('/todos',(req, res)=>{
    console.log(req.body);
    var todo = new Todo({
        text: req.body.text
    })
    console.log(req.body.text);
    todo.save().then((doc)=>{
    res.send(doc);
    }, (e)=>{
        res.status(400).send(e);
    });
});

app.get('/todos',(req, res)=>{
    Todo.find().then((todos)=>{
        res.send({todos})
    }, (e)=>{
        res.status(400).send(e);
    });
});


app.get('/todos/:id', (req, res )=>{
    var id = req.params.id;
    if(!ObjectID.isValid(id)){
        return res.sendStatus(404).send();
    }
    Todo.findById(id).then((todo)=>{
        if (!todo){
            return res.status(404).send();
        }
        res.send({todo});
    }).catch((e)=>{
        res.status(400).send();
    })
    //res.send(req.params);
});

app.listen(3000, ()=>{
    console.log('Started on port 3000');
});

module.exports = {app};
//save new something


// var newTodo = new Todo({
//     text: 'Cook dinner'
// });

// newTodo.save().then((doc) => {
//     console.log('Saved todo',doc);
// }, (c) => {
//     console.log('Unable to save todo');
// });

// var otherTodo = new Todo({
//     text: 'Feed the cat',
//     completed: true,
//     completedAt: 123
// });
//var otherTodo = new Todo({text: 'new text'});



// var user = new User({ email: 'rutilio.iraheta@telusinternational.com' });

// user.save().then((doc) => {
//     console.log('User Saved', doc)
// }, (e) => {
//     console.log('Unable to save todo', e);
// });