const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html");
});
app.post("/", function(req, res){
  const firstName = req.body.fname;
  const lastName = req.body.lname;
  const email = req.body.email;
  var data = {
    members:[ {
      email_address: email,
      status_if_new: "subscribed",
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName
      }
    }]
  };

var jsonData = JSON.stringify(data);
const url =`https://us21.api.mailchimp.com/3.0/lists/cb49d1219e`;
           


const options = {

    method: "POST",
    body: data,
    auth:"dorsoneg:9722204810e86c8242f2993833d39089-us21"
    
};
const request = https.request(url,options,function(response){
    response.on("data", function (data) {
        console.log(JSON.parse(data));
      });
      if(response.statusCode === 200){
        res.sendFile(__dirname + "/success.html");
      } else {
        res.sendFile(__dirname+"/failure.html");
      }
    });

request.write(jsonData);
request.end();

});

app.post("/failure", function(req,res){
    res.redirect("/");
  });
  app.listen(process.env.PORT || 3000, function(){
    console.log("You are now live");
  });


//APIKey - 9722204810e86c8242f2993833d39089-us21

//ListID
//cb49d1219e