/* ---------------------------------------------------
 * This particular file is used by NodeJS to establish
 * connections for both Socket.io & Mongoose (MongoDB)
 * ------------------------------------------------ */

/* ExpressJS */
const express = require('express');
const bodyParser = require('body-parser');
// const cors = require('cors');

/* JWT & Bcrypt */
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

/* Socket.io */
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// require('./router/router')(app);
//
const Role = require('./model/role.model');
const User = require('./model/user.model');
const Conversation = require('./model/conversation.model');

// configuring the database
const config = require('./config/config');
const mongoose = require('mongoose');

// mongoose.Promise = global.Promise;

// connecting to the database
mongoose.connect(config.url, config.options)
    .then(() => {
        console.log("Connecting to MongoDB.");
        // initial();

    })
    .catch(err => {
        console.log("Could not connect to MongoDB.");
        process.exit();
    });

// create a server
const port = process.env.PORT || 3000;

http.listen(port, function () {
    console.log(`listening on *:${port}`);
});

function initial() {
    Role.countDocuments((err, count) => {
        if (!err & count === 0) {
            // USER Role ->
            new Role ({
                name: 'USER'
            }).save(err => {
                if (err) return console.error(err.stack);
                console.log("USER_Role is added.");
            });

            // MERCHANT Role ->
            new Role ({
                name: 'MERCHANT'
            }).save(err => {
                if (err) return console.error(err.stack);
                console.log("MERCHANT_Role is added.");
            });

            // ADMIN Role ->
            new Role ({
                name: 'ADMIN'
            }).save(err => {
                if (err) return console.error(err.stack);
                console.log("ADMIN_Role is added.");
            });
        }
    });
}

