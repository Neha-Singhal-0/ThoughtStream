const express=require('express');
const app=express();
const userModel=require("./models/user");
const path=require('path');
const bcrypt=require('bcrypt');
const cookieParser=require('cookie-parser');
const postModel=require("./models/post");
const jwt=require("jsonwebtoken");
app.set("view engine","ejs");
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')));
app.use(cookieParser());

app.get('/',function(req,res){
  res.render("index");
})

app.get("/profile",isLoggedIn, async function (req, res) {
  let user = await userModel.findOne({ email: req.user.email }).populate("posts"); 
  res.render("profile",{user});
});

app.get("/like/:id", isLoggedIn, async function (req, res) {
  let post= await postModel.findOne({_id:req.params.id}).populate("user");
  if(post.likes.indexOf(req.user.userid)===-1){
       post.likes.push(req.user.userid);
  }else{
    post.likes.splice(post.likes.indexOf(req.user.userid),1);
  }
  await post.save();
  res.redirect("/profile");
});

app.get("/edit/:id", isLoggedIn, async function (req, res) {
  let post = await postModel.findOne({ _id: req.params.id }).populate("user");
  res.render("edit",{post});
});

app.post("/update/:id", isLoggedIn, async function (req, res) {
  let post = await postModel.findOneAndUpdate({ _id: req.params.id },{content:req.body.content});
  res.redirect("/profile");
});

app.post("/post", isLoggedIn, async function (req, res) {
  let user = await userModel.findOne({ email: req.user.email });
  let { content } = req.body;
  let post=await postModel.create({
    user:user._id,
    content:content,
  });
  user.posts.push(post._id); 
  await user.save();
  res.redirect("/profile"); 
});

app.get('/login', function (req, res) {
  res.render("login");
}); 

app.post("/register",async function (req, res) {
  let {email,password,name,username,age}=req.body;
  let user= await userModel.findOne({email});
  //we will check if user is already present or not...
  if(user)return res.status(500).redirect("/login");

  //if user is not present we will create a user...
  bcrypt.genSalt(10,function(err,salt){
    bcrypt.hash(password,salt, async function(err,hash){
          let user=await userModel.create({
             username,
             email,
             age,
             name,
             password:hash
          });
          let token=jwt.sign({email:email,userid:user._id},"shhhhhhhhhh");
          res.cookie("token",token);
          res.redirect("/login");
    });
  });
});

app.post("/login", async function (req, res) {
  let { email, password } = req.body;
  let user = await userModel.findOne({ email });
  //if we do not have any user ....
  if (!user) return res.status(500).send("Something went wrong!!"); 
  bcrypt.compare(password,user.password,function(err,result){
    if(result){
      let token = jwt.sign({ email: email, userid: user._id }, "shhhhhhhhhh");
      res.cookie("token", token);
      res.status(200).redirect("/profile");
    } 
    else res.redirect("/login");
  });
});

app.get("/logout", function (req, res) {
  res.cookie("token",""); 
  res.redirect("/login");
});

//middleware
function isLoggedIn(req,res,next){
   if(req.cookies.token==="") res.redirect("/login");
   else {
    let data=jwt.verify(req.cookies.token, "shhhhhhhhhh");
    req.user=data;
    next();  
   }
}
//running on port number 3000
app.listen(3000);