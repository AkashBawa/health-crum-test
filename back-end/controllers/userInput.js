const userProfile = require('../models/userSchema');
const questions = require('../models/questions');

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// from UI we need to get main question _id then its subquestion _id

var userId = "5e8efa895b324a3e4c97a278"   // in real time this id is replaced by the id of user login

exports.saveUserAns =  async function(req, res) {
    console.log("post request reached");
    console.log(req.body);
    var fromUser = [{
        questionId :"5e8c2cb0e3ddc11f5058a607",           // main question _id
        mainans : "yes",
        mainScore : 2,
        subquestion : [{
            subAns : '30ml',
            value : 1
        }]
    }]
    
    var hrSave = {
        questionId : fromUser[0].questionId,
        //questionId : result._id,
        ans : fromUser[0].mainans,
        score : fromUser[0].mainScore,
        subans: []
    }
    var subans = [];
   
    for(var j = 0 ; j < fromUser[0].subquestion.length; j++) {
        var subans = {
            ans : fromUser[0].subquestion[j].subAns,
            score : fromUser[0].subquestion[j].value
        }
        hrSave.subans.push(subans);
    }
   // console.log(hrSave);

    //console.log("before")
    var activeUser = await userProfile.find({_id : userId})
    //console.log("Active user" , activeUser)
    // first time user true hra
    if(activeUser.length > 0) {
        //console.log("active user");
        
        let present= await userProfile.find({_id : '5e8f6a9cd548ec412c1b332b', 'hraQuestions.questionId' : fromUser[0].questionId})
        
        if(!present) {
            //console.log("first attempt")    
            userProfile.update({name : "akash"},{ $push : {hraQuestions : hrSave}} , function(err, update){
                if (err) console.log(err);
                else console.log("new question added");
            })
            
        }
        // user attempt this question second time 
        else{
            //console.log("else reach")
            //console.log(hrSave);
            userProfile.update({_id : '5e8f6a9cd548ec412c1b332b', 'hraQuestions.questionId' : fromUser[0].questionId}, {$set :{hraQuestions : hrSave}}, (err,resul)=>{
                console.log(resul)
            })
        }
    }
    else {
       // console.log("new user");
        var userProf = new userProfile();
        var user = new userProfile({
            name : "bawa",
            hraQuestions : hrSave 
        })
        await user.save();
    }

    /*
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
             await userProfile.update({_id :"5e8efa895b324a3e4c97a278"},  { $set: {hraQuestions :  { questionId : fromUser.questionId}}},function(err, result) {
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
   })*/
    res.send("saved ")
}

//=============================================================================================================//

exports.retriveData = async function (req, res) {
    await userProfile.findOne({_id : userId})
        .populate({ 
            path: 'hraQuestions.questionId'
        }) 
        .exec(function (err, story) {
            if (err) return handleError(err);
            console.log( JSON.stringify(story));
        });
}

//===========================================================================================================//

exports.getQuestion =async function(req, res) {
    let question  = await questions.find({category : "lifestyle"});
    if(!question) {
        res.send("invalid input");
    }
    else{
        console.log(question);
        res.json(question);
    }
}