//create express onj
const exp=require("express")
const app=exp(); 
//import dotenv
require("dotenv").config()


const path=require("path")
const mc=require("mongodb").MongoClient;

//connect angular app with webserver
app.use(exp.static(path.join(__dirname,"dist/todolist")))

//import api objects
const userApiObj=require("./APIS/userApi")


//forward req object to specific API based on path
app.use("/user",userApiObj)


//databasr url
const dburl=process.env.dburl;

//db connect
mc.connect(dburl,{useNewUrlParser:true,useUnifiedTopology:true})
.then(client=>{
   //get database object
   const databaseObj=client.db("todolist");
   const userCollectionObject=databaseObj.collection("usercollection");
   
   //sharing collection objects
   app.set("userCollectionObject",userCollectionObject)
   console.log("db server started")
   

})
.catch(err=>console.log("err in db connection",err))



//middleware to handle invalid paths
app.use((req,res,next)=>{
   res.send({message:'${req.url} is invalid'})
})


//error handling middleware
app.use((err,req,res,next)=>{
   res.send({message:"Error occured",reason:err.message})
})


//assign port number
app.listen(3500,()=>console.log("server started on 3500"))