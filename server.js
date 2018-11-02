const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

app.set('view engine', 'hbs');


// Middlewares
// Maintenance middleware
app.use((req, res, next) => {
  res.render('maintenance.hbs');
});

app.use(express.static(__dirname + '/public'));

// creating and storing logs for server
app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;

  console.log();  // causion: `` is using here instead of ''
  fs.appendFile('server.log', log + '\n', (err) =>{
    if (err){
          console.log('Unable to append to server.log')
     }
  });
  next();
});


// hbs helper functions
hbs.registerHelper('getCurrentYear', ()=>{
  return new Date().getFullYear()
});
hbs.registerHelper('screamIt', (text)=>{
  return text.toUpperCase();
});

// hbs partial templates
hbs.registerPartials(__dirname + '/views/partials');

// routes
app.get('/',(req,res) => {
  res.render('home.hbs',{
    pageTitle: 'Home Page',
    welcomeMsg: 'Hello, stranger! Welcome to my site.',
    currentYear: new Date().getFullYear()
  });
});

app.get('/about',(req,res) => {
  res.render('about.hbs',{
    pageTitle: 'About Page',
  });
});

// deploy on local env.
app.listen(3000, () => {
  console.log('Server is up on port 3000');
});
