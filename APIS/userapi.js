
const exp=require("express")
const userApiObj=exp.Router();
userApiObj.use(exp.json())
const bcryptjs=require("bcryptjs");
const jwt = require("jsonwebtoken");

require("dotenv").config();



userApiObj.post("/register",async(req,res)=>{
    let userCollectionObj=req.app.get("userCollectionObj");
    
    let userObj = req.body
   
  
    let user= await userCollectionObj.findOne({username:userObj.username})
    if(user!==null)
    {
        res.send({message:"user already exists"})
    }
    else{

        let hpw= await bcryptjs.hash(userObj.password,6)
        userObj.password=hpw;
        let success=await userCollectionObj.insertOne(userObj)
        res.send({message:"user created"})
    }
})



//get user

userApiObj.get("/getuser/:username",async (req,res,next)=>{
    //get user collectionobject
    let userCollectionObject = req.app.get("userCollectionObj");

   let userObj=await userCollectionObject.findOne({username:req.params.username});
   res.send({message:userObj});
})



userApiObj.post("/login",async(req,res)=>{
    let userCollectionObj=req.app.get("userCollectionObj");
    let userCredObj= req.body;

    let user = await userCollectionObj.findOne({username:userCredObj.username})

    if(user==null){
        res.send({message:"Invalid username"})
    }
    else{

        let status=await bcryptjs.compare(userCredObj.password,user.password)

        if(status==true)
        {
            let token = await jwt.sign({username:user.username},process.env.secret,{expiresIn:1000})
            res.send({message:"success",signedToken:token,username:user.username})
        }
        else{
            res.send({message:"invalid password"})
        }
    }
})


userApiObj.post("/passwordreset",async(req,res,next)=>{
    let userCollectionObject=req.app.get("userCollectionObj")
    let obj=req.body;
    let hash=await bcryptjs.hash(obj.password1,6)
    let success=await userCollectionObject.updateOne({username:obj.username},{$set:{
        password:hash}
    })
    res.send({message:"success"})
})



module.exports=userApiObj;


