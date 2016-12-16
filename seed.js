// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

var db = require('./models');

var new_project = {
  name: "Cuddle Dungeon: The Game",
  description: "A final fantasy style game with humor and vicious cuddly creatures.",
  projectLink: "Arrjay.ninja",
  techUsed: ["javascript", "jquery", "bootstrap", "Handlebars"],
  achievement: "I built the gameboard in jquery, so I will soon be able to create maps of any size!"
};

db.Project.create(new_project, function(err, project){
  if (err){
    return console.log("error:", err);
  }
    console.log("Created new project", project._id)
    process.exit(); // we're all done! Exit the program.
})

// var new_campsite = {description: "Sharp rocks. Middle of nowhere."}

// db.Campsite.create(new_campsite, function(err, campsite){
//   if (err){
//     return console.log("Error:", err);
//   }

//   console.log("Created new campsite", campsite._id)
//   process.exit(); // we're all done! Exit the program.
// })
