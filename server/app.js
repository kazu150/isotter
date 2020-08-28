const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const timelineRoutes = require('./routes/timeline');
const adminRoutes = require('./routes/admin');

const app = express();

// app.use(bodyParser.urlencoded()); ←これはjson以外(form)のときに使う
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use( '/timeline', timelineRoutes );
app.use( '/admin', adminRoutes );

mongoose.connect(
    'mongodb+srv://dbUser:e9ZjwXavykLB7it5@cluster0.g5fjc.gcp.mongodb.net/timeline?retryWrites=true&w=majority'
).
then(result => {
    app.listen(8080);
})
.catch(err => console.log(err));