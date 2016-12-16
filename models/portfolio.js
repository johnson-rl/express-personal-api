var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var ProjectSchema = new Schema ({
  name: String,
  description: String,
  projectLink: String,
  techUsed: Array,
  achievement: String
});

var Project = mongoose.model('Project', ProjectSchema)
module.exports = Project

// var Campsite = mongoose.model('Campsite', CampsiteSchema);

// module.exports = Campsite;
