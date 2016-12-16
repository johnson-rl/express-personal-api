var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var ProjectSchema = new Schema{
  name: String,
  description: String,
  project-link: String,
  tech-used: Array,
  achievement: String
}

var Project = mongoose.model('Project', ProjectSchema)
module.exports = Project

// var Campsite = mongoose.model('Campsite', CampsiteSchema);

// module.exports = Campsite;
