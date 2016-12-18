console.log("Sanity Check: JS is working!");

$(document).ready(function(){
// handlebars function created
  var source = $('#projects-template').html();
  var template = Handlebars.compile(source);
  $.ajax({
    method: 'GET',
    url: '/api/projects',
    success: addProjects,
    error: onError
  });
  function addProjects(json){
    // console.log('ajax got profile projects',json)
    json.portfolio.forEach(function(project){
      // console.log(project)
      var appendHTML = template({json: project})
      var appendId = project._id
      // console.log('handlebars',appendHTML)
      $('#append-projects').append(appendHTML);
      project.techUsed.forEach(function(technology){
        // console.log(appendId)
        $('.'+appendId).append('<li>'+technology+'</li>');
      });
    });
  };
});

// function addProjects(json){
//   console.log('ajax got profile projects',json)
//   json.portfolio.forEach(function(project){
//     template(project)
//     project.techUsed.forEach(function(technology){
//       $('.'+json._id).append('<li>'+technology+'</li>')
//     })
//   })
// }

function onError(json){
  console.log('ajax experienced and error',json)
}
