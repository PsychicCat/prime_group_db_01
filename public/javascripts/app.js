$(document).ready(function(){

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

        if (data.length > $assignments){
            $('#assignments').empty();
            data.forEach(function(elem){
                var $ul = $('<ul>');
                var $li1 = $('<li>').text(elem.assignment_name);
                var $li2 = $('<li>').text(elem.student_name);
                var $li3 = $('<li>').text(elem.score);
                var $li4 = $('<li>').text(elem.date_completed.toLocaleString());
                $ul.append($li1, $li2, $li3, $li4);
                $('#assignments').append($ul);

            })
        }

}).fail(function(jqXHR, textStatus, errorThrown) {
    console.log('Ajax failed: ', textStatus);
});
}