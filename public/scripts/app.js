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

  $('.newProjectForm').submit(function(event){
    // console.log("hello")
    event.preventDefault();
    // console.log('submit')
    $.ajax({
      method:'POST',
      url: '/api/projects/',
      data: $(this).serializeArray(),
      success: changeProjects,
      error: onError
    });
  });

  function changeProjects(data){
    console.log(data)
    location.reload();
    // $('.prepend-button').prepend('<p style="text-align:left">Successfully Saved!</p>')
  }

  function deleteProjSuccess(data){
    console.log("deleted", data)
    location.reload()
  }

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
    $('.saveChanges').submit(function(event){
      // console.log("hello")
      event.preventDefault();
      // console.log('submit')
      $.ajax({
        method:'PUT',
        url: '/api/projects/',
        data: $(this).serializeArray(),
        success: changeProjects,
        error: onError
      });
    });
    // $('#mySecondModal').on('hidden.bs.modal', function () {
      // location.reload();
    // })
    $('.deleteBtn').on('click', function() {
      console.log('clicked delete button to', '/api/books/'+$(this).attr('data-id'));
      $.ajax({
        method: 'DELETE',
        url: '/api/projects/'+$(this).attr('data-id'),
        success: deleteProjSuccess,
        error: onError
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
