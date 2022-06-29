const express = require('express');
const path = require('path');
const session = require('express-session');
const flash = require("express-flash");

const port = process.env.PORT || 3000;
const app = express();

const parksRouter = require('./src/routes/parksRouter.js');
const mountainsRouter = require('./src/routes/mountainsRouter.js');

app.use(express.static(path.join(__dirname, '/public')));
app.use(express.json());
app.use(express.urlencoded( { extended: false } ));

app.use(session({ secret: 'n2la' }));
app.use(flash());

app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use('/parks', parksRouter);
app.use('/mountains', mountainsRouter);

app.use(express.static('public'));
app.use(express.static('images'));
app.use('/static', express.static('public'))

app.get('/', (req, res) => {
  res.render('home', {
    someData: ['so', 'me', 'da', 'ta']
  });
});

app.listen(port, () => {
  console.log('app msg=' + `app listening on port ${port}`);
});
