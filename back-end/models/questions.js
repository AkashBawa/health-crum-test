const mongoose = require('mongoose');

var schema = mongoose.Schema;

var sch = new schema({

    category : {type : String, required : true},        // eg life-style, health 
    question : {type : String, required : true},
    type : {type : String, required : true},          // MCQ, T/F, Drop down
    totalOptions : {type : Number, required : true},    // 4 for mcq, 2 for T/F, Any for Drop down

    optionsAre : [{
        option : {type : String},       // should be arrance in order  . eg index 0 represent red, 1 represent violet so on.
        value  : {type : Number}                         // if value is DB is null then value is option (index + 1) eg: in case of red value is  0 + 1 
    }],     

    subQuestion : {type : Boolean, default : false},   // true if this question have sub-question
    condition : {type : String},                      // condition compare with user input , for either to show sub-question or not

    subQuestionAre: [{
        question : {type : String},
        type : {type : String, required : true},          
        totalOptions : {type : Number, required : true},  
        
        optionsAre : [{
            option : {type : String},       
            value  : {type : Number}         
        }],
    }],
    
})

module.exports = mongoose.model('questions', sch)
