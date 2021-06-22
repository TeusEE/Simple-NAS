var express = require('express');
const path = require('path');
var fs = require("fs");
var {Base64Encode} = require('base64-stream');
var router = express.Router();

/* GET home page. */
router.all('/', function(req, res, next) {
  console.log("??")
  res.render('index', { title: 'Express' })    
});

router.post('/users', function(req, res, next) {    
  cur_file_list = fs.readdirSync(__dirname)  
  res.render('test', {
    file_setting : JSON.stringify({"cur" : cur_file_list,
                                  "cur_location" : __dirname})
  })  
});

router.post('/ajaxtest', function(req, res, next) {    
  //maybe return that file's directory == return parent directory
  req.headers.current_location = decodeURIComponent(req.headers.current_location)
  if (req.headers.direction == "upper"){
    var next_location = path.dirname(req.headers.current_location);      
  } else if (req.headers.direction == "back" | req.headers.direction == "direct"){
    var next_location = req.headers.current_location;
  }  
  console.log(next_location);
  cur_file_list = fs.readdirSync(next_location)       
  res.send({file_setting : JSON.stringify({
    "cur" : cur_file_list,    
    "cur_location" : next_location,    
    "direction" : req.headers.direction})
  })
});


router.post('/ajaxstream', function(req, res, next) {          
  var temp = req.headers.current_location + "\\\\" + req.headers.req_file      
  var readStream = fs.createReadStream(temp, encoding = "Base64");  
  readStream.pipe(res)         
});

module.exports = router;
