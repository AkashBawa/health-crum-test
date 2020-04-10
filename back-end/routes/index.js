var express = require('express');
var router = express.Router();
const fs = require('fs');
const contrUser = require('../controllers/userInput');
const ques = require('../models/questions');

/* GET home page. */
/*router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/question', function(req, res, next){
  var questions = new ques({
    question : "first question"
  })
  questions.save(()=>{
    console.log("data saved")
    res.send("saved")
  })
})
*/
router.post('/', function(req, res){
  console.log("previous")
})
router.post('/usersave', contrUser.saveUserAns);
router.get('/fetchquestion',contrUser.getQuestion);

router.get('/upload', function(req, res){
  //var url = 
  console.log("upload json works");
  let jsonData = JSON.parse(fs.readFileSync(__dirname + '/question.json', 'utf-8'))
  for(let i = 0;  i < jsonData.length; i++) {
    var questions = new ques();
    //console.log(jsonData[i]);
    questions.category = jsonData[i].category;
    questions.question = jsonData[i].question;
    questions.type = jsonData[i].type;
    questions.totalOptions = jsonData[i].totalOptions;
    questions.optionsAre = jsonData[i].optionsAre;
    
    //console.log(questions.optionsAre)
    
    questions.subQuestion = jsonData[i].subQuestion;
    if(questions.subQuestion == true) {
      questions.condition = jsonData[i].condition;
      questions.subQuestionAre = jsonData[i].subQuestionAre;
      //console.log(questions.subQuestionAre);
    }
    questions.save(function(err,  result){
      if(err) {
        throw err;
      }
      else{
      //  console.log("saved")
        console.log(result);
      }
    })
  }    
})
module.exports = router;