const conversations = {};
// socket connection
io.on('connection', function (socket) {
    let previousId;
    const safeJoin = currentId => {
        socket.leave(previousId);
        socket.join(currentId);
        previousId = currentId;
    };
    console.log('user connected');

    // broadcasts to other connected users
    socket.on('new-message', function (message) {
        io.emit('new-message', message);
        console.log(message);
    });

    // broadcasts GET request
    socket.on('GET-request', function () {
        // fetch all users & emit over
        User.find(function (err, users) {
            if (err) return console.error(err);
            io.emit('GET-success', users);
        });
    });

    socket.on('test-GET', function(){
        var array = [
            { userID: '4308131', userName: '4308131', firstName: 'Sean', lastName: 'Lee', email: '4308131@eeyore.com', password: '940228', oAuth: 'test', role: 'Admin' },
            { userID: '4308111', userName: 'Mr. Nice', firstName: 'John', lastName: 'Doe', email: '', password: 'test123', oAuth: 'test', role: 'User' }
        ];

        // User.insertMany(array, function(err) {
        //     console.log(err);
        // });

        // User.find(function (err, users) {
        //     if (err) return console.error(err);
        //     console.log("test-GET Fired");
        //     console.log(users);
        //     io.emit('test-GET-success', users);
        //     console.log("test-GET-success emitted");
        //
        // });
    });

    //ChatService Function - populateDummyData
    socket.on('populateDummyData-start', function(){
        console.log('populateDummyData-start started.');

        var populateUsers = [
            { userID: '4308131', userName: '4308131', firstName: 'Sean', lastName: 'Lee', email: '4308131@eeyore.com', password: '940228', oAuth: 'test', roles: 'Admin' },
            { userID: '4308111', userName: 'Mr. Nice', firstName: 'John', lastName: 'Marco', email: '4308111@eeyore.com', password: 'test123', oAuth: 'test', roles: 'User' },
            { userID: '4308113', userName: 'Bombasto', firstName: 'James', lastName: 'Polo', email: '4308113@eeyore.com', password: 'test123', oAuth: 'test', roles: 'User' },
            { userID: '4308114', userName: 'Celeritas', firstName: 'Jack', lastName: 'Ripper', email: '4308114@eeyore.com', password: 'test123', oAuth: 'test', roles: 'User' },
            { userID: '4308115', userName: 'Magneta', firstName: 'Jane', lastName: 'Doe', email: '4308115@eeyore.com', password: 'test123', oAuth: 'test', roles: 'User' }
        ];

        var populateConversations = [
            {conversationID: '001', users: ['4308131', '4308111'], shoppingCardID: '', topic: 'Test Conversation 1', messages:[{senderID: '4308131', content:"Hello!"}, {senderID: '4308111', content:"Hi!"}, {senderID: '4308131', content:"How are you?"}, {senderID: '4308111', content:"Good! You?"}]},
            {conversationID: '002', users: ['4308131', '4308113'], shoppingCardID: '', topic: 'Test Conversation 2', messages:[{senderID: '4308131', content:"Hello!"}, {senderID: '4308113', content:"Hi!"}, {senderID: '4308131', content:"How are you?"}, {senderID: '4308113', content:"Good! You?"}]},
            {conversationID: '003', users: ['4308131', '4308113'], shoppingCardID: '', topic: 'Test Conversation 3', messages:[{senderID: '4308111', content:"Hello!"}, {senderID: '4308113', content:"Hi!"}, {senderID: '4308111', content:"How are you?"}, {senderID: '4308113', content:"Good! You?"}]},
            {conversationID: '004', users: ['4308131', '4308131'], shoppingCardID: '', topic: 'Test Conversation 4', messages:[{senderID: '4308111', content:"Hello!"}, {senderID: '4308131', content:"Hi!"}, {senderID: '4308111', content:"How are you?"}, {senderID: '4308131', content:"Good! You?"}]}
        ];

        // console.log(populateUsers);
        console.log(populateConversations);

        User.find(function (err, users) {
            if (err) return console.error(err);
            console.log(users.length);
            if (users.length == 0) {
                console.log("Users table populated.");
                populateUsers.forEach(function (n) {
                    User.findOneAndUpdate(n, n, { upsert: true, useFindAndModify: false }, function (err, doc) {
                        console.log(doc);
                    });
                });
            }

        });

        Conversation.find(function (err, conversations) {
            if (err) return console.error(err);
            console.log(conversations.length);
            if (conversations.length == 0) {
                console.log("Conversations table populated.");
                populateConversations.forEach(function (n) {
                    Conversation.findOneAndUpdate(n, n, { upsert: true, useFindAndModify: false }, function (err, doc) {
                        console.log('doc');
                        console.log(doc);
                        console.log(err);
                    });
                });
            }

        });

        console.log('populateDummyData-start finished.');
    });

    //ChatService Function - getAllUsers
    socket.on('getAllUsers-start', function(){
        User.find(function (err, users) {
            if (err) return console.error(err);

            io.emit('getAllUsers-success', users);

            // console.log(users);
            // console.log("getAllUsers-success emitted");

        });
    })

    //ChatService Function - getAllConversations
    socket.on('getAllConversations-start', function(){
        Conversation.find(function (err, conversations) {
            if (err) return console.error(err);

            io.emit('getAllConversations-success', conversations);
            io.emit("conversations", Object.keys(conversations));

            // console.log(users);
            // console.log("getAllConversations-success emitted");

        });
    })

    socket.on('submitMessage-start', function(data){
        console.log('submitMessage-start started.');
        // console.log(data);
        // console.log(data.conversation.message);
        //
        // data.conversation.messages.push(data.message);
        // console.log(data.message);
        // console.log(data.conversation.content);

        // Conversation.findOneAndUpdate({ conversationID: conversationID }, { conversationID: 'jason bourne' }, options, callback)
        Conversation.findOne({ conversationID: data.conversation.conversationID}, function (err, conversation) {
            conversation.messages.push(data.message);
            conversation.save();

            io.emit('submitMessage-success', conversation);



        }).then(function(){
            Conversation.find(function (err, conversations) {
                if (err) return console.error(err);

                io.emit("conversations", conversations);
                // console.log("conversations in then");

                // console.log(users);
                // console.log("getAllConversations-success emitted");

            });

        });


    })

    io.emit("conversations", Object.keys(conversations));

    socket.on('loadConversations', function(){
        Conversation.find(function (err, conversations) {
            if (err) return console.error(err);

            // io.emit('getAllConversations-success', conversations);
            // io.emit("conversations", Object.keys(conversations));
            io.emit("conversations", conversations);

            // console.log(conversations);
            // console.log("loadConversations");

        });
        // io.emit("conversations", Object.keys(conversations));


    })

});
