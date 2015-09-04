$(document).ready(function(){

    $('body').on('click', '.remove', function(){
       var id = $(this).data('id');
        $.ajax({
            url: '/assignments/' + id ,
            type: 'DELETE'
        }).done(function(response, textStatus, jqXHR){
            console.log('Added assignment!');
        }).fail(function( jqXHR, textStatus, errorThrown ) {
            console.log(jqXHR, textStatus, errorThrown);
        }).always(function(){
            getAssignments();
        });
    });

    $('form').on('submit', function(e){
        e.preventDefault();
        var assignmentName = $(this).serializeArray()[0];
        var studentName = $(this).serializeArray()[1];
        var score = $(this).serializeArray()[2];
        var date = $(this).serializeArray()[3];

        var data = {
            assignment_name: assignmentName.value,
            student_name: studentName.value,
            score: score.value,
            date_completed: date.value,
        };

        console.log(data);

        $.ajax({
            url: '/assignments',
            type: 'POST',
            data: data,
        }).done(function(response, textStatus, jqXHR){
            console.log('Added assignment!');
        }).fail(function( jqXHR, textStatus, errorThrown ) {
            console.log(jqXHR, textStatus, errorThrown);
        }).always(function(){
            getAssignments();
        });

    });

    setInterval(function(){getAssignments();}, 5000);
});

function getAssignments(){
    $.ajax({
        type: 'GET',
        dataType: 'json',
        url: '/assignments'
    }).always(function() {
    console.log('Ajax attempt complete.');
}).done(function(data, textStatus, jqXHR) {
        var $assignments = $('ul').length;

        if (data.length !== $assignments){
            $('#assignments').empty();
            data.forEach(function(elem){
                var $ul = $('<ul>');
                var $li1 = $('<li>').text("Assignment: " + elem.assignment_name + ", Student: " + elem.student_name + ", Score: " + elem.score + ", Date Completed: " + moment(elem.date_completed).format('MMM Do YYYY'));
                var $remove = $('<button>').attr({"class": "remove", "data-id": elem._id }).text("Remove");
                $ul.append($li1, $remove);
                $('#assignments').append($ul);

            })
        }

}).fail(function(jqXHR, textStatus, errorThrown) {
    console.log('Ajax failed: ', textStatus);
});
}