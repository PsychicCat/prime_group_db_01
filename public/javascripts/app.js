$(document).ready(function(){
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
            console.log("Refreshing...");
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