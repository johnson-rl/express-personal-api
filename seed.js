// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

var db = require('./models');

var new_project = [{
  name: "Cuddle Dungeon: The Game",
  description: "A final fantasy style game with humor and vicious cuddly creatures.",
  projectLink: "http://Arrjay.ninja",
  techUsed: ["javascript", "jquery", "bootstrap", "Handlebars"],
  achievement: "I built the gameboard in jquery, so I will soon be able to create maps of any size!",
  screenshot: '/images/cuddle-dungeon.png'
},{
  name: "My First Portfolio Page",
  description: "A pretty simple page about me",
  projectLink: "http://johnson-rl.github.io",
  techUsed: ["javascript", "jquery", "bootstrap", "Handlebars"],
  achievement: "A appended something to the page!  Hey, that was a big deal to me at the time.",
  screenshot: '/images/portfolio.png'
},{
  name: "Tic Tac Toe",
  description: "My first game.",
  projectLink: "http://tics-tacs-and-toes.bitballoon.com",
  techUsed: ["javascript", "jquery", "bootstrap", "Handlebars"],
  achievement: "Swapping classes to change colors and determine who won",
  screenshot: '/images/tic-tac-toe.png'
}]

db.Project.remove({}, function(err, projects){
  console.log('removed all projects');
  db.Project.create(new_project, function(err, project){
    if (err){
      return console.log("error:", err);
    };
      console.log("Created new project", project.length);
      process.exit(); // we're all done! Exit the program.
  });
});

// var new_campsite = {description: "Sharp rocks. Middle of nowhere."}

// db.Campsite.create(new_campsite, function(err, campsite){
//   if (err){
//     return console.log("Error:", err);
//   }

//   console.log("Created new campsite", campsite._id)
//   process.exit(); // we're all done! Exit the program.
// })
