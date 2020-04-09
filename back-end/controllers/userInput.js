const userProfile = require('../models/userSchema');
const questions = require('../models/questions');

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// from UI we need to get main question _id then its subquestion _id

var userId = "5e8e24aece22d82f60e2af28"    // in real time this id is replaced by the id of user login

exports.saveUserAns =  async function(req, res) {
    
    
    var fromUser = [{
        questionId :"5e8c2cb0e3ddc11f5058a607",           // main question _id
        mainans : "yes",
        mainScore : 2,
        subquestion : [{
            subAns : '30ml',
            value : 1
        }]
    }]
    
  
    var userProf = new userProfile();
    var user = new userProfile({
        name : "akash"
    })
  
    /*await user.save((err, result)=>{
        if(err) console.log(err)
        else console.log(result)
    });*/

    questions.findOne({}, async function(err, result) {
       if(err){
           console.log(err);
       }
       else{
          // console.log(result);

           for(let i = 0; i < fromUser.length; i++) {
             var hrSAve = {
                 //questionId : fromUser[i].questionId,
                 questionId : result._id,
                 ans : fromUser[i].mainans,
                 score : fromUser[i].mainScore,
                 subans: []
             }
             var subans = [];
            
             for(let j = 0 ; j < fromUser[i].subquestion.length; j++) {
                 var subans = {
                     ans : fromUser[i].subquestion[j].subAns,
                     score : fromUser[i].subquestion[j].value
                 }
                 hrSAve.subans.push(subans);
             }
             var del = {
                 ans : "Akash project"
             }
             await userProfile.update({name : "akash"},  { $set: {hraQuestions :  { questionId : result._id}}},function(err, result) {
                 if(err) {
                     console.log(err);
                 }
                 else{
                     console.log(result);
                 }
             })
         }
         
        console.log("game begin")
        await userProfile.findOne({name : "akash"}, function(err, result){
            if(err) console.log(err);
            else console.log("first" + result)
        })
        await userProfile.findOne({ name : 'akash' })
            .populate({ 
                path: 'hraQuestions.questionId'
            }) 
             .exec(function (err, story) {
                 if (err) return handleError(err);
                 console.log( JSON.stringify(story));
                 
            });
       }
        userProfile.findOne({name : "akash"}, function(err, result){
            if(err) console.log(err);
            else console.log("last" + result)
            })
   })
/*
        }  
    })
    /*
    userProfile.findOne({}, function(err, result){
        if(err)
            console.log(err);
        else{
            console.log(result)
        }
    })

    */
    res.send("saved ")
}