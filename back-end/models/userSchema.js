var mongoose = require('mongoose');
//var quest = mongoose.model('questions');
var Schema = mongoose.Schema;

var sch = new Schema({
   
    name : {type : String, required : true},
    hraQuestions : [
        {
            questionId : { type: Schema.Types.ObjectId, ref: 'questions'},
            ans : {type : String},
            score : {type : Number},                                 // store 1, 2,3, 4 as user points
            subans : [{
                ans : {type : String},
                score : {type : Number}
            }]
        }
    ]
})

module.exports = mongoose.model('user', sch);