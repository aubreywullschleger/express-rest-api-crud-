var express    = require('express');
var bodyParser = require('body-parser');
var swords = require('./routes/swords');
var potions = require('./routes/potions');
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/swords', swords);
app.use('/api/potions', potions);

app.listen(process.env.PORT || 8080);
console.log('Woot, server started');