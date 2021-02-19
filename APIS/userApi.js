//create mini express app
const exp=require("express");
const userApiObj=exp.Router();
const errorHandler=require("express-async-handler")
const bcryptjs=require("bcryptjs")
const jwt=require("jsonwebtoken")
//extracting body of object
userApiObj.use(exp.json())

//post req handler for registeration
userApiObj.post("/register",errorHandler(async(req,res,next)=>{
    
    //get  user collectionobject
    let userCollectionObject=req.app.get("userCollectionObject")

    let userObj=req.body;
    //check for user in db
    let user=await userCollectionObject.findOne({username:userObj.username})

    //if user is existed
    if(user!==null){
        res.send({message:"user existed"})

    }
    else{
        //hash the password
        let hashedPw=await bcryptjs.hash(userObj.password,6)

        //replace plain text pw with hashed pw
        userObj.password=hashedPw;


        //create user
        let success=await userCollectionObject.insertOne(userObj)

        res.send({message:"user created"})

    }
    //console.log("user obj is ",req.body)

}))
// user login
userApiObj.post("/dashboard",errorHandler(async(req,res,next)=>{
    
    //get  user collectionobject
    let userCollectionObject=req.app.get("userCollectionObject")
 
    let userCredObj=req.body;
 
    //verify username
    let user=await userCollectionObject.findOne({username:userCredObj.username})
 
    //if user is not existed
    if(user==null){
        res.send({message:"Invaild username"})
    }
    else{
        //verify password
        let status=await bcryptjs.compare(userCredObj.password,user.password)
        //if pws matched
        if(status==true){
 
            //create a token
            let token=await jwt.sign({username:user.username},"abcd",{expiresIn:100})
 
            //send token
            res.send({message:"success",signedToken:token,username:user.username})
 
            
            //res.send({message:"Login success"})
        }   
        else{
        res.send({message:"Invalid password"})
    }
}

}))
//user schedule
userApiObj.post("/userschedule",errorHandler(async(req,res,next)=>{
    let userCollectionObj=req.app.get("userCollectionObj")
    let userobj=req.body;
      //create user
            let success=await userCollectionObj.insertOne(userobj)
            res.send({message:"user activity created"})
    
    console.log("user activity is", userobj)
 
}))
//export
module.exports=userApiObj;