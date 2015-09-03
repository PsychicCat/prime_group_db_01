var mongoose = require('mongoose');
var schema = mongoose.Schema;

var assignmentSchema = new schema({
    assignment_name: { type: String, required: true },
    student_name: { type: String, required: true },
    score: { type: Number, required: true },
    date_completed: { type: Date, required: true }
});

assignmentSchema.methods.dateformat = function(){
    this.date_completed = this.date_completed.toLocaleString();
    return this.date_completed
};

var Assignment = mongoose.model('Assignment', assignmentSchema);

module.exports = Assignment;