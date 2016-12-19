// require express and other modules
var express = require('express'),
    app = express();

// parse incoming urlencoded form data
// and populate the req.body object
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// allow cross origin requests (optional)
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods",'GET,PUT,PATCH,POST,DELETE');
  next();
});

/************
 * DATABASE *
 ************/

var db = require('./models');

/**********
 * ROUTES *
 **********/

// Serve static files from the `/public` directory:
// i.e. `/images`, `/scripts`, `/styles`
app.use(express.static('public'));

/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 */

app.get('/api', function api_index(req, res) {
  res.json({
    woopsIForgotToDocumentAllMyEndpoints: false,
    message: "Welcome to my personal api! Here's what you need to know!",
    documentationUrl: "https://github.com/johnson-rl/express-personal-api/blob/master/README.md",
    baseUrl: "http://arrjay-api.herokuapp.com",
    endpoints: [
      {method: "GET", path: "/api", description: "Describes all available endpoints"},
      {method: "GET", path: "/api/profile", description: "Who is this arrjay guy anyway?"},
      {method: "GET", path: "/api/projects", description: "Samples of my work"},
      {method: "GET", path: "/api/projects/:id", description: "One sample of my work"},
      {method: "POST", path: "/api/projects", description: "Add a project"},
      {method: "PUT", path: "/api/projects/:id", description: "Update info about a project"},
      {method: "DELETE", path: "/api/projects/:id", description: "Remove a project"},
      // {method: "GET", path: "/api/locations", description: "Places I've lived or loved"},
      // {method: "POST", path: "/api/destinations", description: "Places I need to visit"},
      // {method: "GET", path: "/api/current-obsessions", description: "Stuff with which I'm currently obsessed"},
      // {method: "POST", path: "/api/suggestions", description: "Works of art I'm yet to enjoy"},
    ]
  });
});

app.get('/api/profile', function(req, res){
  res.json({
    name: "Ryan johnson",
    githubUsername: "johnson-rl",
    githubLink: "https://github.com/johnson-rl",
    githubProfileImage: "https://avatars1.githubusercontent.com/u/23468749?v=3&u=3cae84756e81d5ab11bed0a04fe43bded436060e&s=400",
    personalSiteLink: "https://johnson-rl.github.io/",
    personalFunSiteLink: "http://arrjay.ninja/",
    currentCity: "San Franciso",
    pets: [{type: 'Cat', name: "Juniper", breed: "Domestic Shorthair"}, {type: "Imaginary Dog", name: "Rufus", breed: "Boxer"}]
  });
});
//Get all portfolio projects
app.get('/api/projects', function(req, res){
  db.Project.find({}, function(err, allProjects){
    if (err){
      console.log(err)
      res.send("No projects found", err)
    }
    res.json({portfolio: allProjects})
  });
});
//Get one portfolio project
app.get('/api/projects/:id', function(req, res){
  db.Project.findOne({_id: req.params.id }, function(err, book) {
    if (err){
      console.log(err)
      res.send("Project not found", err)
    }
    res.json(book);
  });
});
//Create a portfolio project
app.post('/api/projects', function(req, res){
  var newProject = new db.Project ({
    name: req.body.name,
    description: req.body.description,
    projectLink: req.body.link,
    techUsed: req.body.tech,
    achievement: req.body.achievement,
    screenshot: req.body.screenshot
  });
  // console.log(newProject)
  newProject.save(function (err, project){
    if (err){
      console.log('Project not saved', err);
      res.send('Project not saved', err);
    }
    res.json(project);
  });
});
//Edit a portfolio project using my web page
app.put('/api/projects/', function(req, res){
  db.Project.findOne({_id: req.body.id}, function (err, project){
    if (err){
      console.log("No edit made",err);
      res.send("No edit made",err);
    }
    project.name = req.body.name;
    project.description = req.body.description;
    project.link = req.body.link;
    project.techUsed = req.body.tech;
    project.achievement = req.body.achievement;
    project.screenshot = req.body.screenshot
    project.save(function (err, project){
      if (err){
        console.log('Project not saved', err);
        res.send('Project not saved', err);
      }
      res.json(project);
    });
  });
});
//edit a porfolio project using corey's magical program
app.put('/api/projects/:id', function(req, res){
  db.Project.findOne({_id: req.params.id}, function (err, project){
    if (err){
      console.log("No edit made",err);
      res.send("No edit made",err);
    }
    project.name = req.body.name;
    project.description = req.body.description;
    project.link = req.body.link;
    project.techUsed = req.body.tech;
    project.achievement = req.body.achievement;
    project.save(function (err, project){
      if (err){
        console.log('Project not saved', err);
        res.send('Project not saved', err);
      }
      res.json(project);
    });
  });
});
//Delete a portfolio project
app.delete('/api/projects/:id', function(req, res){
  db.Project.findOneAndRemove({_id: req.params.id}, function(err, project){
    if (err){
      console.log('Project not deleted', err);
      res.send('Project not deleted', err)
    }
    res.json(project);
  });
});

app.get('/api/locations', function(req, res){

});

app.post('/api/destinations', function(req, res){

});

app.get('/api/current-obsessions', function(req, res){

});

app.post('/api/suggestions', function(req, res){

});


/**********
 * SERVER *
 **********/

// listen on the port that Heroku prescribes (process.env.PORT) OR port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});
