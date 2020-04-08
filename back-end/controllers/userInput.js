const userProfile = require('../models/userSchema');
const questions = require('../models/questions');

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// from UI we need to get main question _id then its subquestion _id

var userId = "5e8e0f7d4482102abc2d6029";    // in real time this id is replaced by the id of user login

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
    
    /*
    var userProf = new userProfile();
    var user = new userProfile({
        name : "akash"
    })
    */
   // await user.save();
   //console.log("form length " + fromUser.length);
    for(let i = 0; i < fromUser.length; i++) {
        console.log("first loop");
        var hrSAve = {
            questionId : fromUser[i].questionId,
            ans : fromUser[i].mainans,
            score : fromUser[i].mainScore,
            subans: []
        }
        var subans = [];
        console.log("sub question length " + fromUser[i].subquestion.length)
        for(let j = 0 ; j < fromUser[i].subquestion.length; j++) {
            console.log("second loop")
            var subans = {
                ans : fromUser[i].subquestion[j].subAns,
                score : fromUser[i].subquestion[j].value
            }
            hrSAve.subans.push(subans);
          //  console.log(hrSAve);
        }
        //console.log("hr save is " + JSON.stringify(hrSAve))
        
        await userProfile.update({_id : userId},  { $push: { hraQuestions: hrSAve } },function(err, result) {
            if(err) {
                console.log(err);
            }
            else{
                console.log(result);
            //userProf = result
            }
        })
    }
    
/*
            userProfile.findOne({ name : 'akash' }).
            populate('questionId').
            exec(function (err, story) {
                if (err) return handleError(err);
                console.log('The author is %s', story);
                // prints "The author is Ian Fleming"
            
            });
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