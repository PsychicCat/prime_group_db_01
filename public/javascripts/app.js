$(document).ready(function(){
    var counter = 0;

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

    $('body').on('click', '.update', function(){
        $(this).next('form').toggleClass('hidden');
    });

    $('body').on('submit', '#superUpdate', function(e){
        e.preventDefault();
        console.log("UPDATING");
        var id = $(this).data('id');
        console.log(id);
        var assignmentName = $(this).serializeArray()[0];
        var studentName = $(this).serializeArray()[1];
        var score = $(this).serializeArray()[2];
        var date = $(this).serializeArray()[3];

        var data = {
            assignment_name: assignmentName.value,
            student_name: studentName.value,
            score: score.value,
            date_completed: date.value
        };

        if(data){
            $.ajax({
                url: '/assignments/' + id,
                type: 'PUT',
                data: data,
            }).done(function(response, textStatus, jqXHR){
                console.log('Updated assignment!');
            }).fail(function( jqXHR, textStatus, errorThrown ) {
                console.log(jqXHR, textStatus, errorThrown);
            }).always(function(){
                getAssignments(true);
            });
        }


    });

    $('body').on('submit', '#addForm', function(e){
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

function getAssignments(updated){
    $.ajax({
        type: 'GET',
        dataType: 'json',
        url: '/assignments'
    }).always(function() {
    console.log('Get assignments complete.');
}).done(function(data, textStatus, jqXHR) {
        var $assignments = $('ul').length;

        if (data.length !== $assignments || updated == true ){
            $('#assignments').empty();
            data.forEach(function(elem){
                var $ul = $('<ul>');
                var $li1 = $('<li>').text("Assignment: " + elem.assignment_name + ", Student: " + elem.student_name + ", Score: " + elem.score + ", Date Completed: " + moment(elem.date_completed).format('MMM Do YYYY'));
                var $remove = $('<button>').attr({"class": "remove", "data-id": elem._id }).text("Remove");
                var $update = $('<button>').attr('class', 'update').text("Update");
                var $updateForm = $('<form>').attr({'data-id': elem._id, 'id':'superUpdate', 'class': 'hidden updateform', 'method': 'PUT'});
                var $fieldset = $('<fieldset>');
                var $legend = $('<legend>').text("Update Assignment");
                var $label1 = $('<label>').attr('for', 'upassignmentName').text('Assignment Name: ');
                var $label2 = $('<label>').attr('for', 'upstudentName').text('Student Name: ');
                var $label3 = $('<label>').attr('for', 'upscore').text('Score: ');
                var $label4 = $('<label>').attr('for', 'update_completed').text('Date Completed: ');
                var $input1 = $('<input>').attr({"type": "text", "name": "upassignmentName", "id": "upassignmentName"});
                var $input2 = $('<input>').attr({"type": "text", "name": "upstudentName", "id": "upstudentName"});
                var $input3 = $('<input>').attr({"type": "number", "name": "upscore", "id": "upscore", "max": "100", "min": "1"});
                var $input4 = $('<input>').attr({"type": "date", "name": "update", "id": "reupdate"});
                var $updateButton = $('<input>').attr({"type": "submit"}).text('Update');
                $updateForm.append($fieldset);
                $fieldset.append($legend, $label1, $input1, $label2, $input2, $label3, $input3, $label4, $input4, $updateButton);
                $ul.append($li1, $remove, $update, $updateForm);
                $('#assignments').append($ul);

            })
        }

}).fail(function(jqXHR, textStatus, errorThrown) {
    console.log('Ajax failed: ', textStatus);
});
}