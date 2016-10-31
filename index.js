var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var app = express();

mongoose.connect(process.env.MONGO_DB);
var db = mongoose.connection;

db.once("open",function(){
  console.log("DB connected");
});

db.on("error",function(err){
  console.log("DB ERROR :",err);
});

app.set("view engine", "ejs");
app.use(express.static(__dirname+"/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extened:true}));

var contactSchema = mongoose.Schema({
  name:{type:String, require:true, unique:true},
  email:{type:String},
  phone:{type:String}
});
var Contact = mongoose.model("contact",contactSchema);

app.get("/", function(req, res){
 res.redirect("/contacts");
});
// Contacts - Index // 7
app.get("/contacts", function(req, res){
 Contact.find({}, function(err, contacts){
  if(err) return res.json(err);
  res.render("contacts/index", {contacts:contacts});
  });
});
// Contacts - New // 8
app.get("/contacts/new", function(req, res){
 res.render("contacts/new");
});
// Contacts - create // 9
app.post("/contacts", function(req, res){
 Contact.create(req.body, function(err, contact){
  if(err) return res.json(err);
  res.redirect("/contacts");
 });
});

app.listen(3000,function(){
    console.log("server ON!!");
});
