var mongoose = require('mongoose');
var schema = mongoose.Schema;

var assignmentSchema = new schema({
    assignment_name: { type: String, required: true },
    student_name: { type: String, required: true },
    score: { type: Number, required: true },
    date_completed: { type: Date, required: true }
});

var Assignment = mongoose.model('Assignment', assignmentSchema);

module.exports = Assignment;